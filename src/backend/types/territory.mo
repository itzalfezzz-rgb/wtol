import Common "common";

module {
  public type TakeoverEvent = {
    newOwner : Common.UserId;
    previousOwner : ?Common.UserId;
    workoutId : Common.WorkoutId;
    takenAt : Common.Timestamp;
  };

  public type Zone = {
    id : Common.ZoneId;
    var name : Text;
    polygon : [Common.Coordinate]; // closed polygon vertices
    var owner : ?Common.UserId;
    var claimedAt : ?Common.Timestamp;
    var workoutId : ?Common.WorkoutId; // workout that last claimed this zone
    var areaKm2 : Float;
    var takeoverHistory : [TakeoverEvent];
  };

  public type ZoneInfo = {
    id : Common.ZoneId;
    name : Text;
    polygon : [Common.Coordinate];
    owner : ?Common.UserId;
    claimedAt : ?Common.Timestamp;
    workoutId : ?Common.WorkoutId;
    areaKm2 : Float;
    takeoverHistory : [TakeoverEvent];
  };
};
