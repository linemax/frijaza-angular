
export interface Photo {
    id: string
    url: string
    created_at: Date
    updated_at: Date
}

export interface PhotosResponse {
    "current_page": number
    "data": Photo[],
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