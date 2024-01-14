import { error, HttpError, Payload } from "app";
import { NextFunction, Request, Response, Router } from "express";
import {
    createUser,
    findUser,
    getUserById,
    importUser,
    updateUser,
} from "../../controllers";
import { ImportUserReqBody } from "../../interfaces/request";
import { FindReqQuery } from "../../interfaces/request";
import { verifyRole } from "../../middlewares";
import { findUserValidator } from "../../validator";

export const router: Router = Router();

router.get(
    "/",
    verifyRole("SA"),
    findUserValidator(),
    async (req: Request, _: Response, next: NextFunction) => {
        const query = req.query as unknown as FindReqQuery;
        const payload = req.payload as Payload;
        const result = await findUser({
            ...query,
            userRoles: payload.roles,
        });
        next(result);
    }
);

router.post(
    "/",
    verifyRole("SA"),
    async (req: Request, _: Response, next: NextFunction) => {
        const body = req.body;
        const payload = req.payload as Payload;
        const result = await createUser({
            ...body,
            userId: payload.id,
            userRoles: payload.roles,
        });
        next(result);
    }
);

router.post(
    "/import",
    verifyRole("SA"),
    // importUserValidator(),
    async (req: Request, _: Response, next: NextFunction) => {
        if (!Array.isArray(req.body)) {
            throw new HttpError(
                error.invalidData({
                    location: "body",
                    value: req.body,
                    message: "request body must be an array",
                })
            );
        }

        const body: ImportUserReqBody = req.body;
        const payload = req.payload as Payload;

        const result = await importUser({
            data: body,
            userId: payload.id,
            userRoles: payload.roles,
        });
        next(result);
    }
);


router.get(
    "/:userId",
    verifyRole("*"),
    async (req: Request, _: Response, next: NextFunction) => {
        const payload = req.payload as Payload;
        const { userId } = req.params;
        const result = await getUserById({
            id: userId,
            userRoles: payload.roles,
            userId: payload.id,
        });
        next(result);
    }
);

router.put(
    "/:userId",
    verifyRole("SA", "T", "S"),
    async (req: Request, _: Response, next: NextFunction) => {
        const body = req.body;
        const payload = req.payload as Payload;
        const userId = req.params.userId as string;
        const result = await updateUser({
            ...body,
            id: userId,
            userId: payload.id,
            userRoles: payload.roles,
        });
        next(result);
    }
);
