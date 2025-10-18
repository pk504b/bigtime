"use client";

import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Layout from "../../components/Layout";

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

  // UPDATE TITLE
  useEffect(() => {
    if (now) {
      document.title = is12Hour
        ? `${now.toFormat("h:mm a")} in ${place}`
        : `${now.toFormat("HH:mm")} in ${place}`;
    } else {
      document.title = "Timer";
    }
  }, [now, is12Hour]);

  if (!hasMounted) return null;

  return (
    <Layout
      top={<Top place={place} />}
      mid={<Mid now={now} is12Hour={is12Hour} setIs12Hour={setIs12Hour} />}
      bottom={<Bottom now={now} />}
    />
  );
}

function Top({ place }: { place: string }) {
  return (
    <>
      Time in <span className="font-semibold">{place}</span> now:
    </>
  );
}

function Mid({
  now,
  is12Hour,
  setIs12Hour,
}: {
  now: DateTime;
  is12Hour: boolean;
  setIs12Hour: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="cursor-pointer" onClick={() => setIs12Hour(!is12Hour)}>
      {is12Hour ? (
        <>
          <span className="">{now.toFormat("h:mm:ss")}</span>
          <span className="text-4xl">{now.toFormat("a")}</span>
        </>
      ) : (
        <>
          <span className="">{now.toFormat("HH:mm:ss")}</span>
        </>
      )}
    </div>
  );
}

function Bottom({ now }: { now: DateTime }) {
  return (
    <div className="text-2xl md:text-3xl tracking-widest">
      {now.toFormat("EEEE, d MMMM, yyyy")}
    </div>
  );
}
