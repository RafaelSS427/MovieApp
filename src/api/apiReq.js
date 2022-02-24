import { environment } from "../environments/environment"

export const getGenres = async () => {
    const res = await fetch(environment.urlApiGenres)
    const data =  await res.json()

    return data.genres
}

export const getMoviesC = async () => {
    const res = await fetch(environment.urlApiUpcoming)
    const {results} =  await res.json()

    const data = results.map(({id, title, overview, release_date, genre_ids}) => ({
      id, title, overview, release_date, genre_ids
    }))

    return data
}

export const getMovieP = async () => {
    const resp = await fetch(environment.apiUrlPopular)
    const data = await resp.json()

    const movies = data.results

    return movies
}

export const getMovieCategorie = async (id) => {
    const resp = await fetch(environment.urlApiFilterG(id))
    const data = await resp.json()

    const movies = data.results

    return movies
}

export const getMovieDetails = async (id) => {
    const resp = await fetch(environment.urlApiMovieDetails(id))
    const data = await resp.json()

    return data
}

export const getMovieCredits = async (id) => {
    const resp = await fetch(environment.urlApiMovieCredits(id))
    const data = await resp.json()

    return data.cast
}


export const getMovieVideo = async (id) => {
    const resp = await fetch(environment.urlApiMovieVideo(id))
    const data = await resp.json()

    return data
}