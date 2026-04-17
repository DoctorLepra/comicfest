"use client";

import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <div className="flex items-center gap-5 md:gap-7">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-5 md:gap-7">
          <div className="flex flex-col items-center">
            <div className="glass border border-cf-yellow/20 rounded-xl px-4 py-3 md:px-7 md:py-5 min-w-[64px] md:min-w-[84px] text-center">
              <span className="font-display text-3xl md:text-5xl font-black text-cf-white tabular-nums leading-none">
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-cf-white/40 text-[10px] md:text-xs font-body uppercase tracking-widest mt-3">
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="font-display text-2xl md:text-4xl font-black text-cf-yellow/50 -mt-6">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
