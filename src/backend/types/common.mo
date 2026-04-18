module {
  public type UserId = Principal;
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type ZoneId = Nat;
  public type WorkoutId = Nat;
  public type PostId = Nat;
  public type CompetitionId = Nat;
  public type CoachMessageId = Nat;

  public type Coordinate = {
    lat : Float;
    lng : Float;
  };

  public type GpsEvent = {
    timestamp : Timestamp;
    eventType : Text; // "acquire", "loss", "error", "resume"
    message : Text;
    accuracy : ?Float; // metres
  };
};
