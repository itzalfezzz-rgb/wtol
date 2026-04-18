import Common "../types/common";
import FeedTypes "../types/feed";
import WorkoutTypes "../types/workout";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Principal "mo:core/Principal";

module {
  func toView(post : FeedTypes.Post) : FeedTypes.PostView {
    {
      id = post.id;
      author = post.author;
      workoutSummary = post.workoutSummary;
      territoryClaimed = post.territoryClaimed;
      message = post.message;
      likedBy = post.likedBy;
      likesCount = post.likedBy.size();
      comments = post.comments;
      commentsCount = post.comments.size();
      createdAt = post.createdAt;
    };
  };

  public func createPost(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    nextId : Nat,
    author : Common.UserId,
    workoutSummary : ?WorkoutTypes.WorkoutSummary,
    territoryClaimed : [Common.ZoneId],
    message : Text,
    now : Common.Timestamp,
  ) : Common.PostId {
    let post : FeedTypes.Post = {
      id = nextId;
      author;
      workoutSummary;
      territoryClaimed;
      message;
      var likedBy = [];
      var comments = [];
      createdAt = now;
    };
    posts.add(nextId, post);
    nextId;
  };

  public func getPost(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    postId : Common.PostId,
  ) : ?FeedTypes.PostView {
    switch (posts.get(postId)) {
      case (?post) ?toView(post);
      case null null;
    };
  };

  public func getFeed(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    follows : List.List<{ follower : Common.UserId; following : Common.UserId; createdAt : Common.Timestamp }>,
    viewer : Common.UserId,
    limit : Nat,
    offset : Nat,
  ) : [FeedTypes.PostView] {
    // Collect principals the viewer follows
    let followedUsers = follows
      .filter(func(r : { follower : Common.UserId; following : Common.UserId; createdAt : Common.Timestamp }) : Bool {
        Principal.equal(r.follower, viewer)
      })
      .map(
        func(r) { r.following }
      )
      .toArray();

    // All posts newest-first (reverse order by id)
    let allPosts = posts.reverseEntries().toArray();
    let filtered = allPosts.filter(func((_, p) : (Common.PostId, FeedTypes.Post)) : Bool {
      Principal.equal(p.author, viewer) or
      followedUsers.any(func(uid : Common.UserId) : Bool { Principal.equal(uid, p.author) })
    });

    let total = filtered.size();
    if (offset >= total) return [];
    let end = if (offset + limit > total) total else offset + limit;
    filtered.sliceToArray(offset, end)
      .map<(Common.PostId, FeedTypes.Post), FeedTypes.PostView>(func((_, p)) { toView(p) });
  };

  public func getGlobalFeed(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    limit : Nat,
    offset : Nat,
  ) : [FeedTypes.PostView] {
    let allPosts = posts.reverseEntries().toArray();
    let total = allPosts.size();
    if (offset >= total) return [];
    let end = if (offset + limit > total) total else offset + limit;
    allPosts.sliceToArray(offset, end)
      .map<(Common.PostId, FeedTypes.Post), FeedTypes.PostView>(func((_, p)) { toView(p) });
  };

  public func likePost(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Bool {
    switch (posts.get(postId)) {
      case null false;
      case (?post) {
        let alreadyLiked = post.likedBy.any(func(uid : Common.UserId) : Bool {
          Principal.equal(uid, caller)
        });
        if (alreadyLiked) return false;
        post.likedBy := post.likedBy.concat([caller]);
        true;
      };
    };
  };

  public func unlikePost(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Bool {
    switch (posts.get(postId)) {
      case null false;
      case (?post) {
        let before = post.likedBy.size();
        post.likedBy := post.likedBy.filter(func(uid : Common.UserId) : Bool {
          not Principal.equal(uid, caller)
        });
        post.likedBy.size() < before;
      };
    };
  };

  public func addComment(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    caller : Common.UserId,
    postId : Common.PostId,
    content : Text,
    now : Common.Timestamp,
  ) : Bool {
    switch (posts.get(postId)) {
      case null false;
      case (?post) {
        let nextCommentId = post.comments.size();
        let comment : FeedTypes.Comment = {
          id = nextCommentId;
          author = caller;
          content;
          createdAt = now;
        };
        post.comments := post.comments.concat([comment]);
        true;
      };
    };
  };

  public func deletePost(
    posts : Map.Map<Common.PostId, FeedTypes.Post>,
    caller : Common.UserId,
    postId : Common.PostId,
  ) : Bool {
    switch (posts.get(postId)) {
      case null false;
      case (?post) {
        if (not Principal.equal(post.author, caller)) return false;
        posts.remove(postId);
        true;
      };
    };
  };
};
