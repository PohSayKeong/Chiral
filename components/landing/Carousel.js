import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// core components
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";

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
                            src="images/carousel1.gif"
                            alt="Uses of Chiral Tokens"
                            className="slick-image"
                        />
                        <img
                            src="images/carousel2.gif"
                            alt="Pay for delivery"
                            className="slick-image"
                        />
                        <img
                            src="images/carousel3.gif"
                            alt="Use as collateral"
                            className="slick-image"
                        />
                    </Carousel>
                </GridItem>
            </GridContainer>
        </div>
    );
}
