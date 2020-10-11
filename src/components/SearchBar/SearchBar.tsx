import React, { RefObject, useCallback, useEffect } from 'react';
import {Dispatch} from 'redux';
import {useDispatch} from 'react-redux';
import debounce from 'lodash.debounce';

import Logo from '../../assets/flickrLogo.png';

import './SearchBar.scss';

type ISearchBarProps = {
    fetchResults:(searchQuery: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({fetchResults}) => {
    const dispatch: Dispatch<any> = useDispatch();
    const inputFieldRef: RefObject<HTMLInputElement> = React.createRef();

    const [userQuery, setUserQuery] = React.useState<string>("racoon");  
    
    const getImages = () => dispatch(fetchResults(userQuery));
    const delayedRequest = useCallback(debounce(getImages, 750), [userQuery]);

    const onInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserQuery(e.target.value);
      };

      useEffect(() => {
        if (userQuery !== "") {
            delayedRequest();
        }

        return delayedRequest.cancel;
      }, [userQuery, delayedRequest]);


    const clearSearch = () => {        
        if (inputFieldRef.current) {
            inputFieldRef.current.value = "";
        }
    }

    return (<div className="searchBar">
        <div className="searchBar__container">
            <div className="searchBar__container__title">
                <img src={Logo} alt="logo"/>
                <h1>Search</h1>
            </div>
            <div className="searchBar__container__search">
                    <input 
                        type="text"
                        placeholder="Search for..."
                        id="searchField" 
                        onChange={onInputFieldChange}
                        ref={inputFieldRef}
                    />
                    <div 
                        className="searchBar__container__search_button"
                        onClick={clearSearch}
                    >
                        Clear search
                    </div>
            </div>
        </div>
    </div>)
}

export default SearchBar;
