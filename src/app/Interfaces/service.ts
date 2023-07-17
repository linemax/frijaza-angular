import { Photo } from "./photo"

export interface Service {
    id: string
    name: string
    description: string
    photo: Photo
    created_at: Date
    updated_at: Date
}

export interface ServicesResponse {
    "current_page": number
    "data": Service[],
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