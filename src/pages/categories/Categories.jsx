import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getGenres, getMovieCategorie } from '../../api/apiReq'
import { CardMovie } from '../home/components/cardMovie/CardMovie'

import gifLoading from '../../assets/logo-gif.gif'

export const Categories  = () => {
  const [movies, setMovies] = useState([])
  const { categorie } = useParams()
  const [loading, setLoading] = useState(false)
  
  const getIdGenre = (data) => {
    const { id } = data.find(g => g.name === categorie)
    return id
  }

  const getMovies = async () => {
    setLoading(true)
    const data = await getGenres()
    const id = getIdGenre(data);
    const resultMovies = await getMovieCategorie(id)
    
    setMovies(resultMovies);
  }


  useEffect(() => {
    getMovies()
    setLoading(false)
  }, [categorie])

  if(loading){
    return (
        <div className="flex justify-content-center">
            <img src={gifLoading} alt="gif de carga" />
        </div>
    )
  }


  return (
    <div style={{
      rowGap: '40px'
      }} className="grid justify-content-around">

          {
              movies.length > 0 &&
              movies.map(({id, title, release_date, poster_path}, i) => (
                  <CardMovie
                      key={id}
                      id={id}
                      title={title}
                      release_date={release_date}
                      poster_path={poster_path}
                      position={i+1}
                  />
              ))
          }

      </div>
  )
}