import * as actionTypes from './actionTypes';
import {BASE_URL} from '../common/constants';
import {IImageSearchResult, FetchActionType} from '../common/types';
import fetchJsonp from 'fetch-jsonp';

export function fetchResults(searchTags: String) {
    let searchTagsTransformed = searchTags.split(' ').join(',');
    let url = `${BASE_URL}?tags=${searchTagsTransformed}&format=json`;

    return function(dispatch: any) {
         return fetchJsonp(url, {jsonpCallbackFunction: 'jsonFlickrFeed'})
            .then((responce) => responce.json())
            .then((json) => dispatch(getImagesInfo(json)));
     } 
}

function getImagesInfo(jsonObject: any): FetchActionType {
    const athorNameRegex = /"([^"]*)"/;
    const dateTakenRegex = /^(\d{4})\-(\d{1,2})\-(\d{1,2})/;

    let images: IImageSearchResult[]  = jsonObject.items.map((item: any) => {
        let authorNameParsed = athorNameRegex.exec(item.author);
        let dateTakenParsed = dateTakenRegex.exec(item.date_taken);

        let allTags = item.tags.split(' ');
        let firstFourTags = allTags.length > 4 ? allTags.slice(0, 4) : allTags.slice(0, allTags.length);

        return {
            imageUrl: item.media.m,
            date: dateTakenParsed ? dateTakenParsed[0] : undefined,
            flickrUrl: item.link,
            author: authorNameParsed ? authorNameParsed[1] : '',
            tags: firstFourTags
        }
    });

    return {
        type: actionTypes.FETCH_RESULTS,
        payload: images
    };
}