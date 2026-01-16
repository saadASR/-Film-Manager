import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails, clearCurrentMovie, toggleFavorite } from '../store/movieSlice';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentMovie, loading, error, favorites } = useSelector((state) => state.movies);
  const [movie, setMovie] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // First check if it's a custom movie in favorites
    const customMovie = favorites && favorites.find ? favorites.find(m => m.id === parseInt(id)) : null;
    
    if (customMovie) {
      setMovie(customMovie);
    } else {
      // Fetch from API
      dispatch(fetchMovieDetails(id));
    }

    return () => {
      dispatch(clearCurrentMovie());
    };
  }, [id, dispatch, favorites]);

  useEffect(() => {
    if (currentMovie && !movie) {
      setMovie(currentMovie);
    }
  }, [currentMovie, movie]);

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

  if (!movie) {
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
            color: '#8b7355' 
          }}>📽️</div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#2d3748', 
            marginBottom: '0.5rem' 
          }}>
            Film non trouvé
          </h2>
          <p style={{ color: '#718096' }}>
            Le film que vous cherchez n'est pas disponible.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '2rem' }}
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? (movie.isCustom 
        ? movie.poster_path 
        : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    : 'https://via.placeholder.com/500x750/1a1a2e/16213e?text=No+Image';

  const backdropUrl = movie.backdrop_path
    ? (movie.isCustom 
        ? movie.backdrop_path 
        : `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`)
    : null;

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#10b981';
    if (rating >= 7) return '#eab308';
    if (rating >= 5) return '#f59e0b';
    return '#ef4444';
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const isFavorite = favorites && favorites.some(fav => fav.id === movie.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5' }}>
      {/* Hero Section with Backdrop */}
      {backdropUrl && (
        <div 
          style={{
            position: 'relative',
            height: '60vh',
            background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backdropUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8))',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '3rem 2rem'
          }}>
            <div style={{ 
              maxWidth: '1200px', 
              margin: '0 auto',
              width: '100%'
            }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateX(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                ← Retour
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Movie Details Section */}
      <section style={{
        background: 'white',
        borderRadius: backdropUrl ? '2rem 2rem 0 0' : '0',
        marginTop: backdropUrl ? '-4rem' : '0',
        paddingTop: backdropUrl ? '4rem' : '3rem',
        position: 'relative',
        boxShadow: backdropUrl ? '0 -8px 32px rgba(0, 0, 0, 0.1)' : 'none'
      }}>
        <div className="container" style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start' }}>
          {/* Poster */}
          <div style={{ flex: '0 0 400px', position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '1rem',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
              background: imageLoaded ? 'transparent' : 'linear-gradient(135deg, #f7f3e9, #e8dcc6)'
            }}>
              <img 
                src={posterUrl} 
                alt={movie.title || movie.name}
                onLoad={() => setImageLoaded(true)}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'opacity 0.3s ease',
                  opacity: imageLoaded ? 1 : 0
                }}
              />
              {!imageLoaded && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, #f7f3e9, #e8dcc6)'
                }}>
                  <div style={{ 
                    fontSize: '3rem', 
                    color: '#8b7355' 
                  }}>📽️</div>
                </div>
              )}
            </div>

            {/* Rating Badge */}
            {movie.vote_average && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: getRatingColor(movie.vote_average),
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '2rem',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>⭐</span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}

            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                background: isFavorite 
                  ? 'linear-gradient(135deg, #eab308, #f59e0b)' 
                  : 'linear-gradient(135deg, #8b7355, #a0826d)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '2rem',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <span style={{ fontSize: '1.2rem' }}>{isFavorite ? '❤️' : '🤍'}</span>
              <span>{isFavorite ? 'Dans vos favoris' : 'Ajouter aux favoris'}</span>
            </button>
          </div>

          {/* Movie Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Title and Basic Info */}
            <div style={{ marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#1a202c',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {movie.title || movie.name}
              </h1>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '1.5rem',
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                {movie.release_date && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f7f3e9, #e8dcc6)',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    color: '#8b7355',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}>
                    📅 {new Date(movie.release_date).getFullYear()}
                  </div>
                )}
                
                {movie.runtime && (
                  <div style={{
                    background: 'linear-gradient(135deg, #e8dcc6, #d4c4a8)',
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    color: '#8b7355',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}>
                    ⏱️ {formatRuntime(movie.runtime)}
                  </div>
                )}
                
                {movie.vote_average && (
                  <div style={{
                    background: `linear-gradient(135deg, ${getRatingColor(movie.vote_average)}, ${getRatingColor(movie.vote_average)})`,
                    padding: '0.5rem 1rem',
                    borderRadius: '1rem',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                  }}>
                    ⭐ {movie.vote_average.toFixed(1)}/10
                  </div>
                )}
              </div>
            </div>

            {/* Genres */}
            {movie.genres && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#2d3748',
                  marginBottom: '1rem'
                }}>
                  Genres
                </h2>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.75rem' 
                }}>
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      style={{
                        background: 'linear-gradient(135deg, #8b7355, #a0826d)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '2rem',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                        border: '1px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #a0826d, #8b7355)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #8b7355, #a0826d)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.borderColor = 'transparent';
                      }}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Overview */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#2d3748',
                marginBottom: '1rem'
              }}>
                Synopsis
              </h2>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.7',
                color: '#4a5568',
                textAlign: 'justify'
              }}>
                {movie.overview || movie.description || 'Aucune description disponible.'}
              </p>
            </div>

            {/* Custom Movie Badge */}
            {movie.isCustom && (
              <div className="success-message" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}></span>
                <div>
                  <strong>Note:</strong> Ce film a été ajouté manuellement à votre collection.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
