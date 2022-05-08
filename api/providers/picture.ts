export interface IPicture {
  id: string
  filename: string
  uploader: string
  uploadedAt: Date
  favorites: number
  comments: Array<string>
}

export default class Picture implements IPicture {
  id: string
  filename: string
  uploader: string
  uploadedAt: Date
  favorites: number
  comments: string[]
}