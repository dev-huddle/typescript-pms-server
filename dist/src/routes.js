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
exports.routes = exports.router = void 0;
const express_1 = require("express");
const constants_1 = require("./shared/constants");
const routers_1 = require("./modules/auth/routers");
const routers_2 = require("./modules/property/routers");
const routers_3 = require("./modules/hotel/routers");
exports.router = (0, express_1.Router)({});
exports.router.get("/", (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({
            statusCode: constants_1.StatusCodes.OK,
            message: "successfully passed healthcheck!!!",
        });
        res.status(constants_1.StatusCodes.OK);
    }
    catch (error) {
        res.send(error.message);
        res.status(constants_1.StatusCodes.SERVICE_UNAVAILABLE).send();
    }
}));
exports.routes = [
    {
        base: "",
        routes: [
            {
                path: "/healthcheck",
                router: exports.router,
            },
        ],
    },
    {
        base: "customer",
        routes: [
            {
                path: "/auth",
                router: routers_1.customerAuthRouter,
            },
            {
                path: "/property",
                router: routers_2.propertyRouter,
            },
        ],
    },
    {
        base: "hotel",
        routes: [
            {
                path: "/rooms/types",
                router: routers_3.hotelRoomTypeRouter,
            },
            {
                path: "/rooms",
                router: routers_3.hotelRoomRouter,
            },
            {
                path: "/amenities",
                router: routers_3.hotelAmenityRouter
            },
            {
                path: "/amenities/menu",
                router: routers_3.hotelAmenityMenuRouter
            },
            {
                path: "/amenities/orders",
                router: routers_3.hotelOrderRouter
            },
            {
                path: "/bookings",
                router: routers_3.hotelBookingRouter
            }
        ],
    },
];
//# sourceMappingURL=routes.js.map