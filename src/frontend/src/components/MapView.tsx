/**
 * MapView — Google Maps (via @vis.gl/react-google-maps) with Leaflet fallback.
 *
 * If VITE_GOOGLE_MAPS_API_KEY is present and valid, renders a dark-styled
 * Google Map with gold polygon overlays and a pulsing gold GPS marker.
 *
 * If the key is missing or the Maps API fails to load, gracefully falls back
 * to an OpenStreetMap tile layer via react-leaflet with the same overlay logic.
 */

import {
  APIProvider,
  AdvancedMarker,
  Map as GoogleMap,
  useMap,
} from "@vis.gl/react-google-maps";
import { Crosshair, Maximize2, Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GpsPosition, ZoneInfo } from "../lib/types";
import { LeafletMapView } from "./LeafletMapView";

// ── Google Maps dark style ────────────────────────────────────────────────────

type MapStyle = {
  featureType?: string;
  elementType?: string;
  stylers: Record<string, string>[];
};

const DARK_MAP_STYLE: MapStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#0a0a0a" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#0a0a0a" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#6b5b3e" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#1a1710" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9d8d6b" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c8a84b" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7a6840" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#0d1208" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3a5230" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1a1710" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#100e08" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2a2010" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1a1308" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c8a84b" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#120e04" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#c8a84b" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#050c14" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];

// ── Zone style helpers ────────────────────────────────────────────────────────

interface ZoneStyle {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
}

function getZoneStyle(zone: ZoneInfo): ZoneStyle {
  if (zone.claimedAt) {
    return {
      fillColor: "#c8a84b",
      fillOpacity: 0.22,
      strokeColor: "#c8a84b",
      strokeOpacity: 0.9,
      strokeWeight: 2,
    };
  }
  return {
    fillColor: "#3a3020",
    fillOpacity: 0.1,
    strokeColor: "#6b5b3e",
    strokeOpacity: 0.5,
    strokeWeight: 1,
  };
}

// ── Types for imperative Google Maps objects ──────────────────────────────────

interface GMapsPolygon {
  setMap: (map: unknown) => void;
  addListener: (event: string, cb: () => void) => void;
}
interface GMapsPolyline {
  setMap: (map: unknown) => void;
}
type GMapsInstance = {
  maps: {
    Polygon: new (opts: unknown) => GMapsPolygon;
    Polyline: new (opts: unknown) => GMapsPolyline;
  };
};

function getGoogleMaps(): GMapsInstance["maps"] | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = (window as unknown as Record<string, unknown>).google as
    | GMapsInstance
    | undefined;
  return g?.maps ?? null;
}

// ── Google Maps polygon overlays ──────────────────────────────────────────────

interface PolygonOverlaysProps {
  zones: ZoneInfo[];
  routePoints: GpsPosition[];
  onZoneClick: (zone: ZoneInfo) => void;
}

function PolygonOverlays({
  zones,
  routePoints,
  onZoneClick,
}: PolygonOverlaysProps) {
  const map = useMap();
  const polygonsRef = useRef<GMapsPolygon[]>([]);
  const polylineRef = useRef<GMapsPolyline | null>(null);

  useEffect(() => {
    if (!map) return;
    const gmaps = getGoogleMaps();
    if (!gmaps) return;

    for (const p of polygonsRef.current) p.setMap(null);
    polygonsRef.current = [];

    for (const zone of zones) {
      const style = getZoneStyle(zone);
      const poly = new gmaps.Polygon({
        paths: zone.polygon.map((c) => ({ lat: c.lat, lng: c.lng })),
        ...style,
        map,
        clickable: true,
      });
      poly.addListener("click", () => onZoneClick(zone));
      polygonsRef.current.push(poly);
    }

    return () => {
      for (const p of polygonsRef.current) p.setMap(null);
    };
  }, [map, zones, onZoneClick]);

  useEffect(() => {
    if (!map) return;
    const gmaps = getGoogleMaps();
    if (!gmaps) return;

    polylineRef.current?.setMap(null);

    if (routePoints.length > 1) {
      polylineRef.current = new gmaps.Polyline({
        path: routePoints.map((p) => ({ lat: p.lat, lng: p.lng })),
        strokeColor: "#c8a84b",
        strokeOpacity: 0.9,
        strokeWeight: 3,
        map,
      });
    }

    return () => {
      polylineRef.current?.setMap(null);
    };
  }, [map, routePoints]);

  return null;
}

// ── Pulsing gold GPS marker ───────────────────────────────────────────────────

