"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSSESTemplates = exports.AWSServices = exports.AWSSNSTargetARN = void 0;
exports.AWSSNSTargetARN = {
    GENERAL: `${process.env.AWS_SNS_TARGET_ARN_GENERAL}`,
    UPDATE: `${process.env.AWS_SNS_TARGET_ARN_UPDATE}`,
};
var AWSServices;
(function (AWSServices) {
    AWSServices["SQS"] = "sqs";
})(AWSServices || (exports.AWSServices = AWSServices = {}));
var AWSSESTemplates;
(function (AWSSESTemplates) {
})(AWSSESTemplates || (exports.AWSSESTemplates = AWSSESTemplates = {}));
//# sourceMappingURL=aws.constant.js.map