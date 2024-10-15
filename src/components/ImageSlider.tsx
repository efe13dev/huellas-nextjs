'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Asume que estás usando lucide-react para iconos
import { motion, AnimatePresence } from 'framer-motion'; // Importamos motion y AnimatePresence

interface ImageSliderProps {
  images: string[];
  fallbackImage: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, fallbackImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goToPrevious = (): void => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (): void => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className='h-full w-full relative overflow-hidden'>
      <AnimatePresence
        initial={false}
        custom={direction}
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className='h-full w-full flex items-center justify-center bg-gray-50 absolute top-0 left-0'
        >
          <img
            src={images[currentIndex] ?? fallbackImage}
            alt={`Slide ${currentIndex + 1}`}
            className='max-h-full max-w-full object-contain'
          />
        </motion.div>
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10'
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10'
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
