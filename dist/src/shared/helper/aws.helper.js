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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const crypto_1 = __importDefault(require("crypto"));
const aws_jwt_verify_1 = require("aws-jwt-verify");
let AWS = class AWS {
    constructor() { }
    generateSecretHash(email) {
        return crypto_1.default
            .createHmac("SHA256", `${process.env.AWS_COGNITO_SECRETHASH}`)
            .update(`${email}${process.env.AWS_COGNITO_CLIENT_ID}`)
            .digest("base64");
    }
    getKey(header, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = (0, jwks_rsa_1.default)({
                jwksUri: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
            });
            client.getSigningKey(header.kid, (err, key) => {
                if (err) {
                    callback(err);
                }
                else {
                    const signingKey = key === null || key === void 0 ? void 0 : key.getPublicKey;
                    console.log("signed key: " + signingKey);
                    callback(null, signingKey);
                }
            });
        });
    }
    verifySecret(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifier = aws_jwt_verify_1.CognitoJwtVerifier.create({
                userPoolId: `${process.env.AWS_COGNITO_USER_POOL_ID}`,
                tokenUse: "access",
                clientId: `${process.env.AWS_COGNITO_CLIENT_ID}`,
            });
            return yield verifier.verify(token);
        });
    }
};
AWS = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AWS);
exports.default = AWS;
//# sourceMappingURL=aws.helper.js.map