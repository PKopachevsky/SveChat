package ru.sveta.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sveta.storage.ChatStorage;

import java.io.IOException;
import java.io.OutputStream;

public class GetMessagesHandler implements HttpHandler {
    private final ChatStorage chatStorage;
    private final ObjectMapper mapper = new ObjectMapper();

    public GetMessagesHandler(ChatStorage chatStorage) {
        this.chatStorage = chatStorage;
        mapper.disable(SerializationFeature.FAIL_ON_EMPTY_BEANS);
        mapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);
    }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        System.out.println("Get messages request");
        String response = mapper.writeValueAsString(chatStorage.getMessages());
        byte[] bytes = response.getBytes();
        Headers headers = ex.getResponseHeaders();
        headers.add("Access-Control-Allow-Origin","*");
        ex.sendResponseHeaders(200,bytes.length);
        OutputStream os = ex.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
