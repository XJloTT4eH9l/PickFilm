import { Routes, Route } from 'react-router-dom';

import Header from '../../components/Header/Header';
import SpinPage from '../SpinPage/SpinPage';
import MoviePage from '../MoviePage/MoviePage';

import './App.scss';

function App() {
  return (
    <div className="app">
        <Header />
        <Routes>
          <Route path='/PickFilm' element={ <SpinPage /> } />
          <Route path='/movies/:id' element={ <MoviePage /> } />
        </Routes>
    </div>
  );
}

export default App;
