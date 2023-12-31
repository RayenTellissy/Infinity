export const usernameRegex = /^[a-zA-Z0-9]{3,19}$/
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const passwordRegex = /^.{8,}$/

export const primsaUserSafeDetails = {
  id: true,
  username: true,
  email: true,
  image: true
}

export const videoTags = [
  "Gaming",
  "Technology",
  "Cooking/Food",
  "Travel", 
  "Vlogging", 
  "Fitness", 
  "Education", 
  "Tutorial", 
  "News", 
  "Sports",
  "Art",
  "Comedy",
  "Cars",
  "Unboxing",
  "Documentaries",
  "Photography",
  "Motivation"
]

export const purpleButtonStyling = "bg-purple-600 hover:bg-purple-700 active:bg-purple-500 dark:text-white"

export const videoMaxSize = 100 * 1024 * 1024 // 100MB
export const thumbnailMaxSize = 2 * 1024 * 1024 // 2mb
export const avatarMaxSize = 1024 * 1024 // 1mb