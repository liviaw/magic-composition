import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Carousel } from "react-bootstrap";
import styles from "./VideoModal.module.css";

export const VideoCarousel: React.FC = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex: number, e: any) => {
      setIndex(selectedIndex);
    };
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
        <div className={styles.renderMediaContainer}> </div>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className={styles.renderMediaContainer}> </div>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
        <div className={styles.renderMediaContainer}> </div>
  
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
}