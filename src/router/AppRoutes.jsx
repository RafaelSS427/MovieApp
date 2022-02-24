import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home, Categories } from '../pages'
import { Navbar } from '../components'
import { Footer } from '../components/ui/footer/Footer'
import { Layout } from '../components/layout/Layout'
import { ComingSoon } from '../pages/comingSoon/ComingSoon'
import MoviesResult from '../pages/moviesResult/MoviesResult'
import MovieDetails from '../pages/movieDetails/MovieDetails'
// import {} from '../helpers/'

import notFound from '../assets/NotFound.png'

const PageNotFount = () => {
    return(
        <div className="flex justify-content-center">
            <img width="350px" src={notFound} alt="" />
        </div>
    )
}

export const AppRouter = () => {


    return(
        <BrowserRouter>

            <Layout>
                <Navbar />
            </Layout>

            <Layout>
                <div className="main">
                    <Routes>

                        <Route index path="/" element={ <Home /> } />
                        <Route path="/categories/:categorie" element={ <Categories /> } />
                        <Route path="/comingsoon" element={ <ComingSoon /> } />
                        <Route path="/movie/:movie" element={ <MoviesResult /> } />
                        <Route path="/moviedetails/:id" element={ <MovieDetails /> } />


                        <Route path="*" element={ <PageNotFount /> }/>

                    </Routes>
                </div>
            </Layout>

            <Footer />
        </BrowserRouter>
    )

}