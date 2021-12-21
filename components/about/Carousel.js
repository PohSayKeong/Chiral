import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// material-ui components
// core components
import GridContainer from "UI/Grid/GridContainer.js";
import GridItem from "UI/Grid/GridItem.js";
import Image from "next/image";

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
                        <Image
                            src="/images/about/about_1.jpg"
                            height={426}
                            width={426}
                        />
                        <Image
                            src="/images/about/about_2.jpg"
                            height={426}
                            width={426}
                        />
                        <Image
                            src="/images/about/about_3.jpg"
                            height={426}
                            width={426}
                        />
                    </Carousel>
                </GridItem>
            </GridContainer>
        </div>
    );
}
