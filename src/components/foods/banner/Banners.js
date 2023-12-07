import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import SingleFood from '../components/SingleFood';



const Banners = ({foodsContainer}) => {
    return (
        <div className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log()}
                >
                    {
                        foodsContainer.map((food) => {
                            return ( 
                                <SwiperSlide key={food.id}>
                                    <SingleFood food={food} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </div>
        
    )
}
export default Banners