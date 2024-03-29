import { Routes, Route } from 'react-router-dom';

import Header from '../../components/Header/Header';
import SpinPage from '../SpinPage/SpinPage';
import MoviePage from '../MoviePage/MoviePage';
import TvPage from '../TvPage/TvPage';
import SearchPage from '../SearchPage/SearchPage';
import WatchListPage from '../WatchListPage/WatchListPage';
import CatalogPage from '../CatalogPage/CatalogPage';
import ActorPage from '../ActorPage/ActorPage';
import LogInPage from '../LogInPage/LogInPage';
import SignInPage from '../SignInPage/SignInPage';

import './App.scss';

function App() {
  return (
    <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={ <SpinPage /> } />
          <Route path='/movie/:id' element={ <MoviePage /> } />
          <Route path='/tv/:id' element={ <TvPage /> } />
          <Route path='/search' element={ <SearchPage /> } />
          <Route path='/watchlist' element={ <WatchListPage /> } />
          <Route path='/catalog' element={ <CatalogPage /> } />
          <Route path='/person/:id' element={ <ActorPage /> }/>
          <Route path='/login' element={ <LogInPage /> } />
          <Route path='/signup' element={ <SignInPage /> } />
        </Routes>
    </div>
  );
}

export default App;
