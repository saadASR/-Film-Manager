import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import AddMovie from './pages/AddMovie';
import MovieDetails from './pages/MovieDetails';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recherche" element={<Search />} />
              <Route path="/favoris" element={<Favorites />} />
              <Route path="/ajouter" element={<AddMovie />} />
              <Route path="/film/:id" element={<MovieDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
