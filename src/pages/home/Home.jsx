import classNames from 'classnames'
import { useEffect, useState } from 'react';
import stylesHome from './stylesHome.module.css'
import styleCarousel from '../../components/ui/carousel/styleCarousel.module.css'
import { CardMovie } from './components/cardMovie/CardMovie';
import { Carousel } from '../../components/ui/carousel/Carousel';
import { getMovieP } from '../../api/apiReq'
import gifLoading from '../../assets/logo-gif.gif'

export const Home = () => {
    const [moviesP, setMoviesP] = useState([])
    const [loading, setLoading] = useState(false)

    const classNamesHome = {
        containerSectionPopular: classNames(stylesHome['containerSectionPopular']),
        title: classNames(stylesHome.title, 'pb-5')
    }

    useEffect(() => {
        setLoading(true)
        getMovieP().then(result => {
            setLoading(false)
            setMoviesP(result)
        })
        
    }, [])

    if(loading){
        return (
            <div className="flex justify-content-center">
                <img src={gifLoading} alt="gif de carga" />
            </div>
        )
    }

    return (

            <div className={ classNamesHome.containerSectionPopular }>
                <p className={ classNamesHome.title }>Lo más popular</p>

                {/* Here to carousel */}

                {
                    moviesP.length > 0 &&
                    <Carousel>    
                    {
                        moviesP.map(({ id, title, release_date, poster_path}, i) => (
                            <div 
                                style={{
                                    flex: '0 0 33%'
                                }}
                                
                                key={id} 
                                className={ styleCarousel.embla__slide }
                            >
                                <CardMovie
                                    id={id} 
                                    title={title}
                                    release_date={release_date}
                                    poster_path={poster_path}
                                    position={i+1}
                                />
                            </div>
                        ))
                    }
                    </Carousel>
                }
                
            </div>
    )
}