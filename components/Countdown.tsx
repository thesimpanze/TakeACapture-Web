import { useEffect, useState } from "react";

const Countdown = ({ onFinish }: { onFinish: () => void }) => {
  const [count, setCount] = useState(3);
  useEffect(() => {
    if (count === 0) {
      onFinish();
      return;
    }
    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [count, onFinish]);
  return <div className="absolute text-9xl text-white/60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{count}</div>;
};

export default Countdown;
