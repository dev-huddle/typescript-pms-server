"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const userSchema = new mongoose_1.Schema({
    awscognito_user_id: {
        type: String,
        required: true,
    },
    stripe_customer_id: {
        type: String,
    },
    stripe_card_id: {
        type: String,
    },
    stripe_card_last_digits: {
        type: String,
    },
    stripe_card_expire_date: {
        type: String,
    },
    stripe_card_type: {
        type: String,
    },
    active_plan: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Plan",
    },
    status: {
        type: String,
        enum: [
            constants_1.UserAccountStatus.ACTIVE,
            constants_1.UserAccountStatus.BLOCKED,
            constants_1.UserAccountStatus.INCOMPLETE,
        ],
        required: true,
    },
    account_type: {
        type: String,
        enum: [constants_1.UserAccountTypes.INDIVIDUAL, constants_1.UserAccountTypes.ORGANIZATION],
        default: constants_1.UserAccountTypes.INDIVIDUAL,
    },
    isFirstLogin: {
        type: Boolean,
        default: false,
    },
    created_at: {
        type: Date,
        default: function () {
            return Date.now();
        },
    },
    updated_at: {
        type: Date,
    },
});
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.schema.js.map