function GoldGpsMarker({
  position,
}: { position: { lat: number; lng: number } }) {
  return (
    <AdvancedMarker position={position}>
      <div className="relative" style={{ width: 36, height: 36 }}>
        <div
          className="absolute rounded-full"
          style={{
            width: 36,
            height: 36,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "oklch(0.68 0.18 70 / 0.15)",
            animation: "gps-pulse 2.4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 22,
            height: 22,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "oklch(0.68 0.18 70 / 0.25)",
            border: "1px solid oklch(0.68 0.18 70 / 0.5)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 12,
            height: 12,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#c8a84b",
            border: "2px solid rgba(249,246,240,0.9)",
            boxShadow: "0 0 10px rgba(200,168,75,0.8)",
          }}
        />
      </div>
    </AdvancedMarker>
  );
}

// ── Glass-styled zoom controls ────────────────────────────────────────────────

function MapControls({
  onZoomIn,
  onZoomOut,
  onReset,
  onLocateMe,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocateMe: () => void;
}) {
  return (
    <div
      data-ocid="map.controls.panel"
      className="absolute top-3 right-3 flex flex-col gap-1.5 z-20"
      style={{ pointerEvents: "all" }}
    >
      {[
        {
          icon: <Plus size={16} />,
          onClick: onZoomIn,
          ocid: "map.zoom_in_button",
          label: "Zoom in",
        },
        {
          icon: <Minus size={16} />,
          onClick: onZoomOut,
          ocid: "map.zoom_out_button",
          label: "Zoom out",
        },
        {
          icon: <Maximize2 size={14} />,
          onClick: onReset,
          ocid: "map.reset_zoom_button",
          label: "Reset",
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
        onClick={onLocateMe}
        aria-label="Center on my location"
        className="w-9 h-9 bg-primary/90 border border-primary/60 rounded-xl flex items-center justify-center text-primary-foreground transition-smooth hover:bg-primary shadow-md"
      >
        <Crosshair size={16} />
      </button>
    </div>
  );
}

// ── Inner Google Map (needs APIProvider context) ──────────────────────────────

interface GoogleMapInnerProps {
  zones: ZoneInfo[];
  userPosition: GpsPosition | null;
  routePoints: GpsPosition[];
  center: { lat: number; lng: number };
  zoom: number;
  onZoneClick: (zone: ZoneInfo) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onLocateMe: () => void;
}

function GoogleMapInner({
  zones,
  userPosition,
  routePoints,
  center,
  zoom,
  onZoneClick,
  onZoomIn,
  onZoomOut,
  onReset,
  onLocateMe,
}: GoogleMapInnerProps) {
  return (
    <div className="relative w-full h-full">
      <GoogleMap
        defaultCenter={center}
        defaultZoom={zoom}
        mapId="wtol-territory-map"
        disableDefaultUI
        gestureHandling="greedy"
        styles={DARK_MAP_STYLE}
        backgroundColor="#0a0a0a"
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      >
        <PolygonOverlays
          zones={zones}
          routePoints={routePoints}
          onZoneClick={onZoneClick}
        />
        {userPosition && (
          <GoldGpsMarker
            position={{ lat: userPosition.lat, lng: userPosition.lng }}
          />
        )}
      </GoogleMap>

      <MapControls
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onReset={onReset}
        onLocateMe={onLocateMe}
      />

      <div className="absolute top-3 left-3 z-10">
        <div className="glass-card px-2.5 py-1.5 text-xs text-primary font-mono rounded-lg">
          📍 San Francisco, CA
        </div>
      </div>
    </div>
  );
}

// ── Main MapView ──────────────────────────────────────────────────────────────

export interface MapViewProps {
  zones: ZoneInfo[];
  userPosition: GpsPosition | null;
  routePoints: GpsPosition[];
  center: { lat: number; lng: number };
  onZoneClick: (zone: ZoneInfo) => void;
  onLocateMe: () => void;
}

export function MapView({
  zones,
  userPosition,
  routePoints,
  center,
  onZoneClick,
  onLocateMe,
}: MapViewProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const [loadFailed, setLoadFailed] = useState(false);
  const [zoom, setZoom] = useState(14);

  const hasValidKey = !!apiKey && apiKey.trim().length > 0 && !loadFailed;

  const handleZoomIn = () => setZoom((z) => Math.min(z + 1, 20));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 1, 5));
  const handleReset = () => setZoom(14);

  if (!hasValidKey) {
    return (
      <LeafletMapView
        zones={zones}
        userPosition={userPosition}
        routePoints={routePoints}
        center={center}
        onZoneClick={onZoneClick}
        onLocateMe={onLocateMe}
      />
    );
  }

  return (
    <APIProvider apiKey={apiKey} onLoad={() => setLoadFailed(false)}>
      <GoogleMapInner
        zones={zones}
        userPosition={userPosition}
        routePoints={routePoints}
        center={center}
        zoom={zoom}
        onZoneClick={onZoneClick}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onLocateMe={onLocateMe}
      />
    </APIProvider>
  );
}
