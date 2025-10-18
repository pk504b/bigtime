"use client";

import { useEffect, useState } from "react";
import Clock from "./Clock";
import { notFound } from "next/navigation";

export default function Page() {
  const [place, setPlace] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch("/api");
        const data = await res.json();

        setPlace(`${data.cityName}, ${data.countryName}`);
        setTimezone(data.timeZones[0]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Detecting your location...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) return notFound();

  return <Clock place={place} timezone={timezone} />;
}
