import { useCallback, useEffect, useRef, useState } from "react";
import type {
  GpsEventLog,
  GpsPosition,
  GpsState,
  GpsStatus,
} from "../lib/types";

const MAX_EVENTS = 50;
const GPS_TIMEOUT_MS = 15000;
const GPS_MAX_AGE_MS = 5000;
const GPS_HIGH_ACCURACY = true;

interface UseGpsReturn extends GpsState {
  startTracking: () => void;
  stopTracking: () => void;
}

export function useGps(): UseGpsReturn {
  const [state, setState] = useState<GpsState>({
    status: "idle",
    position: null,
    accuracy: null,
    errorMessage: null,
    gpsEvents: [],
  });

  const watchIdRef = useRef<number | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const addEvent = useCallback(
    (type: GpsStatus, message: string, accuracy?: number) => {
      const event: GpsEventLog = {
        type,
        message,
        timestamp: Date.now(),
        accuracy,
      };
      setState((prev) => ({
        ...prev,
        gpsEvents: [event, ...prev.gpsEvents].slice(0, MAX_EVENTS),
      }));
    },
    [],
  );

  const startTracking = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: "Geolocation is not supported by this browser.",
      }));
      addEvent("error", "Geolocation not supported");
      return;
    }

    // Clear any existing watch
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    setState((prev) => ({
      ...prev,
      status: "acquiring",
      errorMessage: null,
    }));
    addEvent("acquiring", "Requesting GPS permission...");

    const options: PositionOptions = {
      enableHighAccuracy: GPS_HIGH_ACCURACY,
      timeout: GPS_TIMEOUT_MS,
      maximumAge: GPS_MAX_AGE_MS,
    };

    const onSuccess = (pos: GeolocationPosition) => {
      if (!isMountedRef.current) return;

      const position: GpsPosition = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude ?? undefined,
        speed: pos.coords.speed ?? undefined,
        heading: pos.coords.heading ?? undefined,
        timestamp: pos.timestamp,
      };

      setState((prev) => ({
        ...prev,
        status: "active",
        position,
        accuracy: pos.coords.accuracy,
        errorMessage: null,
      }));

      addEvent(
        "active",
        `Position updated — accuracy ${pos.coords.accuracy.toFixed(1)}m`,
        pos.coords.accuracy,
      );
    };

    const onError = (err: GeolocationPositionError) => {
      if (!isMountedRef.current) return;

      let status: GpsStatus = "error";
      let message = "GPS error occurred.";

      switch (err.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          status = "denied";
          message =
            "GPS permission denied. Please enable location access in your browser settings.";
          break;
        case GeolocationPositionError.POSITION_UNAVAILABLE:
          status = "error";
          message = "GPS position unavailable. Check your device GPS settings.";
          break;
        case GeolocationPositionError.TIMEOUT:
          status = "error";
          message = "GPS timed out. Move to an open area and try again.";
          break;
        default:
          status = "error";
          message = `GPS error: ${err.message}`;
      }

      setState((prev) => ({
        ...prev,
        status,
        errorMessage: message,
      }));
      addEvent(status, message);
    };

    watchIdRef.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      options,
    );
  }, [addEvent]);

  const stopTracking = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setState((prev) => ({
      ...prev,
      status: "idle",
    }));
    addEvent("idle", "GPS tracking stopped");
  }, [addEvent]);

  return {
    ...state,
    startTracking,
    stopTracking,
  };
}
