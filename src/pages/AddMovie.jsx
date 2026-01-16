import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../store/movieSlice';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    releaseDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'La description est obligatoire';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newMovie = {
        id: Date.now(),
        title: formData.title,
        overview: formData.description,
        description: formData.description,
        release_date: formData.releaseDate,
        vote_average: 0,
        poster_path: null,
        isCustom: true,
        addedAt: new Date().toISOString()
      };
      
      dispatch(addToFavorites(newMovie));
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        releaseDate: ''
      });
      
      alert('Film ajouté avec succès !');
      navigate('/favoris');
      
    } catch (error) {
      alert('Erreur lors de l\'ajout du film. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (formData.title || formData.description) {
      if (confirm('Êtes-vous sûr de vouloir annuler ? Les données non sauvegardées seront perdues.')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5' }}>
      {/* Header Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Ajouter un Film</h1>
          <p>Ajoutez un film personnalisé à votre collection</p>
        </div>
      </div>

      {/* Form Section */}
      <section style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2d8c1',
          overflow: 'hidden'
        }}>
          <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
            {/* Title Field */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="title" style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.5rem'
              }}>
                Titre <span style={{ color: '#e53e3e' }}>*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Entrez le titre du film"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${errors.title ? '#e53e3e' : '#e2d8c1'}`,
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#faf8f5',
                  transition: 'all 0.3s ease'
                }}
                disabled={isSubmitting}
              />
              {errors.title && (
                <div style={{
                  color: '#e53e3e',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  fontWeight: '500'
                }}>
                  {errors.title}
                </div>
              )}
            </div>

            {/* Description Field */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="description" style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.5rem'
              }}>
                Description <span style={{ color: '#e53e3e' }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Entrez la description du film"
                rows="4"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${errors.description ? '#e53e3e' : '#e2d8c1'}`,
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#faf8f5',
                  transition: 'all 0.3s ease',
                  resize: 'vertical',
                  minHeight: '120px'
                }}
                disabled={isSubmitting}
              />
              {errors.description && (
                <div style={{
                  color: '#e53e3e',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                  fontWeight: '500'
                }}>
                  {errors.description}
                </div>
              )}
            </div>

            {/* Release Date Field */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="releaseDate" style={{
                display: 'block',
                fontSize: '1rem',
                fontWeight: '600',
                color: '#2d3748',
                marginBottom: '0.5rem'
              }}>
                Date de sortie
              </label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #e2d8c1',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: '#faf8f5',
                  transition: 'all 0.3s ease'
                }}
                disabled={isSubmitting}
              />
              <div style={{
                color: '#718096',
                fontSize: '0.875rem',
                marginTop: '0.5rem'
              }}>
                Optionnel - Laissez vide si inconnue
              </div>
            </div>

            {/* Preview Section */}
            {formData.title && (
              <div style={{
                marginBottom: '2rem',
                padding: '1.5rem',
                backgroundColor: '#f7f3e9',
                borderRadius: '0.5rem',
                border: '1px solid #e2d8c1'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#2d3748',
                  marginBottom: '1rem'
                }}>
                  Aperçu
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: '100px',
                    height: '150px',
                    backgroundColor: '#e2d8c1',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8b7355',
                    fontSize: '2rem'
                  }}>
                    📽️
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#2d3748',
                      marginBottom: '0.5rem'
                    }}>
                      {formData.title || 'Titre du film'}
                    </h4>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#4a5568',
                      lineHeight: '1.5',
                      margin: 0
                    }}>
                      {formData.description || 'Description du film...'}
                    </p>
                    {formData.releaseDate && (
                      <div style={{
                        marginTop: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#718096'
                      }}>
                        📅 {new Date(formData.releaseDate).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Ajout en cours...' : 'Ajouter le film'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
                style={{
                  flex: 1,
                  padding: '0.875rem 1.5rem',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}
                disabled={isSubmitting}
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
