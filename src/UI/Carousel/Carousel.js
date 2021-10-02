import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// core components
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";

import image1 from "assets/images/carousel1.gif";
import image2 from "assets/images/carousel2.gif";
import image3 from "assets/images/carousel3.gif";

import "assets/jss/carousel.scss";

export default function SectionCarousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <div className="section">
            <GridContainer justifyContent="center">
                <GridItem xs={12} sm={12} md={8}>
                    <Carousel {...settings}>
                        <img
                            src={image1}
                            alt="First slide"
                            className="slick-image"
                        />
                        <img
                            src={image2}
                            alt="Second slide"
                            className="slick-image"
                        />
                        <img
                            src={image3}
                            alt="Third slide"
                            className="slick-image"
                        />
                    </Carousel>
                </GridItem>
            </GridContainer>
        </div>
    );
}
