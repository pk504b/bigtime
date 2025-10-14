"use client";

import { Rubik_Mono_One } from "next/font/google";
import { useEffect, useState } from "react";
import { DateTime } from 'luxon'
import Layout from "./Layout";

const rubikMono = Rubik_Mono_One({ weight: "400", subsets: ["latin"] });

interface Props {
  place: string;
  timezone: string;
}

export default function Clock({ place, timezone }: Props) {
  const [now, setNow] = useState(DateTime.now().setZone(timezone));
  const [is12Hour, setIs12Hour] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const interval = setInterval(() => {
      setNow(DateTime.now().setZone(timezone));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <Layout
        top={
          <>
            Time in <span className="font-semibold">{place}</span> now:
          </>
        }
        mid={
          is12Hour ? (
            <>
              <span className="">
                {now.toFormat("h:mm:ss")}
              </span>
              <span className="text-4xl">
                {now.toFormat("a")}
              </span>
            </>
          ) : (
            <>
              <span className="">
                {now.toFormat("HH:mm:ss")}
              </span>
            </>
          )
        }
        bottom={<div className="text-2xl md:text-3xl tracking-widest">{now.toFormat("EEEE, d MMMM, yyyy")}</div>}
        onClick={() => setIs12Hour(!is12Hour)}
      />
    </>
  );
}
