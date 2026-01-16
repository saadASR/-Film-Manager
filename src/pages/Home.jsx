import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPopularMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, loading, error, favorites } = useSelector((state) => state.movies);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #faf8f5, #ffffff)'
      }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #faf8f5, #ffffff)'
      }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem', 
            color: '#e53e3e' 
          }}>⚠️</div>
          <div className="error-message" style={{ marginBottom: '2rem' }}>
            {error}
          </div>
          <button
            onClick={() => dispatch(fetchPopularMovies())}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const moviesToShow = showFavorites ? favorites : popularMovies;

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5' }}>
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>{showFavorites ? 'Mes Favoris' : 'Films Populaires'}</h1>
          <p>{showFavorites ? 'Votre collection personnelle de films préférés' : 'Découvrez les films les plus appréciés du moment'}</p>
          
          {/* Toggle Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginTop: '2rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setShowFavorites(false)}
              className={`btn ${!showFavorites ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>🎬</span>
              Films Populaires
            </button>
            <button
              onClick={() => setShowFavorites(true)}
              className={`btn ${showFavorites ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>⭐</span>
              Mes Favoris
            </button>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      <section>
        {moviesToShow.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1rem', 
              color: '#8b7355' 
            }}>
              {showFavorites ? '💝' : '📽️'}
            </div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#2d3748', 
              marginBottom: '0.5rem' 
            }}>
              {showFavorites ? 'Aucun favori' : 'Aucun film trouvé'}
            </h2>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              {showFavorites 
                ? 'Commencez à ajouter vos films préférés pour créer votre collection personnelle.'
                : 'Vérifiez votre connexion ou réessayez plus tard.'
              }
            </p>
            {!showFavorites && (
              <button
                onClick={() => window.location.href = '/favoris'}
                className="btn btn-primary"
                style={{ marginTop: '2rem' }}
              >
                Ajouter votre premier film
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="section-title">
              <h2>{showFavorites ? 'Mes Films Favoris' : 'Films du moment'}</h2>
              <span className="movie-count">
                {moviesToShow.length} film{moviesToShow.length > 1 ? 's' : ''} disponible{moviesToShow.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-4">
              {moviesToShow.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  showFavoriteActions={true}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
