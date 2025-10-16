import country from "country-list-js";
import { cityMapping, lookupViaCity } from "city-timezones";
import { getCountry } from "countries-and-timezones";
import Clock from "../Clock";
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const deslug = slug.replace(/-/g, " ");

  let name = "";
  let timezone = "";

  const cntry = country.findByName(deslug);

  if (cntry) {
    const { name: countryName, code, capital } = cntry;
    const { iso2 } = code;

    cntry.timezones = getCountry(iso2)?.timezones || [];

    if (cntry.timezones.length === 1) {
      name = countryName;
      timezone = cntry.timezones[0];
    } else if (capital) {
      name = `${capital}, ${countryName}`;
      timezone =
        cityMapping.find(
          (c) => c.city.includes(capital) || capital.includes(c.city)
        )?.timezone ?? "";
    }
  } else {
    const [city] = lookupViaCity(deslug) || [];
    if (city) {
      name = `${city.city}, ${city.country}`;
      timezone = city.timezone;
    }
  }

  if (!name || !timezone) return notFound();

  return (
    <>
      <Clock place={name} timezone={timezone} />
    </>
  );
}
