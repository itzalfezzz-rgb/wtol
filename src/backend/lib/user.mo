import Common "../types/common";
import UserTypes "../types/user";
import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

module {
  // ---------- profile management ----------

  public func createProfile(
    users : Map.Map<Common.UserId, UserTypes.User>,
    caller : Common.UserId,
    username : Text,
    displayName : Text,
    fitnessLevel : UserTypes.FitnessLevel,
    locationLabel : Text,
    weeklyAvailabilityHours : Nat,
    now : Common.Timestamp,
  ) : Bool {
    // Reject anonymous principals
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: must be logged in");
    };
    // Reject duplicate registrations
    if (users.containsKey(caller)) {
      return false;
    };
    // Reject duplicate usernames
    switch (users.values().find(func(u : UserTypes.User) : Bool { u.username == username })) {
      case (?_) { return false };
      case null {};
    };
    let user : UserTypes.User = {
      id = caller;
      var username = username;
      var displayName = displayName;
      var fitnessLevel = fitnessLevel;
      var locationLabel = locationLabel;
      var weeklyAvailabilityHours = weeklyAvailabilityHours;
      var totalTerritoryArea = 0.0;
      var joinedAt = now;
      var avatarUrl = null;
      var bio = null;
    };
    users.add(caller, user);
    true;
  };

  public func getProfile(
    users : Map.Map<Common.UserId, UserTypes.User>,
    follows : List.List<UserTypes.FollowRelation>,
    userId : Common.UserId,
  ) : ?UserTypes.UserProfile {
    switch (users.get(userId)) {
      case null null;
      case (?u) {
        let followersCount = follows.filter(func(r : UserTypes.FollowRelation) : Bool {
          Principal.equal(r.following, userId)
        }).size();
        let followingCount = follows.filter(func(r : UserTypes.FollowRelation) : Bool {
          Principal.equal(r.follower, userId)
        }).size();
        ?{
          id = u.id;
          username = u.username;
          displayName = u.displayName;
          fitnessLevel = u.fitnessLevel;
          locationLabel = u.locationLabel;
          weeklyAvailabilityHours = u.weeklyAvailabilityHours;
          totalTerritoryArea = u.totalTerritoryArea;
          joinedAt = u.joinedAt;
          avatarUrl = u.avatarUrl;
          bio = u.bio;
          followersCount;
          followingCount;
        };
      };
    };
  };

  public func updateProfile(
    users : Map.Map<Common.UserId, UserTypes.User>,
    caller : Common.UserId,
    displayName : ?Text,
    fitnessLevel : ?UserTypes.FitnessLevel,
    locationLabel : ?Text,
    weeklyAvailabilityHours : ?Nat,
    bio : ?Text,
    avatarUrl : ?Text,
  ) : Bool {
    switch (users.get(caller)) {
      case null false;
      case (?u) {
        switch (displayName) {
          case (?v) { u.displayName := v };
          case null {};
        };
        switch (fitnessLevel) {
          case (?v) { u.fitnessLevel := v };
          case null {};
        };
        switch (locationLabel) {
          case (?v) { u.locationLabel := v };
          case null {};
        };
        switch (weeklyAvailabilityHours) {
          case (?v) { u.weeklyAvailabilityHours := v };
          case null {};
        };
        switch (bio) {
          case (?v) { u.bio := ?v };
          case null {};
        };
        switch (avatarUrl) {
          case (?v) { u.avatarUrl := ?v };
          case null {};
        };
        true;
      };
    };
  };

  // ---------- follow / unfollow ----------

  public func follow(
    users : Map.Map<Common.UserId, UserTypes.User>,
    follows : List.List<UserTypes.FollowRelation>,
    caller : Common.UserId,
    target : Common.UserId,
    now : Common.Timestamp,
  ) : Bool {
    // caller must be registered
    if (not users.containsKey(caller)) {
      Runtime.trap("Unauthorized: must be a registered user");
    };
    // target must exist
    if (not users.containsKey(target)) {
      return false;
    };
    // cannot follow yourself
    if (Principal.equal(caller, target)) {
      return false;
    };
    // prevent duplicate follows
    let existing = follows.find(func(r : UserTypes.FollowRelation) : Bool {
      Principal.equal(r.follower, caller) and Principal.equal(r.following, target)
    });
    if (existing != null) {
      return false;
    };
    follows.add({ follower = caller; following = target; createdAt = now });
    true;
  };

  public func unfollow(
    follows : List.List<UserTypes.FollowRelation>,
    caller : Common.UserId,
    target : Common.UserId,
  ) : Bool {
    let sizeBefore = follows.size();
    let remaining = follows.filter(func(r : UserTypes.FollowRelation) : Bool {
      not (Principal.equal(r.follower, caller) and Principal.equal(r.following, target))
    });
    if (remaining.size() == sizeBefore) {
      return false; // nothing was removed
    };
    follows.clear();
    follows.append(remaining);
    true;
  };

  public func getFollowers(
    follows : List.List<UserTypes.FollowRelation>,
    userId : Common.UserId,
  ) : [Common.UserId] {
    follows
      .filter(func(r : UserTypes.FollowRelation) : Bool {
        Principal.equal(r.following, userId)
      })
      .map<UserTypes.FollowRelation, Common.UserId>(func(r) { r.follower })
      .toArray();
  };

  public func getFollowing(
    follows : List.List<UserTypes.FollowRelation>,
    userId : Common.UserId,
  ) : [Common.UserId] {
    follows
      .filter(func(r : UserTypes.FollowRelation) : Bool {
        Principal.equal(r.follower, userId)
      })
      .map<UserTypes.FollowRelation, Common.UserId>(func(r) { r.following })
      .toArray();
  };
};
