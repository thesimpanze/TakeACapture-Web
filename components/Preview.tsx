const Preview = ({photo, onRetake,}: {photo: string;onRetake: () => void;}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black">
      <img src={photo} className="max-h-[80%] mb-4" />

      <div className="flex gap-4">
        <a
          href={photo}
          download="photobooth.png"
          className="bg-white text-black px-4 py-2 rounded"
        >
          Download
        </a>

        <button
          onClick={onRetake}
          className="border border-white text-white px-4 py-2 rounded"
        >
          Retake
        </button>
      </div>
    </div>
  );
};

export default Preview;
