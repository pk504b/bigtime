"use client";

import Layout from "@/components/Layout";
import { PauseIcon, PlayIcon, ResetIcon } from "@/lib/icons";
import { DateTime, Duration } from "luxon";
import { useEffect, useRef, useState } from "react";

const initialMessege = "Hit Play Button to start the Stopwatch";

export default function Page() {
  const [duration, setDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState(initialMessege);

  const formattedDuration = Duration.fromMillis(duration);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - duration;
      intervalRef.current = setInterval(() => {
        setDuration(Date.now() - startTime);
      }, 10);
      setMessage("Stopwatch Running...");
    } else {
      clearInterval(intervalRef.current!);
      duration === 0
        ? setMessage(initialMessege)
        : setMessage("Stopwatch Paused...");
    }

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [isRunning, duration]);

  function reset() {
    setDuration(0);
    setIsRunning(false);
  }

  return (
    <Layout
      top={message}
      mid={<Mid formattedDuration={formattedDuration} />}
      bottom={
        <Bottom
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          reset={reset}
        />
      }
    />
  );
}

function Mid({ formattedDuration }: { formattedDuration: Duration }) {
  return (
    <>
      <span>
        {formattedDuration.hours > 0 ? formattedDuration.get("hour") : ""}
      </span>
      <span>{formattedDuration.toFormat("mm:ss")}</span>
      <span className="text-[5vw] ml-3">
        {formattedDuration.toFormat("ss SSS").split(" ")[1]}
      </span>
    </>
  );
}

function Bottom({
  isRunning,
  setIsRunning,
  reset,
}: {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-12">
      <button className="cursor-pointer" onClick={reset}>
        <ResetIcon size={40} />
      </button>

      <button
        className="cursor-pointer"
        onClick={() => setIsRunning(!isRunning)}
      >
        {isRunning ? <PauseIcon size={80} /> : <PlayIcon size={80} />}
      </button>
    </div>
  );
}
