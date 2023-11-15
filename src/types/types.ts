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
  VideoLikes: []
  VideoComments: []
  VideoViews: []
}

export type User = {
  id?: string
  username?: string
  email?: string
  image?: string
  created_at?: string
}