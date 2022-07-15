import jwt, { JwtPayload } from "jsonwebtoken";
import jwk from "../jwk.json";

const createToken = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const expiresIn: number = 1 * 24 * 60 * 60;
      jwt.sign({ id }, jwk.privateKey, { algorithm: "RS256", expiresIn }, (err, encoded) => {
        if (err) {
          reject(err);
        }
        resolve(encoded as string);
      });
    } catch (error) {
      console.log(error);
    }
  });
};

const getJwtPayload = async (token: string): Promise<JwtPayload | null> => {
  return new Promise((resolve) => {
    let payload: JwtPayload | null = null;
    try {
      jwt.verify(token, jwk.publicKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) console.log(err);
        else payload = decoded as JwtPayload;
      });
    } catch (error) {
      console.log(error);
    }
    resolve(payload);
  });
};

export const AuthUtil = {createToken, getJwtPayload}