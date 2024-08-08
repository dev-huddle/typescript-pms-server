"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true,
    },
    stripe_plan_id: {
        type: String,
        required: true,
    },
    stripe_price_id: {
        type: String,
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
exports.default = (0, mongoose_1.model)("Plan", planSchema);
//# sourceMappingURL=plan.schema.js.map