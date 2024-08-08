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
const client_sns_1 = require("@aws-sdk/client-sns");
const services_1 = require("../services");
const constants_1 = require("../constants");
let AWSSNS = class AWSSNS {
    constructor(loggerService) {
        this.loggerService = loggerService;
        this.client = new client_sns_1.SNSClient({
            region: `${process.env.AWS_SNS_REGION}`,
            credentials: {
                accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
                secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
            },
        });
    }
    registerPhoneToken(user_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                PlatformApplicationArn: `${process.env.AWS_SNS_PLATFORM_APPLICATION_ARN}`,
                Token: token,
                CustomUserData: user_id,
            };
            const command = new client_sns_1.CreatePlatformEndpointCommand(input);
            this.client
                .send(command)
                .then(() => { })
                .catch((err) => __awaiter(this, void 0, void 0, function* () {
                yield this.loggerService.log(err.message, {
                    user_id,
                    token,
                });
            }));
        });
    }
    pushNotification(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                TargetArn: args.targetarn,
                Message: args.message,
                Subject: args.subject,
            };
            const command = new client_sns_1.PublishCommand(input);
            yield this.client.send(command);
        });
    }
    subscribeNotification(topicarn) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = {
                TopicArn: topicarn,
                Protocol: `${constants_1.AWSServices.SQS}`,
                Endpoint: `${process.env.AWS_SNS_ENDPOINT_GENERAL}`,
            };
            const command = new client_sns_1.SubscribeCommand(input);
            yield this.client.send(command);
        });
    }
};
AWSSNS = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [services_1.LoggerService])
], AWSSNS);
exports.default = AWSSNS;
//# sourceMappingURL=awssns.facade.js.map