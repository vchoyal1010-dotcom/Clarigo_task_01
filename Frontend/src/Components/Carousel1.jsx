import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide from "../assets/slide.jpg"
import slide2 from "../assets/slide2.jpg"
import slide3 from "../assets/slide3.jpg"
import slide4 from "../assets/slide4.png"
import slide5 from "../assets/slide5.jpg"
import "./Dashboard.css"
function Carousel1() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={1800} className='clay'>
      
      <Carousel.Item>
        <img
         className="dash-slide-image"
          src={slide}
          alt="First slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
           className="dash-slide-image"
          src={slide2}
          alt="Second slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
         className="dash-slide-image"
          src={slide3}
          alt="Third slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>

       <Carousel.Item>
        <img
       className="dash-slide-image"
          src={slide4}
          alt="fourth slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
          
           <Carousel.Item>
        <img
           className="dash-slide-image"
          src={slide5}
          alt="fifth slide"
        />
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousel1;