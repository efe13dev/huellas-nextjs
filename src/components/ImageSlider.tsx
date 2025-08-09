"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";

interface CustomDivProps extends HTMLMotionProps<"div"> {
  className?: string;
}

interface ImageSliderProps {
  images: string[];
  fallbackImage: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  fallbackImage,
  autoPlay = false,
  autoPlayInterval = 4000,
  showIndicators = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setDirection(-1);
    setCurrentIndex(newIndex);
    setImageLoaded(false);
    setImageError(false);
  }, [currentIndex, images.length]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    setDirection(1);
    setCurrentIndex(newIndex);
    setImageLoaded(false);
    setImageError(false);
  }, [currentIndex, images.length]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
      setImageLoaded(false);
      setImageError(false);
    },
    [currentIndex],
  );

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1 || isHovered) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return function cleanup() {
      clearInterval(interval);
    };
  }, [autoPlay, images.length, isHovered, goToNext, autoPlayInterval]);

  // Preload first image on mount
  useEffect(() => {
    if (images.length > 0) {
      const img = new Image();

      img.onload = () => {
        setImageLoaded(true);
        setImageError(false);
      };
      img.onerror = () => {
        setImageError(true);
        setImageLoaded(true);
      };
      img.src = images[0] ?? fallbackImage;
    }
  }, [images, fallbackImage]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent): void {
      if (event.key === "ArrowLeft") {
        goToPrevious();
      } else if (event.key === "ArrowRight") {
        goToNext();
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return function cleanup() {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [goToPrevious, goToNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 15 : -15,
    }),
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const indicatorVariants = {
    inactive: {
      scale: 1,
      opacity: 0.5,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    active: {
      scale: 1.2,
      opacity: 1,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
  };

  const MotionDiv = motion.div as React.FC<CustomDivProps>;

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Loading overlay */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-gray-100"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-gray-600"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image container */}
      <div className="perspective-1000 relative h-full w-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <MotionDiv
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
              rotateY: { duration: 0.4, ease: "easeOut" },
            }}
            className="absolute left-0 top-0 flex h-full w-full items-center justify-center"
          >
            {imageError ? (
              <motion.div
                className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.img
                  src={fallbackImage}
                  alt={`Imagen de respaldo ${currentIndex + 1}`}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>
            ) : (
              <motion.img
                src={images[currentIndex] ?? fallbackImage}
                alt={`Slide ${currentIndex + 1}`}
                className="max-h-full max-w-full rounded-lg object-contain shadow-lg"
                onLoad={() => {
                  setImageLoaded(true);
                  setImageError(false);
                }}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true); // Consideramos que "cargó" aunque con error
                }}
                initial={{ filter: "blur(4px)", opacity: 0 }}
                animate={{
                  filter: imageLoaded ? "blur(0px)" : "blur(4px)",
                  opacity: imageLoaded ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                loading="eager"
                decoding="async"
              />
            )}
          </MotionDiv>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {images.length > 1 && (
        <>
          {/* Botones siempre visibles en móvil, con hover en desktop */}
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              goToPrevious();
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full border border-white/20 bg-black/50 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 sm:left-4 sm:bg-black/40 sm:p-3 sm:opacity-100 md:opacity-0 md:hover:opacity-100"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={16} className="sm:h-5 sm:w-5" />
          </motion.button>
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => {
              goToNext();
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 transform rounded-full border border-white/20 bg-black/50 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 sm:right-4 sm:bg-black/40 sm:p-3 sm:opacity-100 md:opacity-0 md:hover:opacity-100"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={16} className="sm:h-5 sm:w-5" />
          </motion.button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && showIndicators && (
        <motion.div
          className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2 sm:bottom-4 sm:space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {images.map((_, index) => (
            <motion.button
              key={index}
              variants={indicatorVariants}
              animate={index === currentIndex ? "active" : "inactive"}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                goToSlide(index);
              }}
              className="h-3 w-3 rounded-full border border-white/40 shadow-lg backdrop-blur-sm transition-all duration-300 sm:h-2 sm:w-2"
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </motion.div>
      )}

      {/* Progress bar */}
      {autoPlay && images.length > 1 && (
        <motion.div
          className="absolute bottom-0 left-0 z-10 h-1 bg-white/30"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: autoPlayInterval / 1000,
            ease: "linear",
            repeat: Infinity,
          }}
        />
      )}

      {/* Image counter */}
      {images.length > 1 && (
        <motion.div
          className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-sm text-white backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0.7, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentIndex + 1} / {images.length}
        </motion.div>
      )}
    </div>
  );
};

export default ImageSlider;
