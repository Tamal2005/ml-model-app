import { useEffect, useState } from "react";

export type ServiceStatus = "waking" | "ready" | "error";

interface Service {
  name: string;
  baseUrl: string;
  healthPath?: string; // defaults to "/"
}

export function useWakeBackends(services: Service[]) {
  const [statuses, setStatuses] = useState<Record<string, ServiceStatus>>(
    () => Object.fromEntries(services.map((s) => [s.name, "waking"]))
  );

  useEffect(() => {
    let cancelled = false;

    const pingService = async (service: Service, attempt = 1): Promise<void> => {
      const path = service.healthPath ?? "/";
      try {
        const res = await fetch(`${service.baseUrl}${path}`);
        if (res.ok && !cancelled) {
          setStatuses((prev) => ({ ...prev, [service.name]: "ready" }));
          return;
        }
        throw new Error("not ready");
      } catch {
        if (cancelled) return;
        if (attempt < 6) {
          setTimeout(() => pingService(service, attempt + 1), attempt * 2000);
        } else {
          setStatuses((prev) => ({ ...prev, [service.name]: "error" }));
        }
      }
    };

    services.forEach((s) => pingService(s));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return statuses;
}