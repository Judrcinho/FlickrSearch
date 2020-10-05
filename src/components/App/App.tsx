import React from 'react';

import {fetchResults} from '../../store/actionCreators';
import SearchBar from '../SearchBar/SearchBar';
import ResultsList from '../ResultsList/ResultsList';
import './App.scss';


const App = () => {
  return (
    <div className="container">
      <SearchBar fetchResults={fetchResults}/>
      <ResultsList fetchResults={fetchResults}/>
    </div>
  );
}

export default App;


