import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules'
import './swiper-component.css'
import { FC, useEffect, useState } from 'react';
import { TimelineItem } from '../../types';

type Props = {
  period: number
  data: TimelineItem[]
}

const SwiperComponent: FC<Props> = ({ period, data }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selectedPeriodContent = data.find(el => el.id === period)



  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={isMobile ? 1.5 : 3}
        navigation={isMobile ? false : true}
        pagination={isMobile ? true : false}
        onSlideChange={() => { }}
        onSwiper={(swiper: SwiperType) => { }}
        className="swiper-container"
      >
        {selectedPeriodContent?.content.map(el => {
          return (
            <SwiperSlide key={el.year}>
              <div className="swiper-slide-content">
                <p className="swiper-slide-year">{el.year}</p>
                <p className="swiper-slide-description">{el.description}</p>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default SwiperComponent;