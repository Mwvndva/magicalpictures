import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VideoItem } from '../types';
import { Skeleton } from './ui/skeleton';

interface VideoPlayerProps {
  video: VideoItem;
  onPlay?: () => void;
  onPause?: () => void;
  onError?: (error: Error) => void;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onPlay,
  onPause,
  onError,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isError, setIsError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleVideoError = () => {
      setIsError(true);
      onError?.(new Error(`Failed to load video: ${video.title}`));
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('error', handleVideoError);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('error', handleVideoError);
      }
    };
  }, [video, onError]);

  const handlePlayPause = () => {
    const videoElement = videoRef.current;
    if (videoElement) {
      if (videoElement.paused) {
        videoElement.play().catch(error => {
          setIsError(true);
          onError?.(error);
        });
        setIsPlaying(true);
        onPlay?.();
      } else {
        videoElement.pause();
        setIsPlaying(false);
        onPause?.();
      }
    }
  };

  if (isError) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-red-500/10 flex items-center justify-center">
          <div className="text-center text-red-500">
            <h3 className="text-lg font-semibold mb-2">Video Error</h3>
            <p className="text-sm">Failed to load the video. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={isMuted}
        controls
        playsInline
        preload="metadata"
        aria-label={`${video.title} video player`}
        role="application"
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
        onClick={handlePlayPause}
        initial={{ opacity: 1 }}
        animate={{ opacity: isPlaying ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-white text-4xl"
          initial={{ scale: 1 }}
          animate={{ scale: isPlaying ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.div>
      </motion.div>

      <Skeleton
        variant="rounded"
        width="100%"
        height="200px"
        className="absolute inset-0"
        aria-hidden="true"
      />
    </div>
  );
};
