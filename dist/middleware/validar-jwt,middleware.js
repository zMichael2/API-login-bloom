"use strict";
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import User from "../models/user.schema";
// export const holaaaa = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const secretk = `${process.env.SECRETKEY}`;
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWtvbGRlc2lnbmVyQGdtYWlsLmNvbSIsImlhdCI6MTY3MDYwNzgxMSwiZXhwIjoxNjcwNjIyMjExfQ.j1udk1vbw-JCc-FYBQx5ujAEnmdtKW6mTXOwM_vTDJs";
//   const {email} = jwt.verify(token, secretk || "testtoken");
//   console.log(xd);
// };
// export const validarJWT = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.header("x-token"); //como lo especifique aqui es como lo va a leer
//   const secretk = `${process.env.SECRETKEY}`;
//   if (!token) {
//     return res.status(401).json({
//       msg: "There is no token in the request.",
//     });
//   }
//   try {
//     const { email } = jwt.verify(token, secretk);
//     //leer el usuario que corresponde al uid
//     const usuario = await Usuario.findById(verificar);
//     if (!usuario) {
//       return res.status(401).json({
//         msg: "Token no válido - usuario no existe",
//       });
//     }
//     //verificar si el uid tiene estado en tru
//     if (!usuario.estado) {
//       //false o === false signifca esto
//       return res.status(401).json({
//         msg: "Token no válido - usuario eliminado",
//       });
//     }
//     req.usuario = usuario;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({
//       msg: "invalid token",
//     });
//   }
// };
//# sourceMappingURL=validar-jwt,middleware.js.map