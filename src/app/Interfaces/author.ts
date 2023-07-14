import { User } from "./User"
import { Photo } from "./photo"
import { Post } from "./post"

export interface Author {
    id: string
    fname: string
    user: User
    created_at: Date
    updated_at: Date
    photo: Photo
    posts: Post[]
}

export interface AuthorsResponse {
    "current_page": number
    "data": Author[],
    "first_page_url": string
    "from": number
    "last_page": number
    "last_page_url": string,
    // "links": Link[],
    "next_page_url": string | null
    "path": string
    "per_page": number
    "prev_page_url": string | null
    "to": number
    "total": number
}