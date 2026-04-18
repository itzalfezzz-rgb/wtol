import Common "common";
import WorkoutTypes "workout";

module {
  public type Comment = {
    id : Nat;
    author : Common.UserId;
    content : Text;
    createdAt : Common.Timestamp;
  };

  public type Post = {
    id : Common.PostId;
    author : Common.UserId;
    workoutSummary : ?WorkoutTypes.WorkoutSummary;
    territoryClaimed : [Common.ZoneId];
    message : Text;
    var likedBy : [Common.UserId]; // stored as array for shareability; Set used internally
    var comments : [Comment];
    createdAt : Common.Timestamp;
  };

  public type PostView = {
    id : Common.PostId;
    author : Common.UserId;
    workoutSummary : ?WorkoutTypes.WorkoutSummary;
    territoryClaimed : [Common.ZoneId];
    message : Text;
    likedBy : [Common.UserId];
    likesCount : Nat;
    comments : [Comment];
    commentsCount : Nat;
    createdAt : Common.Timestamp;
  };
};
