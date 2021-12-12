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
                        <video
                            autoPlay
                            loop
                            muted
                            alt="Uses of Chiral Tokens"
                            className="slick-image"
                        >
                            <source
                                src={"images/carousel1.mp4"}
                                type="video/mp4"
                            />
                        </video>
                        <video
                            autoPlay
                            loop
                            muted
                            alt="Pay for delivery"
                            className="slick-image"
                        >
                            <source
                                src={"images/carousel2.mp4"}
                                type="video/mp4"
                            />
                        </video>
                        <video
                            autoPlay
                            loop
                            muted
                            alt="Use as collateral"
                            className="slick-image"
                        >
                            <source
                                src={"images/carousel3.mp4"}
                                type="video/mp4"
                            />
                        </video>
                    </Carousel>
                </GridItem>
            </GridContainer>
        </div>
    );
}