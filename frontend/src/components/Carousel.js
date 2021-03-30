import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function CarouselComponent() {
    return (
        <div className="carousel-wrapper">
            <Carousel infiniteLoop autoPlay stopOnHover>
                <div>
                    <img src="../images/carousel_photo1.jpg" alt="Lelut"/>
                </div>
                <div>
                    <img src="../images/carousel_photo2.jpg" alt="Cloths"/>
                </div>
                <div>
                    <img src="../images/carousel_photo3.jpg"alt="Promotion"/>
                </div>
            </Carousel>
        </div>
    );
}