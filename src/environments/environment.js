const key = '60fadceab8944ae2b4acbd6a7244c511'

export const environment = {
    apiUrlPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    urlApiImages: 'https://image.tmdb.org/t/p/w500',
    urlApiUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    urlApiGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`,
    urlApiMovie: (nameMovie) => `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${nameMovie}`,
    urlApiFilterG: (id) => `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${id}`,
    urlApiMovieDetails: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`,
    urlApiMovieCredits: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${key}&language=en-US`,
    urlApiMovieVideo: (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${key}&language=en-US`
}