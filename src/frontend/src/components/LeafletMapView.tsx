/**
 * LeafletMapView — OpenStreetMap fallback using react-leaflet.
 * Renders when VITE_GOOGLE_MAPS_API_KEY is absent or fails to load.
 * Uses a dark custom tile layer + gold polygon overlays.
 */

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, Maximize2, Minus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import type { GpsPosition, ZoneInfo } from "../lib/types";

// Fix Leaflet icon paths in Vite builds
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ── Zone color ───────────────────────────────────────────────────────────────

function getZoneStyle(zone: ZoneInfo): L.PathOptions {
  if (zone.claimedAt) {
    return {
      fillColor: "#c8a84b",
      fillOpacity: 0.22,
      color: "#c8a84b",
      opacity: 0.9,
      weight: 2,
    };
  }
  return {
    fillColor: "#3a3020",
    fillOpacity: 0.1,
    color: "#6b5b3e",
    opacity: 0.5,
    weight: 1,
    dashArray: "5,5",
  };
}

// ── Gold pulsing GPS marker ──────────────────────────────────────────────────

function createGoldMarker(): L.DivIcon {
  return L.divIcon({
    className: "",
    html: `
      <div style="position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;">
        <div style="
          position:absolute;width:36px;height:36px;border-radius:50%;
          background:oklch(0.68 0.18 70 / 0.15);
          animation:gps-pulse 2.4s ease-in-out infinite;
        "></div>
        <div style="
          position:absolute;width:22px;height:22px;border-radius:50%;
          background:oklch(0.68 0.18 70 / 0.25);
          border:1px solid oklch(0.68 0.18 70 / 0.5);
        "></div>
        <div style="
          width:12px;height:12px;border-radius:50%;
          background:#c8a84b;
          border:2px solid rgba(249,246,240,0.9);
          box-shadow:0 0 10px rgba(200,168,75,0.8);
          position:relative;z-index:1;
        "></div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
}

// ── Component ────────────────────────────────────────────────────────────────

interface LeafletMapViewProps {
  zones: ZoneInfo[];
  userPosition: GpsPosition | null;
  routePoints: GpsPosition[];
  center: { lat: number; lng: number };
  onZoneClick: (zone: ZoneInfo) => void;
  onLocateMe: () => void;
}

export function LeafletMapView({
  zones,
  userPosition,
  routePoints,
  center,
  onZoneClick,
  onLocateMe,
}: LeafletMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const polygonsRef = useRef<L.Polygon[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const centerLat = center.lat;
  const centerLng = center.lng;

  // Initialize map once — intentionally ignoring center changes after mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: map initializes once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 14,
      zoomControl: false,
      attributionControl: true,
    });

    // Dark CartoDB tiles
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      },
    ).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Draw zone polygons
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    for (const p of polygonsRef.current) p.removeFrom(map);
    polygonsRef.current = [];

    for (const zone of zones) {
      const latlngs = zone.polygon.map((c) => [c.lat, c.lng] as L.LatLngTuple);
      const poly = L.polygon(latlngs, getZoneStyle(zone)).addTo(map);

      // Zone label
      const cx =
        zone.polygon.reduce((s, c) => s + c.lat, 0) / zone.polygon.length;
      const cy =
        zone.polygon.reduce((s, c) => s + c.lng, 0) / zone.polygon.length;
      const icon = L.divIcon({
        className: "",
        html: `<span style="
          color:${zone.claimedAt ? "#c8a84b" : "#6b5b3e"};
          font-size:10px;font-weight:bold;font-family:monospace;
          white-space:nowrap;
          text-shadow:0 1px 3px rgba(0,0,0,0.8);
        ">${zone.name.split(" ")[0].toUpperCase()}</span>`,
        iconAnchor: [0, 0],
      });
      L.marker([cx, cy], { icon, interactive: false }).addTo(map);

      poly.on("click", () => onZoneClick(zone));
      polygonsRef.current.push(poly);
    }
  }, [zones, onZoneClick]);

  // Draw live route
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (polylineRef.current) polylineRef.current.removeFrom(map);
    if (routePoints.length > 1) {
      polylineRef.current = L.polyline(
        routePoints.map((p) => [p.lat, p.lng] as L.LatLngTuple),
        { color: "#c8a84b", weight: 3, opacity: 0.9 },
      ).addTo(map);
    }
  }, [routePoints]);

  // Update GPS marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (markerRef.current) markerRef.current.removeFrom(map);
    if (userPosition) {
      markerRef.current = L.marker([userPosition.lat, userPosition.lng], {
        icon: createGoldMarker(),
        zIndexOffset: 1000,
      }).addTo(map);
    }
  }, [userPosition]);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-full"
        style={{ minHeight: "320px" }}
      />

      {/* Glass zoom controls */}
      <div
        data-ocid="map.controls.panel"
        className="absolute top-3 right-3 flex flex-col gap-1.5 z-[1000]"
      >
        {[
          {
            icon: <Plus size={16} />,
            onClick: () => mapRef.current?.zoomIn(),
            ocid: "map.zoom_in_button",
            label: "Zoom in",
          },
          {
            icon: <Minus size={16} />,
            onClick: () => mapRef.current?.zoomOut(),
            ocid: "map.zoom_out_button",
            label: "Zoom out",
          },
          {
            icon: <Maximize2 size={14} />,
            onClick: () => mapRef.current?.setZoom(14),
            ocid: "map.reset_zoom_button",
            label: "Reset zoom",
          },
        ].map((ctrl) => (
          <button
            key={ctrl.label}
            type="button"
            data-ocid={ctrl.ocid}
            onClick={ctrl.onClick}
            aria-label={ctrl.label}
            className="w-9 h-9 glass-card rounded-xl flex items-center justify-center text-foreground transition-smooth hover:border-primary/40 shadow-md"
          >
            {ctrl.icon}
          </button>
        ))}

        <button
          type="button"
          data-ocid="map.center_on_me_button"
          onClick={() => {
            onLocateMe();
            if (userPosition && mapRef.current) {
              mapRef.current.setView([userPosition.lat, userPosition.lng], 15);
            }
          }}
          aria-label="Center on my location"
          className="w-9 h-9 bg-primary/90 border border-primary/60 rounded-xl flex items-center justify-center text-primary-foreground transition-smooth hover:bg-primary shadow-md"
        >
          <Crosshair size={16} />
        </button>
      </div>

      {/* Location badge */}
      <div className="absolute top-3 left-3 z-[1000]">
        <div className="glass-card px-2.5 py-1.5 text-xs text-primary font-mono rounded-lg">
          📍 San Francisco, CA
        </div>
      </div>

      {/* OSM fallback badge */}
      <div className="absolute bottom-6 left-3 z-[1000]">
        <div className="glass-card px-2 py-1 text-xs text-muted-foreground font-mono rounded">
          OpenStreetMap • Add VITE_GOOGLE_MAPS_API_KEY for Google Maps
        </div>
      </div>
    </div>
  );
}
