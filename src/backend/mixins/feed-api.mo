import Common "../types/common";
import FeedTypes "../types/feed";
import WorkoutTypes "../types/workout";
import UserTypes "../types/user";
import FeedLib "../lib/feed";
import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (
  posts : Map.Map<Common.PostId, FeedTypes.Post>,
  follows : List.List<UserTypes.FollowRelation>,
) {
  var nextPostId : Nat = 0;
  public shared ({ caller }) func createPost(
    workoutSummary : ?WorkoutTypes.WorkoutSummary,
    territoryClaimed : [Common.ZoneId],
    message : Text,
  ) : async Common.PostId {
    let postId = FeedLib.createPost(
      posts,
      nextPostId,
      caller,
      workoutSummary,
      territoryClaimed,
      message,
      Time.now(),
    );
    nextPostId += 1;
    postId;
  };

  public query func getPost(postId : Common.PostId) : async ?FeedTypes.PostView {
    FeedLib.getPost(posts, postId);
  };

  public query ({ caller }) func getMyFeed(limit : Nat, offset : Nat) : async [FeedTypes.PostView] {
    FeedLib.getFeed(posts, follows, caller, limit, offset);
  };

  public query func getGlobalFeed(limit : Nat, offset : Nat) : async [FeedTypes.PostView] {
    FeedLib.getGlobalFeed(posts, limit, offset);
  };

  public shared ({ caller }) func likePost(postId : Common.PostId) : async Bool {
    FeedLib.likePost(posts, caller, postId);
  };

  public shared ({ caller }) func unlikePost(postId : Common.PostId) : async Bool {
    FeedLib.unlikePost(posts, caller, postId);
  };

  public shared ({ caller }) func addComment(
    postId : Common.PostId,
    content : Text,
  ) : async Bool {
    FeedLib.addComment(posts, caller, postId, content, Time.now());
  };

  public shared ({ caller }) func deletePost(postId : Common.PostId) : async Bool {
    FeedLib.deletePost(posts, caller, postId);
  };
};
