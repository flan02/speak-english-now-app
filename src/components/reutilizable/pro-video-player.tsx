"use client";

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProVideoPlayerProps = {
  src: string;
  poster: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
};

export default function ProVideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  muted = false,
  className,
}: ProVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  const handlePlayButtonClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div className={cn("relative w-full aspect-video group", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        preload="metadata"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        className="w-full h-full rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 object-cover"
      />
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-xl cursor-pointer transition-opacity duration-300 group-hover:bg-opacity-30"
          onClick={handlePlayButtonClick}
        >
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transform transition-transform duration-300 group-hover:scale-110">
            <Play className="text-white h-10 w-10 md:h-12 md:w-12" fill="white" />
          </div>
        </div>
      )}
    </div>
  );
}
