import * as actionTypes from './actionTypes';
import {BASE_URL, ACCESS_KEY} from '../common/constants';
import {IImageSearchResult, FetchActionType} from '../common/types';
import axios from 'axios';

export function fetchResults(searchTags: String) {
    let searchTagsTransformed = searchTags.split(' ').join(',');
    let url = `${BASE_URL}?tags=${searchTagsTransformed}&format=json`;

    return function(dispatch: any) {
         return axios.get(BASE_URL, {
             params: {
                 query: searchTagsTransformed,
                 client_id: ACCESS_KEY,
                 per_page: 20
             }
         })
            .then((responce) => responce.data)
            .then((json) => dispatch(getImagesInfo(json)));
     } 
}

function getImagesInfo(jsonObject: any): FetchActionType {
    console.log(jsonObject);
    const athorNameRegex = /"([^"]*)"/;
    const dateTakenRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})/;

    let images: IImageSearchResult[]  = jsonObject.results.map((item: any) => {
        let authorNameParsed = "";
        let dateTakenParsed = dateTakenRegex.exec(item.created_at);

        let allTags = item.tags.map((item: any) => item.title);
        let firstFourTags = allTags.length > 4 ? allTags.slice(0, 4) : allTags.slice(0, allTags.length);

        console.log(item.urls.full);

        return {
            imageUrl: item.urls.small,
            date: dateTakenParsed ? dateTakenParsed[0] : undefined,
            fullImageUrl: item.urls.full,
            author: authorNameParsed ? authorNameParsed[1] : '',
            tags: firstFourTags
        }
    });

    return {
        type: actionTypes.FETCH_RESULTS,
        payload: images
    };
}