package ru.sveta.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sveta.beans.ChatMessage;
import ru.sveta.storage.ChatStorage;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class SendJsonHandler implements HttpHandler {
    private final ChatStorage chatStorage;
    private final ObjectMapper mapper = new ObjectMapper();

    public SendJsonHandler(ChatStorage chatStorage) {
        this.chatStorage = chatStorage;
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
    }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        InputStream is = ex.getRequestBody();
        ChatMessage message = mapper.readValue(is, ChatMessage.class);
        System.out.println(String.format("Message from %s: %s", message.getAuthor(), message.getText()));
        chatStorage.addMessage(message);
        String response = "OK";
        byte[] bytes = response.getBytes();
        ex.sendResponseHeaders(200, bytes.length);
        OutputStream os = ex.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
