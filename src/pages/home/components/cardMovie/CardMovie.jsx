import { Link } from 'react-router-dom'
import classNames from 'classnames'
import cardMovie from './cardMovie.module.css'
import { environment } from '../../../../environments/environment'

export const CardMovie = ({ id, title, release_date, poster_path, position }) => {

    const classNamesCard = {
        fontWeight: classNames(cardMovie.fontWeight),
        numberCardContainer: classNames(cardMovie.numberCardContainer, 'flex', 'justify-content-center', 'align-items-center')
    }
//${environment.urlApiImages}$
    return (
        <Link to={`/moviedetails/${id}`}>
        <div className={cardMovie.cardContainer}>
            <img 
                src={`${environment.urlApiImages + poster_path}`} 
                alt="imagen de pelicula"
                height={492}
                className="mb-1"
                style={{
                    borderRadius: '5px'
                }}
            />

            <div className={ classNamesCard.numberCardContainer}>
                <small>{ position }</small>
            </div>

            <h2 className={ classNamesCard.fontWeight }> { title } </h2>
            <h3 className={ classNamesCard.fontWeight }>{ release_date }</h3>
        </div>
        </Link>
    )
}