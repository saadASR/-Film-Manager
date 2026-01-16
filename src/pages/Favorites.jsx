import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromFavorites } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites, loading, error } = useSelector((state) => state.movies);

  if (loading && favorites.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #faf8f5, #ffffff)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem', 
            color: '#8b7355' 
          }}>⭐</div>
          <p style={{ color: '#718096', fontSize: '1.1rem' }}>
            Chargement de vos favoris...
          </p>
        </div>
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
            onClick={() => navigate('/')}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5' }}>
      {/* Header Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Mes Favoris</h1>
          <p>Votre collection personnelle de films préférés</p>
          
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            marginTop: '2rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>🎬</span>
              Explorer des films
            </button>
            
            {favorites.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Êtes-vous sûr de vouloir vider tous vos favoris?')) {
                    favorites.forEach(movie => {
                      dispatch(removeFromFavorites(movie.id));
                    });
                  }
                }}
                className="btn btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>🗑️</span>
                Vider tout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Favorites Grid */}
      <section>
        {favorites.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            background: 'white',
            borderRadius: '1rem',
            margin: '2rem auto',
            maxWidth: '600px'
          }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1rem', 
              color: '#8b7355' 
            }}>💝</div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#2d3748', 
              marginBottom: '1rem' 
            }}>
              Aucun favori
            </h2>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>
              Ajoutez des films à vos favoris depuis la page de détails ou directement depuis la liste des films.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn btn-primary"
              style={{ marginTop: '2rem' }}
            >
              Explorer des films
            </button>
          </div>
        ) : (
          <div>
            <div className="section-title">
              <h2>Mes Films Favoris</h2>
              <span className="movie-count">
                {favorites.length} film{favorites.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="grid grid-4">
              {favorites.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  showFavoriteActions={true}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;
