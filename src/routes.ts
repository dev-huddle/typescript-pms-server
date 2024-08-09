import { Router } from "express";
import { ServerRouter } from "./shared/interfaces";
import { StatusCodes } from "./shared/constants";
import { customerAuthRouter } from "./modules/auth/routers";
import { propertyRouter } from "./modules/property/routers";

export const router = Router({});

router.get("/", async (_req, res, _next) => {
  try {
    res.send({
      statusCode: StatusCodes.OK,
      message: "successfully passed healthcheck!!!",
    });
    res.status(StatusCodes.OK);
  } catch (error: any) {
    res.send(error.message);
    res.status(StatusCodes.SERVICE_UNAVAILABLE).send();
  }
});

export const routes: ServerRouter[] = [
  {
    base: "",
    routes: [
      {
        path: "/healthcheck",
        router: router,
      },
    ],
  },
  {
    base: "customer",
    routes: [
      {
        path: "/auth",
        router: customerAuthRouter,
      },
      {
        path: "/property",
        router: propertyRouter
      }
    ],
  },
  {
    base: "admin",
    routes: [
      
    ],
  },
];
