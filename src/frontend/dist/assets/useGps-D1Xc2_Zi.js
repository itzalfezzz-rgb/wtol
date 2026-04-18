import { c as createLucideIcon, r as reactExports } from "./index-DZE4_1XK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const CircleCheck = createLucideIcon("circle-check", __iconNode);
const MAX_EVENTS = 50;
const GPS_TIMEOUT_MS = 15e3;
const GPS_MAX_AGE_MS = 5e3;
const GPS_HIGH_ACCURACY = true;
function useGps() {
  const [state, setState] = reactExports.useState({
    status: "idle",
    position: null,
    accuracy: null,
    errorMessage: null,
    gpsEvents: []
  });
  const watchIdRef = reactExports.useRef(null);
  const isMountedRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);
  const addEvent = reactExports.useCallback(
    (type, message, accuracy) => {
      const event = {
        type,
        message,
        timestamp: Date.now(),
        accuracy
      };
      setState((prev) => ({
        ...prev,
        gpsEvents: [event, ...prev.gpsEvents].slice(0, MAX_EVENTS)
      }));
    },
    []
  );
  const startTracking = reactExports.useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        status: "error",
        errorMessage: "Geolocation is not supported by this browser."
      }));
      addEvent("error", "Geolocation not supported");
      return;
    }
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }
    setState((prev) => ({
      ...prev,
      status: "acquiring",
      errorMessage: null
    }));
    addEvent("acquiring", "Requesting GPS permission...");
    const options = {
      enableHighAccuracy: GPS_HIGH_ACCURACY,
      timeout: GPS_TIMEOUT_MS,
      maximumAge: GPS_MAX_AGE_MS
    };
    const onSuccess = (pos) => {
      if (!isMountedRef.current) return;
      const position = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        altitude: pos.coords.altitude ?? void 0,
        speed: pos.coords.speed ?? void 0,
        heading: pos.coords.heading ?? void 0,
        timestamp: pos.timestamp
      };
      setState((prev) => ({
        ...prev,
        status: "active",
        position,
        accuracy: pos.coords.accuracy,
        errorMessage: null
      }));
      addEvent(
        "active",
        `Position updated — accuracy ${pos.coords.accuracy.toFixed(1)}m`,
        pos.coords.accuracy
      );
    };
    const onError = (err) => {
      if (!isMountedRef.current) return;
      let status = "error";
      let message = "GPS error occurred.";
      switch (err.code) {
        case GeolocationPositionError.PERMISSION_DENIED:
          status = "denied";
          message = "GPS permission denied. Please enable location access in your browser settings.";
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
        errorMessage: message
      }));
      addEvent(status, message);
    };
    watchIdRef.current = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      options
    );
  }, [addEvent]);
  const stopTracking = reactExports.useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setState((prev) => ({
      ...prev,
      status: "idle"
    }));
    addEvent("idle", "GPS tracking stopped");
  }, [addEvent]);
  return {
    ...state,
    startTracking,
    stopTracking
  };
}
export {
  CircleCheck as C,
  useGps as u
};
