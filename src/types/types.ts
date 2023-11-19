export type VideoType = {
  id: string
  title: string
  description?: string
  thumbnail: string
  duration: number
  visibility: "public" | "private"
  owner: User
  ownerId: string
  url: string
  created_at: Date
  likes: number
  dislikes: number
  comments: []
  views: number
  subscribers: number
}

export type HomeVideo = {
  id: string
  title: string
  description?: string
  thumbnail: string
  duration: number
  visibility: "public" | "private"
  owner: User
  ownerId: string
  url: string
  created_at: Date
  likes: number
  dislikes: number
  comments: []
  views: []
  subscribers: number
}

export type User = {
  id?: string
  username?: string
  email?: string
  image?: string
  created_at?: string
}

export type CommentsType = {
  id: string
  user: {
    id: string
    username: string
    image: string
  },
  userId: string
  video: VideoType
  videoId: string
  comment: string
  created_at: Date
}