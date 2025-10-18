"use client";

import Layout from "@/components/Layout";
import {
  PauseIcon,
  PlayIcon,
  ResetIcon,
  TimestampIcon,
} from "@/lib/icons";
import { DateTime, Duration } from "luxon";
import { useEffect, useRef, useState } from "react";

const INITIAL_MSG = "Hit Play Button to start the Stopwatch";

export default function Page() {
  const [duration, setDuration] = useState(Duration.fromMillis(0));
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState(INITIAL_MSG);
  const [timestamps, setTimestamps] = useState<Duration[]>([]);
  const olRef = useRef<HTMLOListElement>(null);

  // const formattedDuration = Duration.fromMillis(duration);

  useEffect(() => {
    if (isRunning) {
      const startTime = DateTime.now().minus(duration);
      intervalRef.current = setInterval(() => {
        setDuration(DateTime.now().diff(startTime));
      }, 10);
      setMessage("Stopwatch Running...");
    } else {
      clearInterval(intervalRef.current!);
      duration.as("seconds") > 0 && setMessage("Stopwatch Paused");
    }

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [isRunning, duration]);

  // UPDATE TITLE
  useEffect(() => {
    if (isRunning) {
      document.title = `Stopwatch ${
        duration.hours > 0
          ? duration.toFormat("hh:mm:ss")
          : duration.toFormat("mm:ss")
      }`;
    } else {
      document.title = "Stopwatch";
    }
  }, [duration, isRunning]);

  // Scroll to bottom of timestamps list
  useEffect(() => {
    if (olRef.current) {
      olRef.current.scrollTop = olRef.current.scrollHeight;
    }
  }, [timestamps]);

  function reset() {
    setDuration(Duration.fromMillis(0));
    setIsRunning(false);
    setTimestamps([]);
    setMessage(INITIAL_MSG);
  }

  function recordTimestamp() {
    setTimestamps((prev) => [...prev, duration]);
  }

  return (
    <>
      <Layout
        top={message}
        mid={<Mid duration={duration} />}
        bottom={
          <Bottom
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            reset={reset}
            recordTimestamp={recordTimestamp}
          />
        }
      />

      {timestamps.length > 0 && (
        <div className="absolute top-10 right-4 text-sm dark:text-dpm">
          <p className="mb-2 text-center">Timestamps</p>
          <ol ref={olRef} className="max-h-40 overflow-y-scroll no-scrollbar ">
            {timestamps.map((ts, i) => (
              <li key={i} className="list-none font-mono">
                <span className="italic">
                  #{(i + 1).toString().padStart(2, "0")}
                </span>
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ts.toFormat("hh:mm:ss SSS")}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}

function Mid({ duration }: { duration: Duration }) {
  return (
    <>
      <span>
        {duration.hours > 0 ? duration.get("hour") : ""}
      </span>
      <span>{duration.toFormat("mm:ss")}</span>
      <span className="text-[5vw] ml-3">
        {duration.toFormat("ss SSS").split(" ")[1]}
      </span>
    </>
  );
}

function Bottom({
  isRunning,
  setIsRunning,
  reset,
  recordTimestamp,
}: {
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  recordTimestamp: () => void;
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

      <button
        className={
          isRunning ? "cursor-pointer" : "cursor-not-allowed opacity-50"
        }
        onClick={recordTimestamp}
      >
        {<TimestampIcon size={40} />}
      </button>
    </div>
  );
}
