import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: SignOptions,
): string => {
  const token = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return token;
};
