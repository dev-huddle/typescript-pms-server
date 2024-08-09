"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const propertySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: [constants_1.PropertyTypes.HOTEL],
        required: true,
    },
    address: {
        street: {
            type: String,
            required: true,
            trim: true,
        },
        city: {
            type: String,
            required: true,
            trim: true,
        },
        state: {
            type: String,
            required: true,
            trim: true,
        },
        zipcode: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
    },
    media: [
        new mongoose_1.Schema({
            title: {
                type: String,
                required: true,
            },
            key: {
                type: String,
                required: true,
            },
            file_type: {
                type: String,
                enum: [constants_1.PropertyFileTypes.PICTURE, constants_1.PropertyFileTypes.VIDEO],
            },
        }),
    ],
    creator_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
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
exports.default = (0, mongoose_1.model)("Property", propertySchema);
//# sourceMappingURL=property.schema.js.map