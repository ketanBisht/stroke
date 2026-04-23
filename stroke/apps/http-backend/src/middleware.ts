import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import  Jwt, { JwtPayload }  from "jsonwebtoken";

export function middleware(req : Request, res :Response , next : NextFunction){
    const token = req.headers["authorization"] ?? "" ;

    const decode = Jwt.verify(token , JWT_SECRET) ; 

    if(decode){

        req.userId = (decode as JwtPayload & { userId : string}).userId ;
        next();
    }else{
        res.status(403).json({
            message: "unauthorized"
        })
    }

}