"use client";

import { useEffect, useRef, useState } from "react";
import Countdown from "./Countdown";
import Preview from "./Preview";

const Camera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(false);
  const [totalPhotos, setTotalPhotos] = useState(0)
  
  useEffect(() => {
    async function initCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
    initCamera();
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [photo]);
  function takePhoto() {
    const video = videoRef.current;
    console.log("🚀 ~ takePhoto ~ video:", video);
    const canvas = canvasRef.current;

    canvas.width = video?.videoWidth;
    console.log("🚀 ~ takePhoto ~ canvas:", canvas);
    canvas.height = video?.videoHeight;

    const context = canvas?.getContext("2d");
    if (!context) return;
    context.translate(canvas?.width, 0)
    context.scale(-1,1)
    context.drawImage(video, 0, 0);
    setPhoto(canvas?.toDataURL("image/png"));
  }
  function retakePhoto(){
    setPhoto(null)
    setCountdown(false)

  }
  if (photo) {
    return <Preview photo={photo} onRetake={retakePhoto} />;
  }
  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-1/2 h-1/2 object-cover scale-x-[-1]"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {countdown && <Countdown onFinish={takePhoto} />}
      {!countdown && (
        <button
          onClick={() => setCountdown(true)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full text-lg"
        >
          Take Photo
        </button>
      )}
    </div>
  );
};

export default Camera;
