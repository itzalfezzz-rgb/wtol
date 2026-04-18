import Common "../types/common";
import CoachTypes "../types/coach";
import Map "mo:core/Map";

module {
  // Returns messages for user, or empty array if no conversation exists
  public func getConversation(
    conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
    userId : Common.UserId,
  ) : [CoachTypes.CoachMessage] {
    switch (conversations.get(userId)) {
      case (?conv) { conv.messages };
      case null { [] };
    };
  };

  // Ensures a conversation exists for the user, creating one if not
  func ensureConversation(
    conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
    userId : Common.UserId,
  ) : CoachTypes.CoachConversation {
    switch (conversations.get(userId)) {
      case (?conv) { conv };
      case null {
        let conv : CoachTypes.CoachConversation = {
          userId;
          var messages = [];
          var nextMessageId = 0;
        };
        conversations.add(userId, conv);
        conv;
      };
    };
  };

  // Appends a message to the user's conversation and returns the new message
  func addMessage(
    conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
    userId : Common.UserId,
    role : CoachTypes.MessageRole,
    content : Text,
    now : Common.Timestamp,
  ) : CoachTypes.CoachMessage {
    let conv = ensureConversation(conversations, userId);
    let msg : CoachTypes.CoachMessage = {
      id = conv.nextMessageId;
      role;
      content;
      createdAt = now;
    };
    conv.messages := conv.messages.concat([msg]);
    conv.nextMessageId += 1;
    msg;
  };

  public func addUserMessage(
    conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
    userId : Common.UserId,
    content : Text,
    now : Common.Timestamp,
  ) : CoachTypes.CoachMessage {
    addMessage(conversations, userId, #user, content, now);
  };

  public func addAssistantMessage(
    conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
    userId : Common.UserId,
    content : Text,
    now : Common.Timestamp,
  ) : CoachTypes.CoachMessage {
    addMessage(conversations, userId, #assistant, content, now);
  };

  public func clearConversation(
    conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
    userId : Common.UserId,
  ) : Bool {
    switch (conversations.get(userId)) {
      case (?conv) {
        conv.messages := [];
        conv.nextMessageId := 0;
        true;
      };
      case null { false };
    };
  };
};
