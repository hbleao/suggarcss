import React from "react";
import { Carousel } from "../../../src/components";

export default {
  title: "Components/Carousel",
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
};

const CardItem = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <div style={{ 
    backgroundColor: color, 
    height: "200px", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "16px"
  }}>
    {children}
  </div>
);

export const DefaultCarousel = () => (
  <Carousel>
    {[
      <CardItem key="1" color="#3f51b5">Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Slide 5</CardItem>
    ]}
  </Carousel>
);

export const WithDots = () => (
  <Carousel dots={true}>
    {[
      <CardItem key="1" color="#3f51b5">Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Slide 5</CardItem>
    ]}
  </Carousel>
);

export const WithArrows = () => (
  <Carousel arrows={true}>
    {[
      <CardItem key="1" color="#3f51b5">Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Slide 5</CardItem>
    ]}
  </Carousel>
);

export const WithDotsAndArrows = () => (
  <Carousel dots={true} arrows={true}>
    {[
      <CardItem key="1" color="#3f51b5">Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Slide 5</CardItem>
    ]}
  </Carousel>
);

export const AutoPlay = () => (
  <Carousel autoPlay={true} autoPlayInterval={2000}>
    {[
      <CardItem key="1" color="#3f51b5">Auto Play Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Auto Play Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Auto Play Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Auto Play Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Auto Play Slide 5</CardItem>
    ]}
  </Carousel>
);

export const MultipleSlides = () => (
  <Carousel slidesToShow={3} slidesToScroll={1} dots={true} arrows={true}>
    {[
      <CardItem key="1" color="#3f51b5">Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Slide 5</CardItem>,
      <CardItem key="6" color="#2196f3">Slide 6</CardItem>,
      <CardItem key="7" color="#ff5722">Slide 7</CardItem>,
      <CardItem key="8" color="#607d8b">Slide 8</CardItem>
    ]}
  </Carousel>
);

export const CustomGap = () => (
  <Carousel slidesToShow={2} gap={32} dots={true} arrows={true}>
    {[
      <CardItem key="1" color="#3f51b5">Slide 1</CardItem>,
      <CardItem key="2" color="#f44336">Slide 2</CardItem>,
      <CardItem key="3" color="#4caf50">Slide 3</CardItem>,
      <CardItem key="4" color="#ff9800">Slide 4</CardItem>,
      <CardItem key="5" color="#9c27b0">Slide 5</CardItem>
    ]}
  </Carousel>
);
