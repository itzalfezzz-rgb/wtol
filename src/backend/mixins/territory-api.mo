import Common "../types/common";
import TerritoryTypes "../types/territory";
import UserTypes "../types/user";
import WorkoutTypes "../types/workout";
import TerritoryLib "../lib/territory";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  zones : Map.Map<Common.ZoneId, TerritoryTypes.Zone>,
  users : Map.Map<Common.UserId, UserTypes.User>,
  workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
) {
  var nextZoneId : Nat = 0;
  public shared ({ caller }) func createZone(
    name : Text,
    polygon : [Common.Coordinate],
    areaKm2 : Float,
  ) : async Common.ZoneId {
    let id = TerritoryLib.createZone(zones, nextZoneId, name, polygon, areaKm2);
    nextZoneId += 1;
    id;
  };

  public shared ({ caller }) func claimZone(
    zoneId : Common.ZoneId,
    workoutId : Common.WorkoutId,
  ) : async Bool {
    TerritoryLib.claimZone(zones, users, workouts, zoneId, caller, workoutId, Time.now());
  };

  public query func getZone(zoneId : Common.ZoneId) : async ?TerritoryTypes.ZoneInfo {
    TerritoryLib.getZone(zones, zoneId);
  };

  public query func listZones(ownerFilter : ?Common.UserId) : async [TerritoryTypes.ZoneInfo] {
    TerritoryLib.listZones(zones, ownerFilter);
  };

  public query func getZoneHistory(zoneId : Common.ZoneId) : async [TerritoryTypes.TakeoverEvent] {
    TerritoryLib.getZoneHistory(zones, zoneId);
  };

  public query func getZonesInBounds(
    swLat : Float,
    swLng : Float,
    neLat : Float,
    neLng : Float,
  ) : async [TerritoryTypes.ZoneInfo] {
    TerritoryLib.getZonesInBounds(zones, swLat, swLng, neLat, neLng);
  };

  public query func getZoneLeaderboard() : async [(Common.UserId, Float)] {
    TerritoryLib.getZoneLeaderboard(zones, users);
  };
};
