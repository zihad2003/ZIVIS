import React, { useRef, useEffect, useState } from 'react';

const CameraBackground = () => {
  const videoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            facingMode: 'user',
          },
        });
        video.srcObject = stream;
        setHasPermission(true);
        setIsLoading(false);
      } catch (err) {
        console.warn('Camera access denied or unavailable:', err);
        setHasPermission(false);
        setIsLoading(false);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="camera-background">
      {isLoading && (
        <div className="camera-loading">
          <div className="camera-spinner"></div>
        </div>
      )}
      
      {hasPermission === false ? (
        <div className="camera-fallback">
          <div className="fallback-gradient"></div>
          <div className="fallback-pattern"></div>
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="camera-video"
        />
      )}
      
      <div className="camera-overlay"></div>
    </div>
  );
};

export default CameraBackground;