import { Author } from "./author"
import { Photo } from "./photo"
import { Topic } from "./topic"

export interface Post {
    id: string
    title: string
    read_time: string
    introduction: string
    body: string
    created_at: Date
    updated_at: Date
    photo: Photo
    author: Author,
    category: Topic

}

export interface PostsResponse {
    "current_page": number
    "data": Post[],
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