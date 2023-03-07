import { Routes, Route } from 'react-router-dom';
import Header from '../../components/Header/Header';
import SpinPage from '../SpinPage/SpinPage';
import './App.scss';

function App() {
  return (
    <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={ <SpinPage /> } />
        </Routes>
    </div>
  );
}

export default App;
