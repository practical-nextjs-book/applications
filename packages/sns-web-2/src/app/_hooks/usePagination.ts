"use client";

import { useSearchParams } from "next/navigation";
import { z } from "zod";

export function parseAsPositiveInt(q: string | string[] | undefined) {
  const effect = z.number().positive().int();
  const val = Number(q);
  try {
    effect.parse(val);
    return val;
  } catch {
    return undefined;
  }
}

export function usePagination(name = "page") {
  const searchParams = useSearchParams();
  const p = searchParams.get(name) || "";
  const page = parseAsPositiveInt(p) || 0;
  return page;
}
