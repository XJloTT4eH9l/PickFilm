import { Routes, Route } from 'react-router-dom';

import Header from '../../components/Header/Header';
import SpinPage from '../SpinPage/SpinPage';
import MoviePage from '../MoviePage/MoviePage';
import TvPage from '../TvPage/TvPage';

import './App.scss';

function App() {
  return (
    <div className="app">
        <Header />
        <Routes>
          <Route path='/PickFilm' element={ <SpinPage /> } />
          <Route path='/movies/:id' element={ <MoviePage /> } />
          <Route path='/tv/:id' element={ <TvPage /> } />
        </Routes>
    </div>
  );
}

export default App;
