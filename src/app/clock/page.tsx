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
        const cached = sessionStorage.getItem("locationData");

        if (cached) {
          const { place, timezone } = JSON.parse(cached);
          setPlace(place);
          setTimezone(timezone);
        } else {
          const res = await fetch("https://api.ipapi.is/");
          const data = await res.json();

          const newPlace = `${data.location.city}, ${data.location.country}`;
          const newTimezone = data.location.timezone;

          setPlace(newPlace);
          setTimezone(newTimezone);

          sessionStorage.setItem(
            "locationData",
            JSON.stringify({ place: newPlace, timezone: newTimezone })
          );
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-2xl animate-pulse">Detecting your location...</p>
      </div>
    );
  }

  if (error) return notFound();

  return <Clock place={place} timezone={timezone} />;
}

// https://www.ipify.org/ + https://country.is/ for Country Only
// Or, geolocation api + Intl.DateTimeFormat.resolvedOptions().timeZone
// Or, https://api.ipgeolocation.io
