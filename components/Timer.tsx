"use client";
import React from "react";
import { useTimer } from "react-timer-hook";

interface MyTimerProps {
  expiryTimestamp: Date;
}
export const Timer: React.FC<MyTimerProps> = ({ expiryTimestamp }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="min-h-screen h-max md:h-screen flex-col justify-center items-center">
      <div className=" text-center font-[900] text-5xl text-white pb-16">Countdown TO El-salvador dogs PRESALE</div>
      <div className="flex  flex-col md:flex-row justify-center items-center">
        <div className="relative">
          <svg className="-rotate-90 h-48 w-48">
            <circle
              r="70"
              cx="90"
              cy="90"
              className="fill-transparent stroke-[#88adf1] stroke-[8px]"
            ></circle>
            <circle
              r="70"
              cx="90"
              cy="90"
              style={{
                strokeDasharray: `${
                  days > 0 ? 440 - (days * 440) / 365 : 440
                }px`,
              }}
              className="fill-transparent stroke-white  stroke-[8px]"
            ></circle>
          </svg>
          <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
            <span className="text-center">{days}</span>
            <span className="text-center">{days == 1 ? "Day" : "Days"}</span>
          </div>
        </div>
        <div className="relative">
          <svg className="-rotate-90 h-48 w-48">
            <circle
              r="70"
              cx="90"
              cy="90"
              className="fill-transparent stroke-[#88adf1] stroke-[8px]"
            ></circle>
            <circle
              r="70"
              cx="90"
              cy="90"
              style={{
                strokeDasharray: `${
                  hours > 0 ? 451 - (hours * 451) / 24 : 451
                }px`,
              }}
              className="fill-transparent stroke-white  stroke-[8px]"
            ></circle>
          </svg>
          <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
            <span className="text-center">{hours}</span>
            <span className="text-center">{hours == 1 ? "Hour" : "Hours"}</span>
          </div>
        </div>
        <div className="relative">
          <svg className="-rotate-90 h-48 w-48">
            <circle
              r="70"
              cx="90"
              cy="90"
              className="fill-transparent stroke-[#88adf1] stroke-[8px]"
            ></circle>
            <circle
              r="70"
              cx="90"
              cy="90"
              style={{
                strokeDasharray: `${
                  minutes > 0 ? 451 - (minutes * 451) / 60 : 451
                }px`,
              }}
              className="fill-transparent stroke-white stroke-[8px]"
            ></circle>
          </svg>
          <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
            <span className="text-center">{minutes}</span>
            <span className="text-center">
              {minutes == 1 ? "Minute" : "Minutes"}
            </span>
          </div>
        </div>
        <div className="relative">
          <svg className="-rotate-90 h-48 w-48">
            <circle
              r="70"
              cx="90"
              cy="90"
              className="fill-transparent stroke-[#88adf1] stroke-[8px]"
            ></circle>
            <circle
              r="70"
              cx="90"
              cy="90"
              className=" fill-transparent stroke-white  stroke-[8px]"
              style={{
                strokeDasharray: `${
                  seconds > 0 ? 451 - (seconds * 451) / 60 : 451
                }px`,
              }}
            ></circle>
          </svg>
          <div className="text-white absolute top-16 left-11 text-2xl font-semibold flex flex-col items-center w-24 h-20">
            <span className="text-center">{seconds}</span>
            <span className="text-center">
              {seconds == 1 ? "Second" : "Seconds"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
