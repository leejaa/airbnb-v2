import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (userId: any) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "1h"
    });
};

export const createRefreshToken = (user: any) => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "30d"
        }
    );
};

export const sendRefreshToken = (res: Response, token: string) => {
    console.log('new refresh token', token);
    res.cookie("jid", token, {
        httpOnly: true,
        secure: true,
        // domain: '.herokuapp.com',
        // www.example.com
        // api.example.com
        // path: "/refresh_token"
    });
};