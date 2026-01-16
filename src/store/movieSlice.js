import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '7ef6355c095db9973bb00b7c02f0073b'; // Remplacez par votre clé API TMDb
const BASE_URL = 'https://api.themoviedb.org/3';

// Charger les favoris depuis localStorage au démarrage
const loadFavoritesFromStorage = () => {
  try {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error);
    return [];
  }
};

// Sauvegarder les favoris dans localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des favoris:', error);
  }
};

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopular',
  async () => {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR`);
    return response.data.results;
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (query) => {
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${query}`);
    return response.data.results;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchDetails',
  async (movieId) => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    popularMovies: [],
    searchResults: [],
    currentMovie: null,
    favorites: loadFavoritesFromStorage(), // Charger les favoris au démarrage
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.favorites.some(movie => movie.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        saveFavoritesToStorage(state.favorites); // Sauvegarder après ajout
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.id !== action.payload);
      saveFavoritesToStorage(state.favorites); // Sauvegarder après suppression
    },
    toggleFavorite: (state, action) => {
      const exists = state.favorites.some(movie => movie.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(movie => movie.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
      saveFavoritesToStorage(state.favorites); // Sauvegarder après toggle
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearSearchResults, clearCurrentMovie } = movieSlice.actions;
export default movieSlice.reducer;
