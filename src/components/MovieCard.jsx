import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../store/movieSlice';

const MovieCard = ({ movie, showFavoriteActions = true }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.movies);
  
  const isFavorite = favorites.some(fav => fav.id === movie.id);
  
  const posterUrl = movie.poster_path 
    ? (movie.isCustom 
        ? movie.poster_path 
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    : 'https://via.placeholder.com/500x750/1a1a2e/16213e?text=No+Image';

  const getRatingColor = (rating) => {
    if (rating >= 7) return '#10b981';
    if (rating >= 5) return '#eab308';
    return '#ef4444';
  };

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <div style={{ position: 'relative' }}>
      <Link to={`/film/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="movie-card">
          <img 
            src={posterUrl} 
            alt={movie.title || movie.name}
            className="movie-poster"
          />
          
          <div className="movie-info">
            <h3 className="movie-title">{movie.title || movie.name}</h3>
            <p className="movie-overview">
              {movie.overview || movie.description}
            </p>
            
            <div className="movie-rating">
              <span>{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
              <span className="rating-value">
                ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              </span>
            </div>
            
            {movie.isCustom && (
              <div style={{ 
                marginTop: '0.5rem',
                backgroundColor: '#8b7355',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '1rem',
                fontSize: '0.75rem',
                fontWeight: '500',
                display: 'inline-block'
              }}>
                Personnalisé
              </div>
            )}
          </div>
        </div>
      </Link>
      
      {/* Favorite Actions */}
      {showFavoriteActions && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10
        }}>
          <button
            onClick={handleToggleFavorite}
            className="btn"
            style={{
              background: isFavorite 
                ? 'linear-gradient(135deg, #eab308, #f59e0b)' 
                : 'linear-gradient(135deg, #8b7355, #a0826d)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease'
            }}
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
