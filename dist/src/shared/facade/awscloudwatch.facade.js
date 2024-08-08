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
const client_cloudwatch_logs_1 = require("@aws-sdk/client-cloudwatch-logs");
let AWSCloudWatch = class AWSCloudWatch {
    constructor() {
        this.client = new client_cloudwatch_logs_1.CloudWatchLogsClient({
            region: `${process.env.AWS_CLOUDWATCH_REGION}`,
            credentials: {
                accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
                secretAccessKey: `${process.env.AWS_SECRET_ACCESS_KEY}`,
            },
        });
    }
    sendLog(message, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = Number(Date.now());
            const events = metadata
                ? [
                    {
                        message,
                        timestamp: date,
                    },
                    {
                        message: JSON.stringify(metadata),
                        timestamp: date,
                    },
                ]
                : [
                    {
                        message,
                        timestamp: date,
                    },
                ];
            const command = new client_cloudwatch_logs_1.PutLogEventsCommand({
                logGroupName: `${process.env.AWS_CLOUDWATCH_LOGGROUPNAME}`,
                logStreamName: `${process.env.AWS_CLOUDWATCH_LOGSTREAMNAME}`,
                logEvents: events,
            });
            yield this.client.send(command);
        });
    }
};
AWSCloudWatch = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], AWSCloudWatch);
exports.default = AWSCloudWatch;
//# sourceMappingURL=awscloudwatch.facade.js.map