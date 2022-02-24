import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'
import styleCarousel from './styleCarousel.module.css'
import { CardMovie } from '../../../pages/home/components/cardMovie/CardMovie'

export const Carousel = ({ children }) => {
  const autoplay = useRef(Autoplay(
    { delay: 3000, stopOnInteraction: false },
    (emblaRoot) => { emblaRoot.parentElement }
  ));

  const [emblaRef, embla] = useEmblaCarousel({
    align: window.innerWidth > 478 ? 'start' : 'center',
    loop: true
  }, [autoplay.current])

  useEffect(() => {
    embla && embla.reInit();
    return () => {
      embla && embla.destroy();
    }
  }, [embla])

  return (
    <div className={ styleCarousel.embla } ref={emblaRef}>
      <div className={ styleCarousel.embla__container }>
        { children }
      </div>
    </div>
  )
}