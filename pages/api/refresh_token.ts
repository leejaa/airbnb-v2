import { verify } from "jsonwebtoken";
import { sendRefreshToken, createRefreshToken, createAccessToken } from "./auth";
import { PrismaClient } from "@prisma/client";


export default async (req, res) => {
    const token = req?.cookies?.jid ?? '';
    if (!token) {
        return res.send({ ok: false, accessToken: "" });
    }
    let payload: any = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
        console.log('error', err);
        return res.send({ ok: false, accessToken: "" });
    }
    // token is valid and
    // we can send back an access token
    // const user = await User.findOne({ id: payload.userId });
    // if (!user) {
    //     return res.send({ ok: false, accessToken: "" });
    // }
    // if (user.tokenVersion !== payload.tokenVersion) {
    //     return res.send({ ok: false, accessToken: "" });
    // }
    // sendRefreshToken(res, createRefreshToken(user));
    const accessToken = createAccessToken(payload?.userId ?? '');
    return res.send({ ok: true, accessToken });
}
