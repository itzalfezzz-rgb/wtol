import Common "../types/common";
import CompetitionTypes "../types/competition";
import UserTypes "../types/user";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

module {
  func toView(c : CompetitionTypes.Competition) : CompetitionTypes.CompetitionView {
    {
      id = c.id;
      monthYear = c.monthYear;
      challengeType = c.challengeType;
      standings = c.standings;
      prizes = c.prizes;
      isActive = c.isActive;
      startsAt = c.startsAt;
      endsAt = c.endsAt;
    };
  };

  public func createCompetition(
    competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
    nextId : Nat,
    monthYear : Text,
    challengeType : CompetitionTypes.ChallengeType,
    prizes : [Text],
    startsAt : Common.Timestamp,
    endsAt : Common.Timestamp,
  ) : Common.CompetitionId {
    let competition : CompetitionTypes.Competition = {
      id = nextId;
      monthYear;
      challengeType;
      var standings = [];
      prizes;
      var isActive = true;
      startsAt;
      endsAt;
    };
    competitions.add(nextId, competition);
    nextId;
  };

  public func getActiveCompetition(
    competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
    now : Common.Timestamp,
  ) : ?CompetitionTypes.CompetitionView {
    let found = competitions.entries().find(func((_, c) : (Common.CompetitionId, CompetitionTypes.Competition)) : Bool {
      c.isActive and now >= c.startsAt and now <= c.endsAt
    });
    switch (found) {
      case (?(_, c)) ?toView(c);
      case null null;
    };
  };

  public func getCompetition(
    competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
    competitionId : Common.CompetitionId,
  ) : ?CompetitionTypes.CompetitionView {
    switch (competitions.get(competitionId)) {
      case (?c) ?toView(c);
      case null null;
    };
  };

  public func listCompetitions(
    competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
  ) : [CompetitionTypes.CompetitionView] {
    competitions.values().toArray()
      .map<CompetitionTypes.Competition, CompetitionTypes.CompetitionView>(func(c) { toView(c) });
  };

  func scoreForUser(user : UserTypes.User, challengeType : CompetitionTypes.ChallengeType) : Float {
    switch (challengeType) {
      case (#mostTerritory) user.totalTerritoryArea;
      case (#mostDistance) user.totalTerritoryArea;
      case (#mostWorkouts) user.totalTerritoryArea;
      case (#mostTakedowns) user.totalTerritoryArea;
    };
  };

  public func refreshStandings(
    competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
    users : Map.Map<Common.UserId, UserTypes.User>,
    competitionId : Common.CompetitionId,
  ) : Bool {
    switch (competitions.get(competitionId)) {
      case null false;
      case (?comp) {
        // Build updated standings from registered user IDs (those already in comp.standings)
        let unsorted : List.List<CompetitionTypes.Standing> = List.empty();
        for (existing in comp.standings.values()) {
          switch (users.get(existing.userId)) {
            case (?user) {
              unsorted.add({ userId = existing.userId; score = scoreForUser(user, comp.challengeType); rank = 0 });
            };
            case null {};
          };
        };

        // Sort descending by score
        let sorted = unsorted.sort(func(a : CompetitionTypes.Standing, b : CompetitionTypes.Standing) : { #less; #equal; #greater } {
          if (a.score > b.score) #less
          else if (a.score < b.score) #greater
          else #equal
        });

        // Assign ranks
        let ranked = sorted.mapEntries<CompetitionTypes.Standing, CompetitionTypes.Standing>(
          func(s, i) { { s with rank = i + 1 } }
        );

        comp.standings := ranked.toArray();
        true;
      };
    };
  };

  public func joinCompetition(
    competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
    competitionId : Common.CompetitionId,
    caller : Common.UserId,
  ) : Bool {
    switch (competitions.get(competitionId)) {
      case null false;
      case (?comp) {
        let alreadyJoined = comp.standings.any(func(s : CompetitionTypes.Standing) : Bool {
          Principal.equal(s.userId, caller)
        });
        if (alreadyJoined) return false;
        let newEntry : CompetitionTypes.Standing = {
          userId = caller;
          score = 0.0;
          rank = comp.standings.size() + 1;
        };
        comp.standings := comp.standings.concat([newEntry]);
        true;
      };
    };
  };

  public func getLeaderboard(
    users : Map.Map<Common.UserId, UserTypes.User>,
    locationFilter : ?Text,
    limit : Nat,
  ) : [CompetitionTypes.LeaderboardEntry] {
    let allUsers = users.values().toArray();

    let filtered = switch (locationFilter) {
      case null allUsers;
      case (?loc) allUsers.filter(func(u : UserTypes.User) : Bool { u.locationLabel == loc });
    };

    let sorted = filtered.sort(func(a : UserTypes.User, b : UserTypes.User) : { #less; #equal; #greater } {
      if (a.totalTerritoryArea > b.totalTerritoryArea) #less
      else if (a.totalTerritoryArea < b.totalTerritoryArea) #greater
      else #equal
    });

    let taken = if (limit < sorted.size()) sorted.sliceToArray(0, limit) else sorted;

    taken.mapEntries<UserTypes.User, CompetitionTypes.LeaderboardEntry>(
      func(u, i) {
        {
          userId = u.id;
          username = u.username;
          totalTerritoryArea = u.totalTerritoryArea;
          rank = i + 1;
          locationLabel = u.locationLabel;
        }
      }
    );
  };
};
