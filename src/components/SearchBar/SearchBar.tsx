import React, { useEffect } from 'react';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import './SearchBar.scss';

import Logo from '../../assets/flickrLogo.png';

type ISearchBarProps = {
    fetchResults:(searchQuery: string) => void;
}


const SearchBar: React.FC<ISearchBarProps> = ({fetchResults}) => {
    const dispatch: Dispatch<any> = useDispatch();
    const [searchTerms, updateSearchTerms] = React.useState<string>("golden retriever");

    const getImages = () => dispatch(fetchResults(searchTerms));
    
    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == 'Enter') {
            getImages();
        }
    }

    useEffect(() => {
        getImages()
    }, [])

    return (<div className="searchBar">
        <div className="searchBar__container">
            <div className="searchBar__container__title">
                <img src={Logo} />
                <h1>Search</h1>
            </div>
            <div className="searchBar__container__search">
                    <input 
                        type="text"
                        placeholder="Search for..."
                        id="searchField" 
                        onChange={(event) => updateSearchTerms(event.target.value)}
                        onKeyPress={(event) => handleKeyPress(event)}
                    />
                    <div 
                        className="searchBar__container__search_button"
                        onClick={getImages}
                    >
                        Search
                    </div>
            </div>
        </div>
    </div>)
}

export default SearchBar;
