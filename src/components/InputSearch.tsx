import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";

const mockData = [
  "Star Wars",
  "Star Trek",
  "Stargate",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "The Lord of the Rings",
  "The Matrix",
  "The Shawshank Redemption",
  "Inception",
  "Fight Club",
];

export function InputSearch() {
  // Hooks
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | undefined)[]>([]);

  // States
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Methods
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setFilteredResults([]);
    } else {
      const results = mockData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
    }

    setActiveIndex(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredResults.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex =
          prev === null ? 0 : Math.min(prev + 1, filteredResults.length - 1);
        return nextIndex;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => {
        const nextIndex =
          prev === null ? filteredResults.length - 1 : Math.max(prev - 1, 0);
        return nextIndex;
      });
    }

    if (e.key === "Enter" && activeIndex !== null) {
      e.preventDefault();
      setSearch(filteredResults[activeIndex]);
      setFilteredResults([]);
      setActiveIndex(null);
    }
  };

  // Effects
  useEffect(() => {
    if (activeIndex !== null && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.focus();
      itemRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

  // Renders
  return (
    <div className="group" ref={wrapperRef}>
      <p className="text-gray-800">Pesquise um filme</p>
      <div className="flex justify-between gap-2 w-full h-10 px-2 py-1 rounded-md border border-gray-600 focus-within:border-blue-500">
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Ex: Star Wars"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />

        <button>
          <FaChevronDown className="fill-gray-600 group-focus-within:fill-blue-500 transform transition-transform duration-300 group-focus-within:rotate-180" />
        </button>
      </div>

      {search.length > 0 && (
        <ul className="group mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
          {filteredResults.length === 0 && (
            <div className="flex items-center justify-center h-14">
              <p className="text-center text-gray-400">
                Nenhum resultado encontrado para "{search}"
              </p>
            </div>
          )}

          {filteredResults.map((item, index) => (
            <li
              className={`px-4 py-2 cursor-pointer ${
                activeIndex === index ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
              key={index}
              ref={(el) => {
                itemRefs.current[index] = el ?? undefined;
              }}
              onClick={() => setSearch(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearch(item);
                  setFilteredResults([]);
                  setActiveIndex(null);
                }
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
