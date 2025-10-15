import { useEffect, useRef, useState, useMemo } from "react";
import country from "country-list-js";
import { cityMapping } from "city-timezones";
import { SearchIcon } from "@/lib/icons";
import { useClickOutside } from "@/utils/useClickOutside";

interface Result {
  displayName: string;
  slug: string;
}

export default function Search() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDivRef = useRef<HTMLDivElement>(null);

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [iso2Result, setIso2Result] = useState<Result | null>(null);
  const [countryResults, setCountryResults] = useState<Result[]>([]);
  const [cityResults, setCityResults] = useState<Result[]>([]);

  useClickOutside(searchDivRef, () => setShowSearch(false));

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const filteredResults = useMemo(() => {
    if (!query || query.length < 2) {
      setIso2Result(null);
      setCountryResults([]);
      setCityResults([]);
      return;
    }

    const q = query.toLowerCase();
    const isoResult = country.findByIso2(q.toUpperCase());

    if (isoResult?.code?.iso2) {
      setIso2Result({
        displayName: `${isoResult.name} (${isoResult.code.iso2})`,
        slug: isoResult.name.replace(/\s+/g, "-"),
      });
    } else {
      setIso2Result(null);
    }

    const countryAll = country.ls("name");
    const countryMatches = countryAll
      .filter((c) => c.toLowerCase().includes(q) && c !== isoResult?.name)
      .slice(0, 2)
      .map((c) => ({
        displayName: `${country.findByName(c)?.name} (${
          country.findByName(c)?.code.iso2
        })`,
        slug: c.replace(/\s+/g, "-"),
      }));

    const cityMatches = cityMapping
      .filter((c) => c.city.toLowerCase().startsWith(q))
      .slice(0, 3)
      .map((c) => ({
        displayName: `${c.city}`,
        slug: c.city.replace(/\s+/g, "-"),
      }));

    setCountryResults(countryMatches);
    setCityResults(cityMatches);

  }, [query]);

  return (
    <div className="flex items-center">
      {showSearch && (
        <div ref={searchDivRef} className="relative">
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search timezones..."
            className="focus:outline-none border-none bg-transparent"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for countries or cities"
          />
          <ul
            className="absolute py-2"
            role="listbox"
            tabIndex={0}
            aria-expanded={showSearch}
          >
            {[iso2Result, ...countryResults, ...cityResults]
              .filter(Boolean)
              .map((r, i) => (
                <li key={i} className="py-1 my-1" role="option">
                  <a href={`/clock/${r?.slug}`}>{r?.displayName}</a>
                </li>
              ))}
          </ul>
        </div>
      )}
      <button
        className="cursor-pointer"
        onClick={() => setShowSearch(true)}
        aria-label="search timezones"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
