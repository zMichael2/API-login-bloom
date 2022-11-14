import jwt from "jsonwebtoken";

export const generateJwt = (email = "") => {
  return new Promise((resolve, reject) => {
    const payload = { email };
    const secretKet = `${process.env.SECRETKEY}`;
    jwt.sign(
      payload,
      secretKet,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Failed to generate token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
