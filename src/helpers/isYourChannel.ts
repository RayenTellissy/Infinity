const isYourChannel = (pathname: string, username: string) => {
  return pathname === username
}

export default isYourChannel