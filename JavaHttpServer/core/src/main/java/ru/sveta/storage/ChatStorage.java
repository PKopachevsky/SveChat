package ru.sveta.storage;

import ru.sveta.beans.ChatMessage;

import java.util.ArrayList;
import java.util.List;

public class ChatStorage {
    private final List<ChatMessage> messages = new ArrayList<>();

    public void addMessage(ChatMessage message) {
        messages.add(message);
    }

    public List<ChatMessage> getMessages() {
        return new ArrayList<>(messages);
    }
}
