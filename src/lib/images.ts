import romeImg from "@/assets/dest-rome.jpg";
import egyptImg from "@/assets/dest-egypt.jpg";
import turkiyeImg from "@/assets/dest-turkiye.jpg";

export const destinationImages: Record<string, string> = {
  rome: romeImg,
  egypt: egyptImg,
  turkiye: turkiyeImg,
};

export const bookCovers: Record<string, string> = {
  "istanbul-for-first-timers": "/books/istanbul-for-first-timers.jpg",
  "essential-travel-guide-to-turkiye": "/books/the-essential-travel-guide-to-turkiye.jpg",
  "egypt-for-first-timers": "/books/egypt-for-first-timers.jpg",
  "paris-for-first-timers": "/books/paris-for-first-timers.jpg",
  "food-lovers-travel-guide-to-rome": "/books/a-food-lover-s-travel-guide-to-rome.jpg",
  "barcelona-tourist-traps-to-avoid": "/books/barcelona-tourist-traps-to-avoid.jpg",
  "amsterdam-for-first-timers": "/books/amsterdam-for-first-timers.jpg",
  "the-little-book-of-italian-wisdom": "/books/the-little-book-of-italian-wisdom-proverbs-funny-sayings-life-lessons-from-italy.jpg",
  "the-little-book-of-turkish-wisdom": "/books/the-little-book-of-turkish-wisdom-proverbs-funny-idioms-folk-tales-life-lessons-from-turkiye.jpg",
};

export const getDestinationImage = (slug: string) =>
  destinationImages[slug] ?? turkiyeImg;

export const getBookCover = (slug: string) =>
  bookCovers[slug] ?? "/books/istanbul-for-first-timers.jpg";
