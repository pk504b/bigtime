"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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

  function updateOnTouch(e: React.TouchEvent<HTMLSpanElement>, unit: any) {
    const touchMoveY = e.touches[0].clientY;
    let delta = 0;

    if (e.type === "touchstart") {
      e.currentTarget.dataset.touchStartY = touchMoveY.toString();
    } else if (e.type === "touchmove") {
      const touchStartY = parseFloat(
        e.currentTarget.dataset.touchStartY || "0",
      );
      delta = touchMoveY - touchStartY;

      if (Math.abs(delta) > 10) {
        update(unit, delta > 0 ? -1 : 1);
        e.currentTarget.dataset.touchStartY = touchMoveY.toString();
      }
    }
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
          return newDur.as("seconds") <= 0 ? Duration.fromMillis(0) : newDur;
        });
      }, 1000);
      setMessage("Timer Running...");
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      started && setMessage("Timer Paused");
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, started]);

  useEffect(() => {
    if (isRunning && duration.as("seconds") <= 0) {
      endTimer();
    }
  }, [duration, isRunning]);

  // UPDATE TITLE
  useEffect(() => {
    if (isRunning) {
      document.title = `Timer ${
        duration.hours > 0
          ? duration.toFormat("hh:mm:ss")
          : duration.toFormat("mm:ss")
      }`;
    } else {
      document.title = "Timer";
    }
  }, [duration, isRunning]);

  function reset() {
    if (isRunning) return;
    setDuration(Duration.fromMillis(0));
    setStarted(false);
    setMessage(INITIAL_MSG);
  }

  function plusOne() {
    setDuration((prevDur) => prevDur.plus({ minutes: 1 }));
  }

  function playBeep() {
    try {
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioCtx = new AudioContextClass();

      const playTone = (freq: number, startTime: number, duration: number) => {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(freq, startTime);

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      // Play two short beeps
      const now = audioCtx.currentTime;
      playTone(880, now, 0.1);
      playTone(880, now + 0.2, 0.1);

      // Clean up the context after beeps finish
      setTimeout(() => {
        if (audioCtx.state !== "closed") {
          audioCtx.close();
        }
      }, 500);
    } catch (error) {
      console.error("Failed to play notification sound:", error);
    }
  }

  function endTimer() {
    if (!isRunning) return;

    setIsRunning(false);
    setStarted(false);
    setDuration(Duration.fromMillis(0));
    setMessage("Timer Ended");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    playBeep();

    if ("Notification" in window && Notification.permission === "granted") {
      try {
        const notification = new Notification("Bigtime", {
          body: "Timer Finished!",
          icon: "/favicon.ico",
          silent: true,
        });
        notification.onclick = (e) => {
          e.preventDefault();
          window.focus();
          router.push("/timer");
        };
      } catch (err) {
        console.warn(
          "Standard Notification API failed, likely on mobile. Error:",
          err,
        );
      }
    }
  }

  return (
    <Layout
      top={message}
      mid={
        <Mid
          duration={duration}
          update={update}
          updateOnWheel={updateOnWheel}
          updateOnTouch={updateOnTouch}
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
  updateOnTouch,
  started,
}: {
  duration: Duration;
  update: (unit: any, delta: number) => void;
  updateOnWheel: (e: React.WheelEvent<HTMLSpanElement>, unit: any) => void;
  updateOnTouch: (e: React.TouchEvent<HTMLSpanElement>, unit: any) => void;
  started: boolean;
}) {
  return (
    <>
      {["hours", "minutes", "seconds"].map((unit, i) => (
        <span key={i} className="">
          <span className="relative group">
            <button
              className={`absolute -top-0 left-1/2 -translate-x-1/2 px-6 group-hover:block lg:hidden ${
                started ? "hidden" : "cursor-pointer"
              }`}
              onClick={() => update(unit, 1)}
            >
              <CaretUpIcon />
            </button>
            <span
              className={started ? "cursor-not-allowed" : "cursor-ns-resize"}
              onWheel={(e) => updateOnWheel(e, unit)}
              onTouchStart={(e) => updateOnTouch(e, unit)}
              onTouchMove={(e) => updateOnTouch(e, unit)}
            >
              {duration.toFormat("hh:mm:ss").split(":")[i]}
            </span>
            <button
              className={`absolute -bottom-0 left-1/2 -translate-x-1/2 px-6 group-hover:block lg:hidden ${
                started ? "hidden" : "cursor-pointer"
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
