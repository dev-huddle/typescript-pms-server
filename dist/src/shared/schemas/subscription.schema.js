"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const subscriptionSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    plan: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Plan",
    },
    stripe_subscription_id: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: [
            constants_1.SubscriptionStatus.ACTIVE,
            constants_1.SubscriptionStatus.INACTIVE,
            constants_1.SubscriptionStatus.EXPIRED,
            constants_1.SubscriptionStatus.CANCELLED,
        ],
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
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
exports.default = (0, mongoose_1.model)("Subscription", subscriptionSchema);
//# sourceMappingURL=subscription.schema.js.map