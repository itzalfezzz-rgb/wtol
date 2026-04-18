import Common "../types/common";
import CompetitionTypes "../types/competition";
import UserTypes "../types/user";
import CompetitionLib "../lib/competition";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";

mixin (
  competitions : Map.Map<Common.CompetitionId, CompetitionTypes.Competition>,
  users : Map.Map<Common.UserId, UserTypes.User>,
) {
  var nextCompetitionId : Nat = 0;
  public query func getActiveCompetition() : async ?CompetitionTypes.CompetitionView {
    CompetitionLib.getActiveCompetition(competitions, Time.now());
  };

  public query func getCompetition(competitionId : Common.CompetitionId) : async ?CompetitionTypes.CompetitionView {
    CompetitionLib.getCompetition(competitions, competitionId);
  };

  public query func listCompetitions() : async [CompetitionTypes.CompetitionView] {
    CompetitionLib.listCompetitions(competitions);
  };

  public query func getLeaderboard(locationFilter : ?Text, limit : Nat) : async [CompetitionTypes.LeaderboardEntry] {
    CompetitionLib.getLeaderboard(users, locationFilter, limit);
  };

  public shared ({ caller }) func joinCompetition(competitionId : Common.CompetitionId) : async Bool {
    CompetitionLib.joinCompetition(competitions, competitionId, caller);
  };

  public shared ({ caller }) func createCompetition(
    monthYear : Text,
    challengeType : CompetitionTypes.ChallengeType,
    prizes : [Text],
    startsAt : Common.Timestamp,
    endsAt : Common.Timestamp,
  ) : async Common.CompetitionId {
    let compId = CompetitionLib.createCompetition(
      competitions,
      nextCompetitionId,
      monthYear,
      challengeType,
      prizes,
      startsAt,
      endsAt,
    );
    nextCompetitionId += 1;
    compId;
  };

  public shared func getCompetitionLeaderboard(competitionId : Common.CompetitionId) : async [CompetitionTypes.Standing] {
    switch (competitions.get(competitionId)) {
      case null [];
      case (?comp) {
        // Sort standings by score descending and return top 10
        let sorted = comp.standings.sort(func(a : CompetitionTypes.Standing, b : CompetitionTypes.Standing) : { #less; #equal; #greater } {
          if (a.score > b.score) #less
          else if (a.score < b.score) #greater
          else #equal
        });
        if (sorted.size() <= 10) sorted
        else sorted.sliceToArray(0, 10);
      };
    };
  };
};
