"use client";

import { useEffect, useState } from "react";
import Clock from "@/components/Clock";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [place, setPlace] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  useEffect(() => {
    const getIpData = async () => {
      const res = await fetch("https://free.freeipapi.com/api/json");
      const data = await res.json();
      setPlace(`${data.cityName}, ${data.countryName}`);
      setTimezone(data.timeZones[0]);
      setLoading(false);
    };

    getIpData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Clock place={place} timezone={timezone} />
    </>
  );
}
