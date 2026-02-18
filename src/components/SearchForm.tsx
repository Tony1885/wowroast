"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import gsap from "gsap";

interface SearchFormProps {
  onSearch: (name: string, realm: string, region: string) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [name, setName] = useState("");
  const [realm, setRealm] = useState("");
  const [region, setRegion] = useState("eu");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim() && realm.trim()) {
      onSearch(name.trim(), realm.trim(), region);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl space-y-5 opacity-0"
    >
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Character name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white text-lg
                     placeholder-gray-600 focus:outline-none focus:border-blue-400/40
                     focus:ring-1 focus:ring-blue-400/20 transition-all duration-300
                     hover:border-white/[0.12] font-medium tracking-wide"
          disabled={isLoading}
          required
        />
        <input
          type="text"
          placeholder="Realm"
          value={realm}
          onChange={(e) => setRealm(e.target.value)}
          className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white text-lg
                     placeholder-gray-600 focus:outline-none focus:border-blue-400/40
                     focus:ring-1 focus:ring-blue-400/20 transition-all duration-300
                     hover:border-white/[0.12] font-medium tracking-wide"
          disabled={isLoading}
          required
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-xl bg-white/[0.04] border border-white/[0.08] px-5 py-4 text-white text-lg
                     focus:outline-none focus:border-blue-400/40 transition-all duration-300
                     hover:border-white/[0.12] cursor-pointer font-medium tracking-wide"
          disabled={isLoading}
        >
          <option value="eu">EU</option>
          <option value="us">US</option>
          <option value="kr">KR</option>
          <option value="tw">TW</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !name.trim() || !realm.trim()}
        className="w-full btn-roast text-xl tracking-[0.15em]"
      >
        Roast Me !
      </button>
    </form>
  );
}
