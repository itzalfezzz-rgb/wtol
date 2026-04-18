import Common "../types/common";
import CoachTypes "../types/coach";
import CoachLib "../lib/coach";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import OutCall "mo:caffeineai-http-outcalls/outcall";

mixin (
  conversations : Map.Map<Common.UserId, CoachTypes.CoachConversation>,
) {
  let SYSTEM_PROMPT = "You are a fitness coach and running game strategist inside the WTOL app. Help the user maximize their territory on the map, improve their running performance, and win monthly competitions. Ask about their fitness level, location, weekly availability, and whether they prefer solo exploration or competitive takeovers. Then suggest a weekly running plan with route strategies to claim and hold the most territory.";

  let CLAUDE_API_URL = "https://api.anthropic.com/v1/messages";
  let CLAUDE_MODEL = "claude-3-haiku-20240307";

  // Required transform callback for http outcalls
  public query func coachTransform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // Escapes a text value for safe embedding in a JSON string
  func escapeJson(text : Text) : Text {
    var result = text;
    result := result.replace(#text "\\", "\\\\");
    result := result.replace(#text "\"", "\\\"");
    result := result.replace(#text "\n", "\\n");
    result := result.replace(#text "\r", "\\r");
    result := result.replace(#text "\t", "\\t");
    result;
  };

  // Builds the Claude API JSON request body from the conversation history
  func buildRequestBody(messages : [CoachTypes.CoachMessage]) : Text {
    var msgParts = "";
    var first = true;
    for (msg in messages.values()) {
      let roleStr = switch (msg.role) {
        case (#user) { "user" };
        case (#assistant) { "assistant" };
      };
      let part = "{\"role\":\"" # roleStr # "\",\"content\":\"" # escapeJson(msg.content) # "\"}";
      if (first) {
        msgParts := part;
        first := false;
      } else {
        msgParts := msgParts # "," # part;
      };
    };
    "{\"model\":\"" # CLAUDE_MODEL # "\",\"max_tokens\":1024,\"system\":\"" # escapeJson(SYSTEM_PROMPT) # "\",\"messages\":[" # msgParts # "]}";
  };

  // Extracts the assistant text content from Claude's JSON response.
  // Claude response shape: {"content":[{"type":"text","text":"..."}],...}
  // Strategy: split on "\"text\":\"" then take the part before the next double-quote.
  func extractResponseText(json : Text) : Text {
    let marker = "\"text\":\"";
    let parts = json.split(#text marker);
    ignore parts.next();
    switch (parts.next()) {
      case null { "" };
      case (?afterMarker) {
        // Split on the closing double-quote to get just the value
        let valueParts = afterMarker.split(#text "\"");
        switch (valueParts.next()) {
          case null { "" };
          case (?value) {
            // Unescape common sequences
            var result = value.replace(#text "\\n", "\n");
            result := result.replace(#text "\\r", "\r");
            result := result.replace(#text "\\t", "\t");
            result := result.replace(#text "\\\"", "\"");
            result := result.replace(#text "\\\\", "\\");
            result;
          };
        };
      };
    };
  };

  public query ({ caller }) func getCoachConversation() : async [CoachTypes.CoachMessage] {
    CoachLib.getConversation(conversations, caller);
  };

  public query ({ caller }) func getCoachHistory() : async [CoachTypes.CoachMessage] {
    CoachLib.getConversation(conversations, caller);
  };

  public shared ({ caller }) func startCoachSession() : async [CoachTypes.CoachMessage] {
    CoachLib.getConversation(conversations, caller);
  };

  public shared ({ caller }) func sendCoachMessage(content : Text) : async Text {
    let now = Time.now();
    // Append user message
    ignore CoachLib.addUserMessage(conversations, caller, content, now);
    // Build history for the API call
    let history = CoachLib.getConversation(conversations, caller);
    let body = buildRequestBody(history);
    let headers : [OutCall.Header] = [
      { name = "content-type"; value = "application/json" },
      { name = "anthropic-version"; value = "2023-06-01" },
      { name = "x-api-key"; value = "" }, // API key injected via environment at deploy time
    ];
    let responseJson = await OutCall.httpPostRequest(CLAUDE_API_URL, headers, body, coachTransform);
    let assistantText = extractResponseText(responseJson);
    let finalText = if (assistantText == "") {
      "I'm here to help you with your WTOL training! Please tell me about your fitness level, location, and weekly availability so I can create a personalized plan for you."
    } else {
      assistantText
    };
    // Store assistant response
    ignore CoachLib.addAssistantMessage(conversations, caller, finalText, Time.now());
    finalText;
  };

  public shared ({ caller }) func clearConversation() : async Bool {
    CoachLib.clearConversation(conversations, caller);
  };
};
