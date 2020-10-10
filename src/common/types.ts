export interface IImageSearchResult {
    fullImageUrl: string,
    imageUrl: string,
    date: string,
    author: string,
    tags: string[]
}

export type FetchActionType = {
    type: string,
    payload: IImageSearchResult[]
}

export type SearchResultsState = {
    searchResults: IImageSearchResult[]
}
