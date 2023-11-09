export type VideoType = {
  id: string
  title: string
  description?: string
  thumbnail: string
  duration: number
  visibility: "public" | "private"
  owner: object
  ownerId: string
  url: string
  created_at: Date
  VideoLikes: []
  VideoComments: []
}