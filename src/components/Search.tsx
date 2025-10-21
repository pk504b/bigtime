"use client";

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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchResults = [iso2Result, ...countryResults, ...cityResults].filter(
    Boolean
  );

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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % searchResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev === 0 ? searchResults.length - 1 : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = searchResults[highlightedIndex];
      if (selected) {
        window.location.href = `/clock/${selected.slug}`;
      }
    }
  }

  return (
    <div className="flex items-center">
      {showSearch && (
        <div ref={searchDivRef} className="relative">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search timezones..."
            className="focus:outline-none border-none bg-transparent"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlightedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
          />
          <ul
            className="absolute py-2"
            role="listbox"
            tabIndex={0}
            aria-expanded={showSearch}
          >
            {searchResults.map((r, i) => (
              <li
                key={i}
                className={`py-1 my-1 ${
                  i === highlightedIndex
                    ? "text-lightbrigtgreen dark:text-hintofyellow"
                    : ""
                }`}
                role="option"
                aria-selected={i === highlightedIndex}
              >
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
