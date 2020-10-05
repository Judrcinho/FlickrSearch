import React from 'react';
import {useSelector} from 'react-redux'; 
import {SearchResultsState} from '../../common/types';
import ResultCard from '../ResultCard/ResultCard';
import './ResultsList.scss';

type ResultsListProps = {
    fetchResults:(searchQuery: string) => void;
}

const ResultsList: React.FC<ResultsListProps> = (props) => {
    const searchResults = useSelector((state: SearchResultsState) => state.searchResults);

    return <div className="resultList">
        {searchResults.map((searchItem, index) => 
            <ResultCard 
                result={searchItem} 
                key={index}
                fetchResults={props.fetchResults}    
            />)}
    </div>
}

export default ResultsList;