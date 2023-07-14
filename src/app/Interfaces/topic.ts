import { User } from "./User"
import { Photo } from "./photo"
import { Post } from "./post"

export interface Topic {
    id: string
    name: string
    posts: Post[]
    created_at: Date
    updated_at: Date
}

export interface TopicsResponse {
    "current_page": number
    "data": Topic[],
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