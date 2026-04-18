import Common "common";

module {
  public type MessageRole = { #user; #assistant };

  public type CoachMessage = {
    id : Common.CoachMessageId;
    role : MessageRole;
    content : Text;
    createdAt : Common.Timestamp;
  };

  public type CoachConversation = {
    userId : Common.UserId;
    var messages : [CoachMessage];
    var nextMessageId : Nat;
  };
};
