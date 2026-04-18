import Common "common";

module {
  public type WorkoutType = { #run; #cycling; #strength; #hiit; #yoga; #walking; #other };

  public type WorkoutStatus = { #inProgress; #completed; #abandoned };

  public type Workout = {
    id : Common.WorkoutId;
    userId : Common.UserId;
    workoutType : WorkoutType;
    var status : WorkoutStatus;
    var route : [Common.Coordinate]; // ordered GPS path
    var distanceMetres : Float;
    var durationSeconds : Nat;
    var caloriesBurned : ?Float;
    var averagePaceSecondsPerKm : ?Float;
    var elevationGainMetres : ?Float;
    var gpsEvents : [Common.GpsEvent]; // reliability log
    startedAt : Common.Timestamp;
    var completedAt : ?Common.Timestamp;
    var notes : ?Text;
  };

  public type WorkoutSummary = {
    id : Common.WorkoutId;
    userId : Common.UserId;
    workoutType : WorkoutType;
    status : WorkoutStatus;
    distanceMetres : Float;
    durationSeconds : Nat;
    caloriesBurned : ?Float;
    averagePaceSecondsPerKm : ?Float;
    startedAt : Common.Timestamp;
    completedAt : ?Common.Timestamp;
    territoryZonesClaimed : Nat;
  };
};
