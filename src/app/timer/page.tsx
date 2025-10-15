"use client";

import { useState, useEffect, useRef } from "react";
import { Duration } from "luxon";
import {
  CaretDownIcon,
  CaretUpIcon,
  PauseIcon,
  PlayIcon,
  PlusOneIcon,
  ResetIcon,
} from "@/lib/icons";
import Layout from "@/components/Layout";

const INITIAL_MSG = "Swipe Up/Down to Set Timer";

export default function Page() {
  const [duration, setDuration] = useState(Duration.fromMillis(0));
  const [isRunning, setIsRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState(INITIAL_MSG);

  function update(unit: any, delta: number) {
    if (isRunning || started) return;

    let newDuration = duration.plus({ [unit]: delta });
    if (newDuration.get(unit) < 0) {
      newDuration = newDuration.set({ [unit]: 0 });
    } else if (newDuration.get(unit) > 59) {
      newDuration = newDuration.set({ [unit]: 59 });
    }
    setDuration(newDuration);
  }

  function updateOnWheel(e: React.WheelEvent<HTMLSpanElement>, unit: any) {
    const delta = e.deltaY > 0 ? 1 : -1;
    update(unit, delta);
  }

  function toggleTimer() {
    if (duration.as("seconds") <= 0) return;
    setStarted(true);
    setIsRunning((prev) => !prev);
  }

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setDuration((prevDur) => {
          const newDur = prevDur.minus(1000);
          if (newDur.as("seconds") <= 0) {
            endTimer();
            return prevDur;
          }
          return newDur;
        });
      }, 1000);
      setMessage("Timer Running...");
    } else {
      clearInterval(intervalRef.current!);
      started && setMessage("Timer Paused");
    }

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [isRunning, started]);

  function reset() {
    if (isRunning) return;
    setDuration(Duration.fromMillis(0));
    setStarted(false);
    setMessage(INITIAL_MSG);
  }

  function plusOne() {
    setDuration((prevDur) => prevDur.plus({ minutes: 1 }));
  }

  function endTimer() {
    setDuration(Duration.fromMillis(0));
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setStarted(false);
    setIsRunning(false);
    setMessage("Timer Ended");
  }

  return (
    <Layout
      top={message}
      mid={
        <Mid
          duration={duration}
          update={update}
          updateOnWheel={updateOnWheel}
          started={started}
        />
      }
      bottom={
        <Bottom
          isRunning={isRunning}
          reset={reset}
          duration={duration}
          toggleTimer={toggleTimer}
          plusOne={plusOne}
        />
      }
    />
  );
}

function Mid({
  duration,
  update,
  updateOnWheel,
  started,
}: {
  duration: Duration;
  update: (unit: any, delta: number) => void;
  updateOnWheel: (e: React.WheelEvent<HTMLSpanElement>, unit: any) => void;
  started: boolean;
}) {
  return (
    <>
      {["hours", "minutes", "seconds"].map((unit, i) => (
        <span key={i} className="">
          <span className="relative group">
            <button
              className={`absolute -top-0 left-1/2 -translate-x-1/2 px-6 hidden group-hover:block ${
                started ? "cursor-not-allowed opacity-50" : "cursor-ns-resize"
              }`}
              onClick={() => update(unit, 1)}
            >
              <CaretUpIcon />
            </button>
            <span
              className={started ? "cursor-not-allowed" : "cursor-ns-resize"}
              onWheel={(e) => updateOnWheel(e, unit)}
            >
              {duration.toFormat("hh:mm:ss").split(":")[i]}
            </span>
            <button
              className={`absolute -bottom-0 left-1/2 -translate-x-1/2 px-6 hidden group-hover:block ${
                started ? "cursor-not-allowed opacity-50" : "cursor-ns-resize"
              }`}
              onClick={() => update(unit, -1)}
            >
              <CaretDownIcon />
            </button>
          </span>
          {unit !== "seconds" && <span>:</span>}
        </span>
      ))}
    </>
  );
}

function Bottom({
  isRunning,
  reset,
  duration,
  toggleTimer,
  plusOne,
}: {
  isRunning: boolean;
  reset: () => void;
  duration: Duration;
  toggleTimer: () => void;
  plusOne: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-12">
      {/* RESET */}
      <button
        className={
          isRunning ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        }
        onClick={reset}
      >
        <ResetIcon size={40} />
      </button>

      {/* PLAY/PAUSE */}
      <button
        className={
          duration.as("seconds") <= 0
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }
        onClick={toggleTimer}
      >
        {isRunning ? <PauseIcon size={80} /> : <PlayIcon size={80} />}
      </button>

      {/* +1 MINUTE */}
      <button className="cursor-pointer" onClick={plusOne}>
        <PlusOneIcon size={40} />
      </button>
    </div>
  );
}
