"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const fileManagerSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    key: {
        type: String,
    },
    size: {
        type: String,
    },
    extension: {
        type: String,
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    object_type: {
        type: String,
        enum: [constants_1.FileManagerObjectTypes.FILE, constants_1.FileManagerObjectTypes.FOLDER],
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
exports.default = (0, mongoose_1.model)("FileManager", fileManagerSchema);
//# sourceMappingURL=filemanager.schema.js.map