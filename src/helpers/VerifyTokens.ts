
// type decodedJwt = JwtPayload & {
//   id: string
// }

// export const verifyAccessToken = (token: string, id: string) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as decodedJwt
//     return decoded
//   }
//   catch(error){
//     console.log(error)
//   }
// }

// export const verifyRefreshToken = (token: string, id: string) => {
//   const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string, (error, decoded) => {
//     if(error){
//       return false
//     }
//     return true
//   })
// }