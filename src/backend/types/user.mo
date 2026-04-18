import Common "common";

module {
  public type FitnessLevel = { #beginner; #intermediate; #advanced; #elite };

  public type User = {
    id : Common.UserId;
    var username : Text;
    var displayName : Text;
    var fitnessLevel : FitnessLevel;
    var locationLabel : Text; // city / region label for display
    var weeklyAvailabilityHours : Nat;
    var totalTerritoryArea : Float; // sum of all owned zone areas in km²
    var joinedAt : Common.Timestamp;
    var avatarUrl : ?Text;
    var bio : ?Text;
  };

  public type UserProfile = {
    id : Common.UserId;
    username : Text;
    displayName : Text;
    fitnessLevel : FitnessLevel;
    locationLabel : Text;
    weeklyAvailabilityHours : Nat;
    totalTerritoryArea : Float;
    joinedAt : Common.Timestamp;
    avatarUrl : ?Text;
    bio : ?Text;
    followersCount : Nat;
    followingCount : Nat;
  };

  public type FollowRelation = {
    follower : Common.UserId;
    following : Common.UserId;
    createdAt : Common.Timestamp;
  };
};
