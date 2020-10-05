import * as actionTypes from './actionTypes';
import {FetchActionType, SearchResultsState} from '../common/types';

const searchResults: SearchResultsState = { searchResults: []};

const reducer = (
    state: SearchResultsState = searchResults,
    action: FetchActionType
): SearchResultsState => {
    switch (action.type) {
        case actionTypes.FETCH_RESULTS: {
            return {
                searchResults: action.payload
            }
        }
    }

    return searchResults;
};

export default reducer;