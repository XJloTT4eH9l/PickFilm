import { Routes, Route } from 'react-router-dom';

import Header from '../../components/Header/Header';
import SpinPage from '../SpinPage/SpinPage';
import MoviePage from '../MoviePage/MoviePage';
import TvPage from '../TvPage/TvPage';
import SearchPage from '../SearchPage/SearchPage';
import WatchListPage from '../WatchListPage/WatchListPage';
import CatalogPage from '../CatalogPage/CatalogPage';

import './App.scss';

function App() {
  return (
    <div className="app">
        <Header />
        <Routes>
          <Route path='/PickFilm' element={ <SpinPage /> } />
          <Route path='/movies/:id' element={ <MoviePage /> } />
          <Route path='/tv/:id' element={ <TvPage /> } />
          <Route path='/search' element={ <SearchPage /> } />
          <Route path='/watchlist' element={ <WatchListPage /> } />
          <Route path='/catalog' element={ <CatalogPage /> } />
        </Routes>
    </div>
  );
}

export default App;
