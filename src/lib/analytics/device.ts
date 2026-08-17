import "server-only";

export type DeviceType = "mobile" | "tablet" | "desktop";

export function parseDeviceType(userAgent: string | null): DeviceType {
  if (!userAgent) return "desktop";

  if (/iPad|Android(?!.*Mobile)/i.test(userAgent)) return "tablet";
  if (/iPhone|iPod|Android.*Mobile|Mobi/i.test(userAgent)) return "mobile";
  return "desktop";
}
