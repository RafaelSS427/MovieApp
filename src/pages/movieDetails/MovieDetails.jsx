import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieCredits, getMovieDetails, getMovieVideo } from '../../api/apiReq'
import classNames from 'classnames'
import styles from './stylesMovieDetails.module.css'
import { environment } from '../../environments/environment'
import { getTime } from '../../helpers/getTime'
import { AppModal } from './Modal'
import { Carousel } from '../../components/ui/carousel/Carousel'
import styleCarousel from '../../components/ui/carousel/styleCarousel.module.css'


import gifLoading from '../../assets/logo-gif.gif'


export default function MovieDetails() {
    const [movieInfo, setMovieInfo] = useState(null)
    const [credits, setCredits] = useState([])
    const [movieVideo, setMovieVideo] = useState("")
    const [genre, setGenre] = useState("")
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const { id } = useParams()

    const [proof, setProof] = useState(true)

    const windowPhone = window.innerWidth;

    const handleOpenWindow = () => {
        setIsOpen(true)
    }

    useEffect(() => {
        setLoading(true)
        Promise.all([getMovieDetails(id), getMovieCredits(id), getMovieVideo(id)])
            .then(([dataMovie, dataCredits, dataVideo]) => {
                setMovieInfo(dataMovie)
                setCredits([
                    ... dataCredits.filter(c => c.profile_path !== null)
                ])
                setGenre(dataMovie.genres[0].name)
                setMovieVideo(dataVideo.results[0].key)
                setLoading(false)
            }).catch(error => {
                console.log('Eror en la peticion');
            })
    }, [id])

    if(loading){
        return(
            <div className="flex justify-content-center">
                    <img src={gifLoading} alt="gif de carga" />
            </div>
        )
    }
    
    return (
        <>
        {
            movieInfo !== null && credits.length > 0 &&
            <>
            <div style={{ gap: '20px' }} className={classNames(styles.containerInfoMovie, 'grid', 'grid-nogutter')}>
           <div className="col-fixed" style={{width:  windowPhone <= 400 ? '300px' : '437px' }}>
                <img 
                    src={environment.urlApiImages + movieInfo.poster_path} 
                    alt="Imagen de pelicula"
                    width="100%"
                    height="auto"
                />
           </div>

           <div className="col">
                <h1>{ movieInfo.title }</h1>
                <small>{movieInfo.release_date} ({movieInfo.original_language}) | {genre} | {getTime(movieInfo.runtime)}</small>

                <h4>Sinopsis</h4>
                <p>{ movieInfo.overview }</p>

                <p> <i className="fa-solid fa-film"></i> Production Company </p>

                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                    borderRadius: '15px',
                    padding: '5px',
                    display: 'inline-block'
                }}>
                    {
                        movieInfo.production_companies.length > 0 ? (
                            <img width="150px" src={environment.urlApiImages + movieInfo.production_companies[0].logo_path} alt="logo company" />

                        ):(
                            <small>No se tiene la información del logo</small>
                        )
                    }
                    {/* <small style={{fontSize: '18px'}}> { movieInfo.production_companies[0].name } </small> */}
                </div>

                <div 
                    style={{ gap: '5px' }} 
                    className="flex align-items-center cursor-pointer"
                    onClick={handleOpenWindow}
                >
                <i style={{
                    color: '#FB1010',
                    fontSize: '30px'
                }} className="fa-brands fa-youtube my-4"></i>
                <small>Trailer</small>
                </div>

                {/* <button onClick={handleOpenWindow}>Click</button> */}
           </div>
        </div>

        <div className={ classNames(styles.containerInfoCredits, 'grid', 'my-6') }>
            <div className="col-12">
                <h1>Reparto principal</h1>
            </div>

            <div style={{ backgroundColor: '#C4C4C4', borderRadius: '15px' }} className="col-12">
                <Carousel>
                    { credits.map(({id, profile_path, name, character}) => (
                        <div 
                        style={{
                            flex: '0 0 10%'
                        }}
                        
                        key={id} 
                        className={ styleCarousel.embla__slide }
                    >
                        <div style={{
                            width: '286px',
                            height: '100%',
                            textAlign: 'center'
                        }} className="flex flex-column align-items-center justify-content-center">
                            <img style={{
                                borderRadius: '50%',
                                objectFit: 'cover',
                                objectPosition: '0px 0px'
                            }} width="286px" height="350px" src={environment.urlApiImages + profile_path} alt="imagen de actor" />
                            <p style={{ fontSize: '35px', fontWeight: '700', color: '#00184B' }} className="my-2">{name}</p>
                            <p style={{ fontSize: '30px', fontWeight: '500', color: '#000000' }}>{character}</p>
                        </div>
                    </div>
                    )) }
                </Carousel>
            </div>
        </div>


        <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="flex justify-contend-center">
                {
                    proof &&
                    <img style={{
                        position: 'absolute',
                        left: '50%',
                        top:  '50%',
                        transform: 'translate(-50%, -50%)'
                    }} src={gifLoading} alt="gif de carga" />
                }
                <iframe onLoad={() => {
                    //Una vez cargue el componente
                    setProof(false)
                }} width={ windowPhone <= 400 ? '325px' : '560px'} height="315" src={`https://www.youtube.com/embed/${movieVideo}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
        </AppModal>
        </>
        }
        
        </>
    )
}
