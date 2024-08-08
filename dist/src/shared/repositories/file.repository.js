"use strict";
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
const constants_1 = require("../constants");
const errors_1 = require("../errors");
const schemas_1 = require("../schemas");
class FileRepository {
    constructor() { }
    create(args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemas_1.filemanagerSchema.create(args);
            }
            catch (err) {
                throw new errors_1.InternalServerError("failed to upload file(s)");
            }
        });
    }
    fetchAll() {
        throw new Error("Method not implemented.");
    }
    fetchOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.findOne({ _id: id });
        });
    }
    update(id, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schemas_1.filemanagerSchema.findOneAndUpdate({ _id: id }, update);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    fetchFileByName(name, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield schemas_1.filemanagerSchema.findOne({
                name,
                user: user_id,
                object_type: constants_1.FileManagerObjectTypes.FILE,
            });
            return response;
        });
    }
}
exports.default = FileRepository;
//# sourceMappingURL=file.repository.js.map