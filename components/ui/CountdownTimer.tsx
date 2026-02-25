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
    <div className="flex items-center gap-3 md:gap-4">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-3 md:gap-4">
          <div className="flex flex-col items-center">
            <div className="glass border border-cf-yellow/20 rounded-xl px-3 py-2 md:px-5 md:py-3 min-w-[56px] md:min-w-[72px] text-center">
              <span className="font-display text-2xl md:text-4xl font-black text-cf-white tabular-nums leading-none">
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-cf-white/40 text-[10px] md:text-xs font-body uppercase tracking-widest mt-1.5">
              {label}
            </span>
          </div>
          {i < 3 && (
            <span className="font-display text-xl md:text-3xl font-black text-cf-yellow/50 -mt-4">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
