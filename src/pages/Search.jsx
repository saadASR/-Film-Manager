import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovies, clearSearchResults } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Search = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.movies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      dispatch(clearSearchResults());
    }
  };

  return (
    <div>
      {/* Search Header */}
      <div className="hero">
        <div className="hero-content">
          <h1>Rechercher des Films</h1>
          <p>Trouvez vos films préférés dans notre collection</p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} style={{ maxWidth: '600px', margin: '2rem auto 0' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Entrez un titre de film..."
                style={{
                  width: '100%',
                  padding: '1rem 3rem 1rem 1rem',
                  fontSize: '1.1rem',
                  border: '2px solid #e2d8c1',
                  borderRadius: '2rem',
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem'
                }}
              >
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <section>
        {loading && (
          <div className="loading-container">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#e53e3e' }}>⚠️</div>
            <div className="error-message" style={{ marginBottom: '2rem' }}>
              {error}
            </div>
            <button
              onClick={() => dispatch(searchMovies(query))}
              className="btn btn-primary"
            >
              Réessayer
            </button>
          </div>
        )}

        {!loading && !error && searchResults.length === 0 && query && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#8b7355' }}>🔍</div>
            <h2 style={{ fontSize: '1.5rem', color: '#2d3748', marginBottom: '0.5rem' }}>
              Aucun résultat trouvé
            </h2>
            <p style={{ color: '#718096' }}>
              Aucun film ne correspond à votre recherche "{query}"
            </p>
          </div>
        )}

        {!loading && !error && !query && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#8b7355' }}>🎬</div>
            <h2 style={{ fontSize: '1.5rem', color: '#2d3748', marginBottom: '0.5rem' }}>
              Commencez votre recherche
            </h2>
            <p style={{ color: '#718096' }}>
              Entrez le titre d'un film pour trouver des résultats
            </p>
          </div>
        )}

        {searchResults.length > 0 && (
          <div>
            <div className="section-title">
              <h2>Résultats pour "{query}"</h2>
              <span className="movie-count">
                {searchResults.length} film{searchResults.length > 1 ? 's' : ''} trouvé{searchResults.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-4">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Search;
