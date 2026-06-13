"use client";

import countriesData from "@/data/countries.json";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Country = {
  code: string;
  name: string;
  flag: string;
  phone: string;
};

const COUNTRIES: Country[] = countriesData
  .filter((c: any) => c.code && c.dial_code)
  .map((c: any) => ({
    code: c.code,
    name: c.name,
    flag: c.image,
    phone: c.dial_code,
  }))
  .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

type Props = {
  field: any;
};

const getInitialCountry = () => {
  try {
    const locale = navigator.language || navigator.languages?.[0] || "";
    const parts = locale.split("-");
    const detected = parts[parts.length - 1]?.toUpperCase();
    if (detected && detected.length === 2) {
      const match = COUNTRIES.find((c) => c.code === detected);
      if (match) return match;
    }
  } catch {}
  return COUNTRIES[0];
};

export default function PhoneCountryRenderer({ field }: Props) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    field.value?.countryCode
      ? COUNTRIES.find((c) => c.code === field.value.countryCode) ||
          COUNTRIES[0]
      : getInitialCountry(),
  );
  const [phoneNumber, setPhoneNumber] = useState(field.value?.phone || "");
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.phone.includes(search) ||
          c.code.toLowerCase().includes(search.toLowerCase()),
      )
    : COUNTRIES;

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
    setSearch("");
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const emitChange = (country: Country, phone: string) => {
    if (typeof field?.onChange === "function") {
      field.onChange({
        countryCode: country.code,
        phone,
        countryName: country.name,
      });
    }
  };

  const selectCountry = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    emitChange(country, phoneNumber);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPhoneNumber(val);
    emitChange(selectedCountry, val);
  };

  return (
    <div className="space-y-1 w-full">
      <label className="block text-sm font-semibold text-headerColor">
        {field.label || "Phone no."}
        {field.required && " *"}
      </label>
      <div className="relative" ref={dropdownRef}>
        <div className="flex items-center border border-borderColor rounded-lg bg-bgColor overflow-hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2 py-3 border-r border-borderColor cursor-pointer shrink-0"
          >
            <Image
              src={selectedCountry.flag}
              width={50}
              height={30}
              alt={selectedCountry.code}
              className="w-5 h-5"
            />
            <ChevronDown size={12} className="text-gray-400" />
            <span className="text-sm text-headerColor">
              {selectedCountry.phone}
            </span>
          </button>
          <input
            type="phone"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={field.placeholder || "Enter phone number"}
            className="flex-1 px-2 py-2.5 bg-transparent text-sm text-headerColor outline-none"
          />
        </div>

        {isOpen && (
          <div className="absolute top-full mt-1 left-0 w-58 z-50 bg-white border border-borderColor rounded-lg shadow-lg max-h-72 flex flex-col">
            <div className="flex items-center gap-2 px-3 py-2 border-b border-borderColor">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
            <div className="overflow-y-auto flex-1">
              {filtered.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">
                  No countries found
                </p>
              ) : (
                filtered.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => selectCountry(c)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-gray-50 cursor-pointer ${
                      selectedCountry.code === c.code
                        ? "bg-gray-50 font-semibold"
                        : ""
                    }`}
                  >
                    <Image
                      src={c.flag}
                      alt={c.code}
                      width={40}
                      height={30}
                      className="w-6 h-5"
                    />
                    <span className="flex-1 text-headerColor">{c.name}</span>
                    <span className="text-xs text-gray-400">{c.phone}</span>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
