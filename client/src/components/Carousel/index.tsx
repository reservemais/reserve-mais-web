"use client";

import Image from "next/image";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface CarouselProps {
  data: {
    image: string;
  }[];
  className?: string;
}

const Carousel = ({ data, className = "" }: CarouselProps) => {
  return (
    <ReactCarousel
      showThumbs={false}
      showStatus={false}
      emulateTouch
      autoPlay
      infiniteLoop
      renderIndicator={(clickHandler, isSelected, index, label) => (
        <button
          type="button"
          onClick={clickHandler}
          title={`${label} ${index + 1}`}
          className={`w-3 h-3 mx-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isSelected ? "bg-secondary" : "bg-gray-300"
          }`}
        />
      )}
      className={className}
    >
      {data.map((item, index) => (
        <div key={index}>
          <Image
            className="object-cover w-full h-auto rounded-lg"
            width="0"
            height="0"
            sizes="100vw"
            src={item.image}
            alt={`Image ${index + 1}`}
          />
        </div>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
