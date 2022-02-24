import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { CardComingSoon } from './CardComingSoon'
import stylesComing from './stylesComing.module.css'
import { getGenres, getMoviesC } from '../../api/apiReq'

import gifLoading from '../../assets/logo-gif.gif'


export const ComingSoon = () => {
  const [moviesC, setMoviesC] = useState([])
  const [genres, setGenres] = useState([])

  const classContainer = classNames(stylesComing.container, 'flex', 'flex-column')

  useEffect(() => {
    Promise.all([getMoviesC(), getGenres()])
    .then(([movies, genres]) => {
      setMoviesC(movies);
      setGenres(genres)
    })
  }, [])
  

  return (
    <div className={ classContainer }>
      {

        moviesC.length !== 0 && genres.length !== 0 ?
        moviesC.map(movie => (
          <CardComingSoon key={movie.id} {...movie} genres={genres}/>
        ))
        :
        <div className="flex justify-content-center">
            <img src={gifLoading} alt="gif de carga" />
        </div>
      }
    </div>
  )
}
