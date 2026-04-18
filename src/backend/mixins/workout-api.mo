import Common "../types/common";
import WorkoutTypes "../types/workout";
import WorkoutLib "../lib/workout";
import Map "mo:core/Map";
import Time "mo:core/Time";

mixin (
  workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
) {
  var nextWorkoutId : Nat = 0;
  public shared ({ caller }) func startWorkout(
    workoutType : WorkoutTypes.WorkoutType,
  ) : async Common.WorkoutId {
    let id = WorkoutLib.startWorkout(workouts, nextWorkoutId, caller, workoutType, Time.now());
    nextWorkoutId += 1;
    id;
  };

  public shared ({ caller }) func appendGpsPoint(
    workoutId : Common.WorkoutId,
    coord : Common.Coordinate,
  ) : async Bool {
    WorkoutLib.appendGpsPoint(workouts, caller, workoutId, coord);
  };

  public shared ({ caller }) func logGpsEvent(
    workoutId : Common.WorkoutId,
    gpsEvent : Common.GpsEvent,
  ) : async Bool {
    WorkoutLib.logGpsEvent(workouts, caller, workoutId, gpsEvent);
  };

  public shared ({ caller }) func completeWorkout(
    workoutId : Common.WorkoutId,
    distanceMetres : Float,
    durationSeconds : Nat,
    caloriesBurned : ?Float,
    averagePaceSecondsPerKm : ?Float,
    elevationGainMetres : ?Float,
  ) : async Bool {
    WorkoutLib.completeWorkout(
      workouts,
      caller,
      workoutId,
      distanceMetres,
      durationSeconds,
      caloriesBurned,
      averagePaceSecondsPerKm,
      elevationGainMetres,
      Time.now(),
    );
  };

  public shared ({ caller }) func abandonWorkout(workoutId : Common.WorkoutId) : async Bool {
    WorkoutLib.abandonWorkout(workouts, caller, workoutId, Time.now());
  };

  public query func getWorkout(workoutId : Common.WorkoutId) : async ?WorkoutTypes.WorkoutSummary {
    WorkoutLib.getWorkout(workouts, workoutId);
  };

  public query ({ caller }) func getMyWorkouts(limit : Nat, offset : Nat) : async [WorkoutTypes.WorkoutSummary] {
    WorkoutLib.listUserWorkouts(workouts, caller, limit, offset);
  };

  public query func getUserWorkouts(
    userId : Common.UserId,
    limit : Nat,
    offset : Nat,
  ) : async [WorkoutTypes.WorkoutSummary] {
    WorkoutLib.listUserWorkouts(workouts, userId, limit, offset);
  };

  public query ({ caller }) func getWorkoutRoute(workoutId : Common.WorkoutId) : async ?[Common.Coordinate] {
    WorkoutLib.getWorkoutRoute(workouts, caller, workoutId);
  };
};
