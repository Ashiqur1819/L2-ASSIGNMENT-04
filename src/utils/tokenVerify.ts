import jwt from "jsonwebtoken";

export const verifyToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, decoded };
  } catch (error) {
    return { success: false, decoded: null };
  }
};
