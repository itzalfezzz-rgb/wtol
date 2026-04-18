import Common "../types/common";
import TerritoryTypes "../types/territory";
import UserTypes "../types/user";
import WorkoutTypes "../types/workout";
import Map "mo:core/Map";
import List "mo:core/List";

module {
  // Convert mutable Zone to immutable ZoneInfo DTO
  func toZoneInfo(z : TerritoryTypes.Zone) : TerritoryTypes.ZoneInfo {
    {
      id = z.id;
      name = z.name;
      polygon = z.polygon;
      owner = z.owner;
      claimedAt = z.claimedAt;
      workoutId = z.workoutId;
      areaKm2 = z.areaKm2;
      takeoverHistory = z.takeoverHistory;
    };
  };

  // Point-in-polygon test using ray casting algorithm
  func pointInPolygon(point : Common.Coordinate, polygon : [Common.Coordinate]) : Bool {
    let n = polygon.size();
    if (n < 3) { return false };
    var inside = false;
    var j = n - 1;
    var i = 0;
    while (i < n) {
      let pi = polygon[i];
      let pj = polygon[j];
      let intersects = ((pi.lng > point.lng) != (pj.lng > point.lng)) and
        (point.lat < (pj.lat - pi.lat) * (point.lng - pi.lng) / (pj.lng - pi.lng) + pi.lat);
      if (intersects) { inside := not inside };
      j := i;
      i += 1;
    };
    inside;
  };

  // Check whether any coordinate in the route falls inside the zone polygon
  func routeIntersectsZone(route : [Common.Coordinate], polygon : [Common.Coordinate]) : Bool {
    for (coord in route.values()) {
      if (pointInPolygon(coord, polygon)) { return true };
    };
    false;
  };

  public func createZone(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    nextId : Nat,
    name : Text,
    polygon : [Common.Coordinate],
    areaKm2 : Float,
  ) : Common.ZoneId {
    let id = nextId;
    let zone : TerritoryTypes.Zone = {
      id;
      var name;
      polygon;
      var owner = null;
      var claimedAt = null;
      var workoutId = null;
      var areaKm2;
      var takeoverHistory = [];
    };
    zones.add(id, zone);
    id;
  };

  public func claimZone(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    zoneId : Common.ZoneId,
    newOwner : Common.UserId,
    workoutId : Common.WorkoutId,
    now : Common.Timestamp,
  ) : Bool {
    let zone = switch (zones.get(zoneId)) {
      case null { return false };
      case (?z) { z };
    };
    let workout = switch (workouts.get(workoutId)) {
      case null { return false };
      case (?w) { w };
    };
    // Verify the workout belongs to the caller
    if (not (workout.userId == newOwner)) { return false };
    // Verify workout is completed
    if (workout.status != #completed) { return false };
    // Check route intersects zone polygon
    if (not routeIntersectsZone(workout.route, zone.polygon)) { return false };

    let previousOwner = zone.owner;
    let event : TerritoryTypes.TakeoverEvent = {
      newOwner;
      previousOwner;
      workoutId;
      takenAt = now;
    };

    // Update zone ownership
    zone.owner := ?newOwner;
    zone.claimedAt := ?now;
    zone.workoutId := ?workoutId;
    zone.takeoverHistory := zone.takeoverHistory.concat([event]);

    // Update new owner's totalTerritoryArea
    switch (users.get(newOwner)) {
      case (?user) {
        user.totalTerritoryArea += zone.areaKm2;
      };
      case null {};
    };

    // Subtract area from previous owner
    switch (previousOwner) {
      case (?prev) {
        if (not (prev == newOwner)) {
          switch (users.get(prev)) {
            case (?prevUser) {
              let newArea = prevUser.totalTerritoryArea - zone.areaKm2;
              prevUser.totalTerritoryArea := if (newArea < 0.0) { 0.0 } else { newArea };
            };
            case null {};
          };
        };
      };
      case null {};
    };

    true;
  };

  public func getZone(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    zoneId : Common.ZoneId,
  ) : ?TerritoryTypes.ZoneInfo {
    switch (zones.get(zoneId)) {
      case null { null };
      case (?z) { ?toZoneInfo(z) };
    };
  };

  public func listZones(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    ownerFilter : ?Common.UserId,
  ) : [TerritoryTypes.ZoneInfo] {
    let result = List.empty<TerritoryTypes.ZoneInfo>();
    for ((_, z) in zones.entries()) {
      let shouldInclude = switch (ownerFilter) {
        case null { true };
        case (?ownerId) {
          switch (z.owner) {
            case null { false };
            case (?o) { o == ownerId };
          };
        };
      };
      if (shouldInclude) { result.add(toZoneInfo(z)) };
    };
    result.toArray();
  };

  public func getZoneHistory(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    zoneId : Common.ZoneId,
  ) : [TerritoryTypes.TakeoverEvent] {
    switch (zones.get(zoneId)) {
      case null { [] };
      case (?z) { z.takeoverHistory };
    };
  };

  public func getZonesInBounds(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    swLat : Float,
    swLng : Float,
    neLat : Float,
    neLng : Float,
  ) : [TerritoryTypes.ZoneInfo] {
    let result = List.empty<TerritoryTypes.ZoneInfo>();
    for ((_, z) in zones.entries()) {
      let inBounds = z.polygon.any(func(pt : Common.Coordinate) : Bool {
        pt.lat >= swLat and pt.lat <= neLat and pt.lng >= swLng and pt.lng <= neLng
      });
      if (inBounds) { result.add(toZoneInfo(z)) };
    };
    result.toArray();
  };

  public func getZoneLeaderboard(
    zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
    users : Map.Map<Common.UserId, UserTypes.User>,
  ) : [(Common.UserId, Float)] {
    // Aggregate owned area per user directly from user profiles
    let entries = List.empty<(Common.UserId, Float)>();
    for ((uid, user) in users.entries()) {
      if (user.totalTerritoryArea > 0.0) {
        entries.add((uid, user.totalTerritoryArea));
      };
    };
    // Sort descending by area
    entries.sortInPlace(func(a, b) {
      if (a.1 > b.1) { #less }
      else if (a.1 < b.1) { #greater }
      else { #equal }
    });
    entries.toArray();
  };
};
