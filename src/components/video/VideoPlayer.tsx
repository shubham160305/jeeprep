'use client';

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      className="w-full aspect-video rounded"
      allowFullScreen
    />
  );
}
