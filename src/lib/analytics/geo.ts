import "server-only";
import { headers } from "next/headers";

export type GeoInfo = {
  city: string | null;
  region: string | null;
  country: string | null;
};

/**
 * Vercel injects these headers at the edge for every request in production.
 * They're absent in local dev / non-Vercel hosting, so everything here is
 * optional and falls back to null rather than calling an external geo API.
 */
export async function getGeoFromHeaders(): Promise<GeoInfo> {
  const headerList = await headers();

  const rawCity = headerList.get("x-vercel-ip-city");

  return {
    city: rawCity ? decodeURIComponent(rawCity) : null,
    region: headerList.get("x-vercel-ip-country-region"),
    country: headerList.get("x-vercel-ip-country"),
  };
}
