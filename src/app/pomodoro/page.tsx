"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Duration } from "luxon";
import Layout from "@/components/Layout";
import { PauseIcon, PlayIcon, ResetIcon } from "@/lib/icons";

const INITIAL_MSG = "Hit Play to Start Pomodoro Cycle";
const FOCUS_TIME = { seconds: 10 };
const BREAK_TIME = { seconds: 5 };

export default function Page() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [duration, setDuration] = useState(Duration.fromObject(FOCUS_TIME));
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [message, setMessage] = useState(INITIAL_MSG);

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
    } catch (error) {
      console.error("Failed to play notification sound:", error);
    }
  }

  function sendNotification(
    title: string,
    body: string,
    onAction?: () => void,
  ) {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(title, {
        body,
        icon: "/favicon.ico",
        silent: true,
      });
      notification.onclick = (e) => {
        e.preventDefault();
        window.focus();
        router.push("/pomodoro");
        if (onAction) onAction();
      };
    }
  }

  // Handle the timer update
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setDuration((prev) => {
          const newDur = prev.minus(1000);
          return newDur.as("seconds") <= 0 ? Duration.fromMillis(0) : newDur;
        });
      }, 1000);
      setMessage(isBreak ? "Break Time..." : "Focus Session...");
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (!message.includes("Ended")) {
        isBreak
          ? duration.as("seconds") !== 5 && setMessage("Break Paused")
          : duration.as("seconds") !== 10 && setMessage("Focus Session Paused");
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, isBreak]);

  // Timer cycle logic
  useEffect(() => {
    if (isRunning && duration.as("seconds") <= 0) {
      playBeep();
      setIsRunning(false);
      if (isBreak) {
        // Switch to Focus Mode
        setIsBreak(false);
        setDuration(Duration.fromObject(FOCUS_TIME));
        setCycleCount(cycleCount + 1);
        setMessage("Break Ended");
        sendNotification(
          "Bigtime",
          "Break Ended! Click to start Focus Session.",
          () => setIsRunning(true),
        );
      } else {
        // Switch to Break Mode
        setIsBreak(true);
        setDuration(Duration.fromObject(BREAK_TIME));
        setMessage("Focus Session Ended");
        sendNotification(
          "Bigtime",
          "Focus Session Ended! Click to start a Break.",
          () => setIsRunning(true),
        );
      }
    }
  }, [duration, isBreak, isRunning, cycleCount]);

  // UPDATE TITLE
  useEffect(() => {
    if (isRunning) {
      document.title = isBreak
        ? `Break ${duration.toFormat("mm:ss")}`
        : `Focus ${duration.toFormat("mm:ss")}`;
    } else {
      document.title = "Pomodoro";
    }
  }, [duration, isRunning, isBreak]);

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
          <span className="text-[4vw] lg:text-[2vw] italic">
            #{cycleCount}{" "}
          </span>
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
