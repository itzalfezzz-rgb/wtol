import Common "common";

module {
  public type ChallengeType = { #mostTerritory; #mostDistance; #mostWorkouts; #mostTakedowns };

  public type Standing = {
    userId : Common.UserId;
    score : Float;
    rank : Nat;
  };

  public type Competition = {
    id : Common.CompetitionId;
    monthYear : Text; // "2026-04" format
    challengeType : ChallengeType;
    var standings : [Standing];
    prizes : [Text];
    var isActive : Bool;
    startsAt : Common.Timestamp;
    endsAt : Common.Timestamp;
  };

  public type CompetitionView = {
    id : Common.CompetitionId;
    monthYear : Text;
    challengeType : ChallengeType;
    standings : [Standing];
    prizes : [Text];
    isActive : Bool;
    startsAt : Common.Timestamp;
    endsAt : Common.Timestamp;
  };

  public type LeaderboardEntry = {
    userId : Common.UserId;
    username : Text;
    totalTerritoryArea : Float;
    rank : Nat;
    locationLabel : Text;
  };
};
