"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { Duration } from "luxon";
import Layout from "@/components/Layout";
import { PauseIcon, PlayIcon, ResetIcon } from "@/lib/icons";

const INITIAL_MSG = "Hit Play to Start Pomodoro Cycle";
const FOCUS_TIME = { minutes: 25 };
const BREAK_TIME = { minutes: 5 };

export default function Page() {
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [duration, setDuration] = useState(Duration.fromObject(FOCUS_TIME));
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState(INITIAL_MSG);

  // Handle the timer update
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setDuration((prev) => prev.minus(1000));
      }, 1000);
      setMessage(isBreak ? "Break Time..." : "Focus Session...");
    } else {
      clearInterval(intervalRef.current!);
      isBreak
        ? duration.as("minutes") !== 5 && setMessage("Break Paused")
        : duration.as("minutes") !== 25 && setMessage("Focus Session Paused");
    }

    return () => {
      clearInterval(intervalRef.current!);
    };
  }, [isRunning, isBreak]);

  // Timer cycle logic
  useEffect(() => {
    if (duration.as("seconds") <= 0) {
      if (isBreak) {
        // Switch to Focus Mode
        setIsBreak(false);
        setDuration(Duration.fromObject(FOCUS_TIME));
        setCycleCount(cycleCount + 1);
      } else {
        // Switch to Break Mode
        setIsBreak(true);
        setDuration(Duration.fromObject(BREAK_TIME));
      }
    }
  }, [duration, isBreak]);

  const startPauseTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setDuration(Duration.fromObject(FOCUS_TIME));
    setCycleCount(0);
    setMessage(INITIAL_MSG);
  };

  return (
    <Layout
      top={message}
      mid={
        <>
          <span className="text-[4vw] lg:text-[2vw] italic">#{cycleCount} </span>
          <span>{duration.toFormat("mm:ss")}</span>
        </>
      }
      bottom={
        <div className="flex items-center justify-center gap-12">
          <button className="cursor-pointer" onClick={reset}>
            <ResetIcon size={40} />
          </button>

          <button
            className="cursor-pointer"
            onClick={() => {
              cycleCount === 0 && setCycleCount(1);
              setIsRunning(!isRunning);
            }}
          >
            {isRunning ? <PauseIcon size={80} /> : <PlayIcon size={80} />}
          </button>

          <button className="invisible">{<ResetIcon size={40} />}</button>
        </div>
      }
    />
  );
}
