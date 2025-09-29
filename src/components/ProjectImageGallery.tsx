"use client";
import { Project } from "@/types/types";
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ProjectImageGalleryProps {
  project: Project
}

// Image gallery component with lightbox
export default function ProjectImageGallery({ project }: ProjectImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const heroImage = project.images.find(img => img.isHero) || project.images[0];
  const galleryImages = project.images.filter(img => img !== heroImage);
  const allImages = [heroImage, ...galleryImages];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [allImages.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  }, [allImages.length]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeLightbox, goToNext, goToPrevious, lightboxOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (project.images.length === 0) return null;

  return (
    <>
      <div className="mb-12">
        {/* Hero image */}
        <div className="mb-6">
          <div
            className="cursor-pointer group relative overflow-hidden rounded-lg"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={heroImage.url}
              alt={heroImage.alt}
              width={800}
              height={450}
              className="w-full h-64 md:h-96 object-cover rounded-lg transition-transform group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
          </div>
          {heroImage.caption && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
              {heroImage.caption}
            </p>
          )}
        </div>

        {/* Additional images */}
        {galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-video">
                <div
                  className="cursor-pointer group relative overflow-hidden rounded-lg h-full"
                  onClick={() => openLightbox(index + 1)}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover rounded-lg transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                </div>
                {image.caption && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {image.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={allImages[currentIndex].url}
              alt={allImages[currentIndex].alt}
              width={1200}
              height={800}
              className="max-w-[90vh] max-h-[90vh] object-contain rounded-lg"
              priority
            />
          </div>

          {/* Image caption */}
          {allImages[currentIndex].caption && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[80%] text-center">
              <p className="text-white bg-black/50 px-4 py-2 rounded-lg text-sm">
                {allImages[currentIndex].caption}
              </p>
            </div>
          )}

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <p className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {allImages.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}