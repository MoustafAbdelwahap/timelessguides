import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { books } from "@/data/books";
import Book3D from "./books/Book3D";
import BookInfo from "./books/BookInfo";

export default function DestinationsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // Auto-scroll pause state
  const [isPaused, setIsPaused] = useState(false);

  // Track scroll position for control disabling/styling
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollBounds = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
  };

  useEffect(() => {
    checkScrollBounds();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollBounds, { passive: true });
      window.addEventListener("resize", checkScrollBounds);
      return () => {
        carousel.removeEventListener("scroll", checkScrollBounds);
        window.removeEventListener("resize", checkScrollBounds);
      };
    }
  }, []);

  // Scroll carousel left/right by one book column (~270px)
  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 280;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handleScroll("left");
    } else if (e.key === "ArrowRight") {
      handleScroll("right");
    }
  };

  // Gentle automatic scroll when idle
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || isPaused || isDown) return;

    const timer = setInterval(() => {
      if (!carouselRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

      if (scrollLeft + clientWidth >= scrollWidth - 25) {
        carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carouselRef.current.scrollBy({ left: 275, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, isDown]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDown(true);
    setIsPaused(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeftState(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsPaused(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section
      id="destinations"
      className="relative bg-[#FAF7F0] text-[#211C18] pt-6 sm:pt-8 md:pt-10 pb-28 sm:pb-36 overflow-hidden"
      aria-label="Stories worth carrying"
    >
      <span id="books" className="absolute -top-24" />

      {/* Main Content Wrap */}
      <div className="relative max-w-[1450px] w-full mx-auto px-6 sm:px-10 lg:px-12">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <div className="mb-6 sm:mb-8 max-w-2xl">
          {/* Main Heading */}
          <h2 className="font-['Cormorant_Garamond',serif] font-medium text-[38px] sm:text-[46px] lg:text-[50px] text-[#211C18] leading-[1.08] tracking-[-0.015em]">
            Stories worth{" "}
            <em className="text-[#84521E] font-normal italic">carrying.</em>
          </h2>

          {/* Short Description */}
          <p className="font-['Inter',sans-serif] text-[15px] sm:text-[16px] text-[#766753] leading-[1.5] mt-2 max-w-xl">
            Pocket-sized guides, shaped by locals and made for deeper travel.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 3. LUXURY 3D BOOK CAROUSEL STAGE                          */}
        {/* ========================================================= */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsDown(false);
            setIsPaused(false);
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Floating Side Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="absolute -left-3 sm:-left-5 top-44 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#FAF7F0] border border-[#766753]/35 hover:border-[#211C18] shadow-[0_4px_16px_rgba(33,28,24,0.12)] flex items-center justify-center text-[#211C18] transition-all hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Previous guidebook"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Horizontally Scrolling Books Track */}
          <div
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            className="flex items-start gap-8 sm:gap-10 overflow-x-auto scrollbar-none scroll-smooth pb-8 pt-2 px-2 cursor-grab active:cursor-grabbing focus:outline-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {books.map((book) => (
              <div
                key={book.slug}
                className="flex flex-col items-center shrink-0 w-[240px] sm:w-[250px] lg:w-[260px]"
              >
                {/* 3D Physical Paperback Book */}
                <Book3D
                  title={book.title}
                  coverImage={book.coverImage}
                  mockup3d={book.mockup3d}
                  spineColor={book.spineColor}
                  amazonUrl={book.amazonUrl}
                />

                {/* Information Area (Category Capsule, Title, Subtitle, Buy & Local CTAs) */}
                <BookInfo book={book} />
              </div>
            ))}
          </div>

          {/* Floating Side Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="absolute -right-3 sm:-right-5 top-44 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#FAF7F0] border border-[#766753]/35 hover:border-[#211C18] shadow-[0_4px_16px_rgba(33,28,24,0.12)] flex items-center justify-center text-[#211C18] transition-all hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            aria-label="Next guidebook"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 4. TRUST INDICATOR TAGS (Below Books)                     */}
        {/* ========================================================= */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-8 sm:mt-12 mb-4">
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#C9A15B]/40 bg-[#FFFFFF] text-[#211C18] font-['Cormorant_Garamond',serif] text-[16px] sm:text-[17.5px] tracking-[0.02em] shadow-[0_4px_14px_rgba(33,28,24,0.06)] hover:border-[#C9A15B] transition-all">
            <span className="text-[#C9A15B] text-[13px]">✦</span>
            <span className="font-semibold">Locally researched</span>
          </div>
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#C9A15B]/40 bg-[#FFFFFF] text-[#211C18] font-['Cormorant_Garamond',serif] text-[16px] sm:text-[17.5px] tracking-[0.02em] shadow-[0_4px_14px_rgba(33,28,24,0.06)] hover:border-[#C9A15B] transition-all">
            <span className="text-[#C9A15B] text-[13px]">✦</span>
            <span className="font-semibold">Fact-checked</span>
          </div>
          <div className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full border border-[#C9A15B]/40 bg-[#FFFFFF] text-[#211C18] font-['Cormorant_Garamond',serif] text-[16px] sm:text-[17.5px] tracking-[0.02em] shadow-[0_4px_14px_rgba(33,28,24,0.06)] hover:border-[#C9A15B] transition-all">
            <span className="text-[#C9A15B] text-[13px]">✦</span>
            <span className="font-semibold">Available on Amazon</span>
          </div>
        </div>
      </div>
    </section>
  );
}
