import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { environment } from '../../environments/environment'
import { CardMovie } from '../home/components/cardMovie/CardMovie'

import gifLoading from '../../assets/logo-gif.gif'

export default function MoviesResult() {
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const { movie } = useParams()

    const getMovie = async () => {
        const res = await fetch(environment.urlApiMovie(movie))
        const {results} =  await res.json()

        return results
    }

    useEffect(() => {
        setLoading(true);
      getMovie().then(data => {
          setResult(data)
          setLoading(false)
      })
    }, [movie])

    
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
                result.length  !== 0  &&
                result.map(({id, title, release_date, poster_path}, i) => (
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
