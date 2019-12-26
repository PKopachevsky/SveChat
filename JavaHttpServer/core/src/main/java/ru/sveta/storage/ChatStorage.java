package ru.sveta.storage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import ru.sveta.beans.ChatMessage;

import java.io.IOException;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.List;

public class ChatStorage {
    private final List<ChatMessage> messages = new ArrayList<>();
    private final ObjectMapper mapper = new ObjectMapper();
    private final Path path;

    public ChatStorage() {
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

        path = Paths.get("messages.txt");

        try {
            Files.lines(path).forEach(this::addMessage);
        } catch (IOException e) {
            System.err.println("Failed to read stored messages");
        }
    }

    public void addMessage(InputStream str) {
        try {
            addMessage(mapper.readValue(str, ChatMessage.class));
        } catch (IOException e) {
            System.err.println("Failed to deserialize messages");
        }
    }

    public void addMessage(String str) {
        try {
            addMessage(mapper.readValue(str, ChatMessage.class));
        } catch (JsonProcessingException e) {
            System.err.println("Failed to deserialize messages");
        }
    }

    public void addMessage(ChatMessage message) {
        if (message.getTime() == 0) {
            System.out.println(String.format("New message from %s", message.getAuthor()));
            message.setTime(System.currentTimeMillis());
        }
        messages.add(message);
        try {
            String line = mapper.writeValueAsString(message)+"\n";
            Files.write(
                    path,
                    line.getBytes(),
                    StandardOpenOption.APPEND
            );
        } catch (IOException e) {
            System.err.println("Failed to store messages");
        }
    }

    public List<ChatMessage> getMessages() {
        return new ArrayList<>(messages);
    }
}
