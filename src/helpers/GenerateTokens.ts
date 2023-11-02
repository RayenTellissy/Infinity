import jwt from "jsonwebtoken"

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "30s" })
}

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: "7d" })
}