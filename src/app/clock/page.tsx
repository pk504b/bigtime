import Clock from "@/components/Clock";

export default async function Page() {
  const res = await fetch("https://free.freeipapi.com/api/json");
  const data = await res.json();

  const place = `${data.cityName}, ${data.countryName}`;
  const timezone = data.timeZones[0];

  return (
    <>
      <Clock place={place} timezone={timezone} />
    </>
  );
}
