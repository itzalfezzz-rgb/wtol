import Common "../types/common";
import WorkoutTypes "../types/workout";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Nat "mo:core/Nat";
import Int "mo:core/Int";

module {
  // Helper: convert internal Workout to WorkoutSummary (no route, no gpsEvents)
  func toSummary(w : WorkoutTypes.Workout) : WorkoutTypes.WorkoutSummary {
    {
      id = w.id;
      userId = w.userId;
      workoutType = w.workoutType;
      status = w.status;
      distanceMetres = w.distanceMetres;
      durationSeconds = w.durationSeconds;
      caloriesBurned = w.caloriesBurned;
      averagePaceSecondsPerKm = w.averagePaceSecondsPerKm;
      startedAt = w.startedAt;
      completedAt = w.completedAt;
      territoryZonesClaimed = 0;
    };
  };

  // Haversine distance between two coordinates in metres
  func haversineMetres(a : Common.Coordinate, b : Common.Coordinate) : Float {
    let r : Float = 6_371_000.0;
    let pi : Float = 3.14159265358979323846;
    let toRad = func(deg : Float) : Float { deg * pi / 180.0 };
    let dLat = toRad(b.lat - a.lat);
    let dLng = toRad(b.lng - a.lng);
    let sinDLat = Float.sin(dLat / 2.0);
    let sinDLng = Float.sin(dLng / 2.0);
    let aa = sinDLat * sinDLat + Float.cos(toRad(a.lat)) * Float.cos(toRad(b.lat)) * sinDLng * sinDLng;
    let c = 2.0 * Float.arctan2(Float.sqrt(aa), Float.sqrt(1.0 - aa));
    r * c;
  };

  // Compute total route distance in metres
  func routeDistance(route : [Common.Coordinate]) : Float {
    if (route.size() < 2) { return 0.0 };
    var dist : Float = 0.0;
    var i : Nat = 1;
    while (i < route.size()) {
      dist += haversineMetres(route[i - 1], route[i]);
      i += 1;
    };
    dist;
  };

  public func startWorkout(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    nextId : Nat,
    caller : Common.UserId,
    workoutType : WorkoutTypes.WorkoutType,
    now : Common.Timestamp,
  ) : Common.WorkoutId {
    let id = nextId;
    let workout : WorkoutTypes.Workout = {
      id;
      userId = caller;
      workoutType;
      var status = #inProgress;
      var route = [];
      var distanceMetres = 0.0;
      var durationSeconds = 0;
      var caloriesBurned = null;
      var averagePaceSecondsPerKm = null;
      var elevationGainMetres = null;
      var gpsEvents = [];
      startedAt = now;
      var completedAt = null;
      var notes = null;
    };
    workouts.add(id, workout);
    id;
  };

  public func appendGpsPoint(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    caller : Common.UserId,
    workoutId : Common.WorkoutId,
    coord : Common.Coordinate,
  ) : Bool {
    switch (workouts.get(workoutId)) {
      case null { false };
      case (?w) {
        if (not (w.userId == caller)) { return false };
        if (w.status != #inProgress) { return false };
        w.route := w.route.concat([coord]);
        true;
      };
    };
  };

  public func logGpsEvent(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    caller : Common.UserId,
    workoutId : Common.WorkoutId,
    gpsEvent : Common.GpsEvent,
  ) : Bool {
    switch (workouts.get(workoutId)) {
      case null { false };
      case (?w) {
        if (not (w.userId == caller)) { return false };
        if (w.status != #inProgress) { return false };
        w.gpsEvents := w.gpsEvents.concat([gpsEvent]);
        true;
      };
    };
  };

  public func completeWorkout(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    caller : Common.UserId,
    workoutId : Common.WorkoutId,
    distanceMetres : Float,
    durationSeconds : Nat,
    caloriesBurned : ?Float,
    averagePaceSecondsPerKm : ?Float,
    elevationGainMetres : ?Float,
    now : Common.Timestamp,
  ) : Bool {
    switch (workouts.get(workoutId)) {
      case null { false };
      case (?w) {
        if (not (w.userId == caller)) { return false };
        if (w.status != #inProgress) { return false };
        let finalDist = if (distanceMetres > 0.0) {
          distanceMetres
        } else {
          routeDistance(w.route)
        };
        w.status := #completed;
        w.distanceMetres := finalDist;
        w.durationSeconds := durationSeconds;
        w.caloriesBurned := caloriesBurned;
        w.averagePaceSecondsPerKm := averagePaceSecondsPerKm;
        w.elevationGainMetres := elevationGainMetres;
        w.completedAt := ?now;
        true;
      };
    };
  };

  public func abandonWorkout(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    caller : Common.UserId,
    workoutId : Common.WorkoutId,
    now : Common.Timestamp,
  ) : Bool {
    switch (workouts.get(workoutId)) {
      case null { false };
      case (?w) {
        if (not (w.userId == caller)) { return false };
        if (w.status != #inProgress) { return false };
        w.status := #abandoned;
        w.completedAt := ?now;
        true;
      };
    };
  };

  public func getWorkout(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    workoutId : Common.WorkoutId,
  ) : ?WorkoutTypes.WorkoutSummary {
    switch (workouts.get(workoutId)) {
      case null { null };
      case (?w) { ?toSummary(w) };
    };
  };

  public func listUserWorkouts(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    userId : Common.UserId,
    limit : Nat,
    offset : Nat,
  ) : [WorkoutTypes.WorkoutSummary] {
    let userWorkouts = List.empty<WorkoutTypes.WorkoutSummary>();
    for ((_, w) in workouts.entries()) {
      if (w.userId == userId) {
        userWorkouts.add(toSummary(w));
      };
    };
    // Sort descending by startedAt (newest first)
    userWorkouts.sortInPlace(func(a, b) {
      if (a.startedAt > b.startedAt) { #less }
      else if (a.startedAt < b.startedAt) { #greater }
      else { #equal }
    });
    let total = userWorkouts.size();
    if (offset >= total) { return [] };
    let endIdx = Nat.min(offset + limit, total);
    userWorkouts.sliceToArray(Int.fromNat(offset), Int.fromNat(endIdx));
  };

  public func getWorkoutRoute(
    workouts : Map.Map<Common.WorkoutId, WorkoutTypes.Workout>,
    caller : Common.UserId,
    workoutId : Common.WorkoutId,
  ) : ?[Common.Coordinate] {
    switch (workouts.get(workoutId)) {
      case null { null };
      case (?w) {
        if (not (w.userId == caller)) { return null };
        ?w.route;
      };
    };
  };
};
