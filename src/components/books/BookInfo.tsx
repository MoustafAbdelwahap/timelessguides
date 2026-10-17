import React from "react";
import { Book } from "@/data/books";

interface BookInfoProps {
  book: Book;
}

export default function BookInfo({ book }: BookInfoProps) {
  return (
    <div className="flex flex-col items-center text-center w-full px-2 mt-2">
      {/* 1. Elegant Serif Title */}
      <h3 className="font-['Cormorant_Garamond',serif] font-semibold text-[20px] text-[#211C18] leading-[1.2] text-center min-h-[48px] flex items-center justify-center max-w-[220px]">
        {book.title}
      </h3>

      {/* 2. Primary CTA: Clean Dark Espresso Pill */}
      <div className="mt-3.5 w-full flex justify-center">
        <a
          href={book.amazonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-[#211C18] hover:bg-[#3A322B] text-[#FFFFFF] font-semibold text-[13.5px] px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95"
          aria-label={`Buy ${book.title} on Amazon`}
        >
          Buy on Amazon
        </a>
      </div>
    </div>
  );
}
