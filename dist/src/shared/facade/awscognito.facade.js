"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const client_cognito_identity_provider_1 = require("@aws-sdk/client-cognito-identity-provider");
const constants_1 = require("../constants");
const helper_1 = require("../helper");
const errors_1 = require("../errors");
let AWSCognito = class AWSCognito {
    constructor(aws) {
        this.aws = aws;
        this.client = new client_cognito_identity_provider_1.CognitoIdentityProviderClient({
            region: `${process.env.AWS_SQS_REGION}`,
            credentials: {
                accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
                secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
            },
        });
    }
    signUp(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, email, firstname, lastname } = args;
                const params = {
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    SecretHash: yield this.aws.generateSecretHash(email),
                    Username: email,
                    Password: password,
                    UserAttributes: [
                        {
                            Name: "given_name",
                            Value: firstname,
                        },
                        {
                            Name: "family_name",
                            Value: lastname,
                        },
                    ],
                };
                const command = new client_cognito_identity_provider_1.SignUpCommand(params);
                const response = yield this.client.send(command);
                return {
                    isSignedUp: response.UserConfirmed,
                    userId: response.UserSub,
                };
            }
            catch (e) {
                if (e instanceof client_cognito_identity_provider_1.InvalidPasswordException) {
                    throw new errors_1.BadRequestError("invalid password");
                }
                else if (e instanceof client_cognito_identity_provider_1.UsernameExistsException) {
                    throw new errors_1.BadRequestError("email already exists");
                }
                else {
                    throw new errors_1.InternalServerError(e);
                }
            }
        });
    }
    confirmSignUp(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, confirmationcode } = args;
                const params = {
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    SecretHash: yield this.aws.generateSecretHash(email),
                    Username: `${email}`,
                    ConfirmationCode: `${confirmationcode}`,
                };
                const command = new client_cognito_identity_provider_1.ConfirmSignUpCommand(params);
                const response = yield this.client.send(command);
                return {
                    isConfirm: response.$metadata.httpStatusCode === constants_1.StatusCodes.OK ? true : false,
                };
            }
            catch (e) {
                if (e instanceof client_cognito_identity_provider_1.ExpiredCodeException) {
                    throw new errors_1.BadRequestError("code has expired");
                }
                else if (e instanceof client_cognito_identity_provider_1.UserNotFoundException) {
                    throw new errors_1.BadRequestError("user not found");
                }
                else {
                    throw new errors_1.InternalServerError("unexpected error in auth service confirm signup");
                }
            }
        });
    }
    resendSignupConfirmationCode(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = args;
                const params = {
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    SecretHash: yield this.aws.generateSecretHash(email),
                    Username: `${email}`,
                };
                const command = new client_cognito_identity_provider_1.ResendConfirmationCodeCommand(params);
                const response = yield this.client.send(command);
                return {
                    isCodeSent: response.$metadata.httpStatusCode === constants_1.StatusCodes.OK ? true : false,
                };
            }
            catch (e) {
                if (e instanceof client_cognito_identity_provider_1.CodeDeliveryFailureException) {
                    throw new errors_1.BadRequestError("code failed to resend");
                }
                else {
                    throw new errors_1.InternalServerError("unexpected error occurred when trying to resend confirmation code");
                }
            }
        });
    }
    signIn(args) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { email, password } = args;
                const params = {
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    AuthFlow: client_cognito_identity_provider_1.AuthFlowType.USER_PASSWORD_AUTH,
                    AuthParameters: {
                        PASSWORD: `${password}`,
                        SECRET_HASH: yield this.aws.generateSecretHash(email),
                        USERNAME: `${email}`,
                    },
                };
                const command = new client_cognito_identity_provider_1.InitiateAuthCommand(params);
                const response = yield this.client.send(command);
                return {
                    isAuthenticated: response.$metadata.httpStatusCode === constants_1.StatusCodes.OK ? true : false,
                    tokens: {
                        AccessToken: (_a = response.AuthenticationResult) === null || _a === void 0 ? void 0 : _a.AccessToken,
                        RefreshToken: (_b = response.AuthenticationResult) === null || _b === void 0 ? void 0 : _b.RefreshToken,
                    },
                };
            }
            catch (e) {
                if (e instanceof client_cognito_identity_provider_1.UserNotFoundException) {
                    throw new errors_1.BadRequestError("user not found");
                }
                else if (e instanceof client_cognito_identity_provider_1.NotAuthorizedException) {
                    throw new errors_1.BadRequestError("invalid details provided");
                }
                else if (e instanceof client_cognito_identity_provider_1.UserNotConfirmedException) {
                    throw new errors_1.BadRequestError("user not confirmed");
                }
                else {
                    throw new errors_1.InternalServerError(e);
                }
            }
        });
    }
    refreshAccessToken(refresh_token) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const params = {
                    AuthFlow: client_cognito_identity_provider_1.AuthFlowType.REFRESH_TOKEN_AUTH,
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    AuthParameters: {
                        REFRESH_TOKEN: refresh_token,
                        SECRET_HASH: yield this.aws.generateSecretHash(""),
                    },
                };
                const command = new client_cognito_identity_provider_1.InitiateAuthCommand(params);
                const response = yield this.client.send(command);
                return {
                    accessToken: (_a = response.AuthenticationResult) === null || _a === void 0 ? void 0 : _a.AccessToken,
                    idToken: (_b = response.AuthenticationResult) === null || _b === void 0 ? void 0 : _b.IdToken,
                    refreshToken: (_c = response.AuthenticationResult) === null || _c === void 0 ? void 0 : _c.RefreshToken,
                };
            }
            catch (e) {
                throw new errors_1.InternalServerError(e);
            }
        });
    }
    signOut(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { access_token } = args;
                const params = {
                    AccessToken: `${access_token.split(" ")[1]}`,
                };
                const command = new client_cognito_identity_provider_1.GlobalSignOutCommand(params);
                const response = yield this.client.send(command);
                return {
                    isLogout: response.$metadata.httpStatusCode === constants_1.StatusCodes.OK ? true : false,
                };
            }
            catch (e) {
                throw new errors_1.InternalServerError(e);
            }
        });
    }
    forgotpassword(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = args;
                const params = {
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    SecretHash: yield this.aws.generateSecretHash(email),
                    Username: email,
                };
                const command = new client_cognito_identity_provider_1.ForgotPasswordCommand(params);
                const response = yield this.client.send(command);
                return {
                    isUsernameConfirmed: response.$metadata.httpStatusCode === constants_1.StatusCodes.OK ? true : false,
                };
            }
            catch (e) {
                if (e instanceof client_cognito_identity_provider_1.CodeDeliveryFailureException) {
                    throw new errors_1.BadRequestError("code failed to send");
                }
                else if (e instanceof client_cognito_identity_provider_1.UserNotFoundException) {
                    throw new errors_1.BadRequestError("user not found");
                }
                else {
                    throw new errors_1.InternalServerError(e);
                }
            }
        });
    }
    confirmForgotPassword(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, confirmationcode } = args;
                const params = {
                    ClientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
                    SecretHash: yield this.aws.generateSecretHash(email),
                    Username: email,
                    Password: password,
                    ConfirmationCode: confirmationcode,
                };
                const command = new client_cognito_identity_provider_1.ConfirmForgotPasswordCommand(params);
                const response = yield this.client.send(command);
                return {
                    isPasswordChanged: response.$metadata.httpStatusCode === constants_1.StatusCodes.OK ? true : false,
                };
            }
            catch (e) {
                if (e instanceof client_cognito_identity_provider_1.CodeMismatchException) {
                    throw new errors_1.BadRequestError("code doesnt match");
                }
                else if (e instanceof client_cognito_identity_provider_1.ExpiredCodeException) {
                    throw new errors_1.BadRequestError("code expired");
                }
                else if (e instanceof client_cognito_identity_provider_1.InvalidPasswordException) {
                    throw new errors_1.BadRequestError("invalid password");
                }
                else if (e instanceof client_cognito_identity_provider_1.UserNotFoundException) {
                    throw new errors_1.BadRequestError("user not found");
                }
                else if (e instanceof client_cognito_identity_provider_1.UserNotConfirmedException) {
                    throw new errors_1.BadRequestError("user not confirmed");
                }
                else {
                    throw new errors_1.InternalServerError("unexpected error occurred in auth service confirmforgotpassword");
                }
            }
        });
    }
    changePassword(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { previousPassword, proposedPassword, accessToken } = args;
                const params = {
                    PreviousPassword: previousPassword,
                    ProposedPassword: proposedPassword,
                    AccessToken: accessToken,
                };
                const command = new client_cognito_identity_provider_1.ChangePasswordCommand(params);
                const response = yield this.client.send(command);
                return {
                    isChanged: response.$metadata.httpStatusCode === constants_1.StatusCodes.CREATED ? true : false,
                };
            }
            catch (err) {
                throw new errors_1.InternalServerError(err);
            }
        });
    }
    deleteProfile(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                AccessToken: accessToken,
            };
            const command = new client_cognito_identity_provider_1.DeleteUserCommand(input);
            yield this.client.send(command);
        });
    }
    getProfile(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                AccessToken: accessToken,
            };
            const command = new client_cognito_identity_provider_1.GetUserCommand(input);
            const response = yield this.client.send(command);
            return {
                firstName: response.UserAttributes && response.UserAttributes[3].Value,
                lastName: response.UserAttributes && response.UserAttributes[2].Value,
                email: response.UserAttributes && response.UserAttributes[0].Value,
            };
        });
    }
    updateProfile(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, accessToken } = args;
            const input = {
                // UpdateUserAttributesRequest
                UserAttributes: [
                    // AttributeListType // required
                    {
                        // AttributeType
                        Name: "given_name", // required
                        Value: firstName,
                    },
                    {
                        // AttributeType
                        Name: "family_name", // required
                        Value: lastName,
                    },
                ],
                AccessToken: accessToken, // required
            };
            const command = new client_cognito_identity_provider_1.UpdateUserAttributesCommand(input);
            yield this.client.send(command);
            return {
                isUpdated: true,
            };
        });
    }
};
AWSCognito = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [helper_1.AWS])
], AWSCognito);
exports.default = AWSCognito;
//# sourceMappingURL=awscognito.facade.js.map