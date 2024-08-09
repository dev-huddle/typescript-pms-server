"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountTypes = exports.UserAccountStatus = exports.UserRoles = void 0;
var UserRoles;
(function (UserRoles) {
    UserRoles["CUSTOMER"] = "CUSTOMER";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
var UserAccountStatus;
(function (UserAccountStatus) {
    UserAccountStatus["ACTIVE"] = "ACTIVE";
    UserAccountStatus["BLOCKED"] = "BLOCKED";
    UserAccountStatus["INCOMPLETE"] = "INCOMPLETE";
})(UserAccountStatus || (exports.UserAccountStatus = UserAccountStatus = {}));
var UserAccountTypes;
(function (UserAccountTypes) {
    UserAccountTypes["INDIVIDUAL"] = "INDIVIDUAL";
    UserAccountTypes["ORGANIZATION"] = "ORGANIZATION";
})(UserAccountTypes || (exports.UserAccountTypes = UserAccountTypes = {}));
//# sourceMappingURL=user.constant.js.map