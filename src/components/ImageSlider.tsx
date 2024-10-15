'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Asume que estás usando lucide-react para iconos

interface ImageSliderProps {
  images: string[];
  fallbackImage: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (): void => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (): void => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className='h-full relative'>
      <img
        src={images[currentIndex] ?? fallbackImage}
        alt={`Slide ${currentIndex + 1}`}
        className='w-full h-full object-cover rounded-lg'
      />
      <button
        onClick={goToPrevious}
        className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full'
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default ImageSlider;
