import country from "country-list-js";
import { cityMapping, lookupViaCity } from "city-timezones";
import { getCountry } from "countries-and-timezones";
import Clock from "@/components/Clock";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deslug = slug.replace(/-/g, " ");

  let name = "";
  let timezone = "";

  const countryResult = country.findByName(deslug);
  if (countryResult) {
    countryResult.timezones = getCountry(countryResult.code.iso2).timezones;
    if (countryResult.timezones.length === 1) {
      name = `${countryResult.name}`;
      timezone = countryResult.timezones[0];
    } else {
      const capital = countryResult.capital;
      name = `${capital}, ${countryResult.name}`;
      timezone = cityMapping.find(
        (c) => c.city.includes(capital) || capital.includes(c.city)
      )?.timezone!;
    }
  } else {
    const city = lookupViaCity(deslug)[0];
    name = `${city.city}, ${city.country}`;
    timezone = city.timezone;
  }

  if (!name || !timezone) return;

  return (
    <>
      <Clock place={name} timezone={timezone} />
    </>
  );
}
