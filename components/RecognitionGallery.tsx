"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export default function RecognitionGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  const current = items[index];

  return (
    <>
      <div className="grid max-w-[800px] grid-cols-1 gap-4 min-[681px]:grid-cols-2">
        {items.map((item, i) => (
          <Card key={item.src} asChild className="group gap-0 p-4">
            <button
              type="button"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className="cursor-zoom-in text-left"
              aria-label={`View ${item.caption} full size`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="w-full rounded-(--radius-control) border border-border transition-opacity group-hover:opacity-90"
              />
              <span className="mt-3 block text-sm text-stone">
                {item.caption}
              </span>
            </button>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="w-fit max-w-[calc(100vw-1.5rem)] gap-2.5 p-3 pt-11 sm:max-w-[calc(100vw-1.5rem)]"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
          }}
        >
          <DialogTitle className="sr-only">{current.caption}</DialogTitle>
          <DialogDescription className="sr-only">
            Certificate image {index + 1} of {items.length}. Use the left and
            right arrow keys to navigate.
          </DialogDescription>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.src}
            alt={current.alt}
            className="mx-auto h-[min(82vh,1200px)] w-auto max-w-[calc(100vw-4.5rem)] rounded-(--radius-control) border border-border object-contain"
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={prev}
            aria-label="Previous certificate"
            className="absolute left-2 top-1/2 -translate-y-1/2 shadow-sm"
          >
            <ChevronLeft />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={next}
            aria-label="Next certificate"
            className="absolute right-2 top-1/2 -translate-y-1/2 shadow-sm"
          >
            <ChevronRight />
          </Button>

          <p className="min-w-0 truncate text-center text-sm text-stone">
            {current.caption}
            <span className="ml-2 text-fog">
              {index + 1} / {items.length}
            </span>
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
