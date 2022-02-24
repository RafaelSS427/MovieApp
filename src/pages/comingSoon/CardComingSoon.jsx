import { Link } from 'react-router-dom'
import classNames from 'classnames'
import stylesComing from './stylesComing.module.css'


export const CardComingSoon = ({
  id, title, overview, release_date, genre_ids, genres
}) => {
  const classContainer = classNames( stylesComing.containerCard )

  const getGenresText = () => genre_ids.map(genre => {
    return genres.find(g => g.id === genre)
  })
  

//Viernes 11 de febrero de 2022
  return (
    <Link to={`/moviedetails/${id}`}>
    <div className={ classContainer }>
      <div className="flex md:justify-content-between lg:justify-content-between lx:justify-content-between sm:flex-wrap">
        <h1>{ title }</h1>

        <div style={{ gap: '10px'}} className="flex align-items-center headerText">
          <i className="fa-solid fa-bell fa-2x"></i>
          <span>Estreno: { release_date }</span>
        </div>

      </div>

      <p> { overview } </p>

      <div className="flex justify-content-end">
        <div style={{gap: '10px'}} className="flex align-items-center">
          <i className="fa-solid fa-circle-info fa-2x"></i>
          {
            getGenresText().map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))
          }
        </div>
      </div>
    </div>
    </Link>
  )
}