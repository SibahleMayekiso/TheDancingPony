import { JwtPayload } from "../../middleware/jwt-payload";

export { }

declare global {
    namespace Express {
        interface Request {
            userPayload: JwtPayload;
        }
    }
}