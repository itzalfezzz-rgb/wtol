import Common "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";
import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
  users : Map.Map<Common.UserId, UserTypes.User>,
  follows : List.List<UserTypes.FollowRelation>,
) {
  public shared ({ caller }) func createProfile(
    username : Text,
    displayName : Text,
    fitnessLevel : UserTypes.FitnessLevel,
    locationLabel : Text,
    weeklyAvailabilityHours : Nat,
  ) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.createProfile(
      users,
      caller,
      username,
      displayName,
      fitnessLevel,
      locationLabel,
      weeklyAvailabilityHours,
      Time.now(),
    );
  };

  public query func getProfile(userId : Common.UserId) : async ?UserTypes.UserProfile {
    UserLib.getProfile(users, follows, userId);
  };

  public query ({ caller }) func getMyProfile() : async ?UserTypes.UserProfile {
    UserLib.getProfile(users, follows, caller);
  };

  public shared ({ caller }) func updateProfile(
    displayName : ?Text,
    fitnessLevel : ?UserTypes.FitnessLevel,
    locationLabel : ?Text,
    weeklyAvailabilityHours : ?Nat,
    bio : ?Text,
    avatarUrl : ?Text,
  ) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.updateProfile(users, caller, displayName, fitnessLevel, locationLabel, weeklyAvailabilityHours, bio, avatarUrl);
  };

  public shared ({ caller }) func follow(target : Common.UserId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.follow(users, follows, caller, target, Time.now());
  };

  public shared ({ caller }) func unfollow(target : Common.UserId) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    UserLib.unfollow(follows, caller, target);
  };

  public query func getFollowers(userId : Common.UserId) : async [Common.UserId] {
    UserLib.getFollowers(follows, userId);
  };

  public query func getFollowing(userId : Common.UserId) : async [Common.UserId] {
    UserLib.getFollowing(follows, userId);
  };
};
