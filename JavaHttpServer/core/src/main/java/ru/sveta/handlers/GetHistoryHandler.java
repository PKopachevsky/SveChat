package ru.sveta.handlers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sveta.storage.ChatStorage;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.stream.Collectors;

public class GetHistoryHandler implements HttpHandler {
    private final String template;
    private ChatStorage chatStorage;

    public GetHistoryHandler(ChatStorage chatStorage) throws IOException {
        this.chatStorage = chatStorage;
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("html/chat_template.html");
        assert is != null;
        template = new String(is.readAllBytes());
    }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        System.out.println("Http GET response");
        String messages = chatStorage
                .getMessages()
                .stream()
                .map(s -> String.format("<li>[%s]:%s</li>",s.getAuthor(),s.getText()))
                .collect(Collectors.joining());
        String response = template.replace("%%CHAT_LIST%%", messages);
        byte[] bytes = response.getBytes();
        ex.sendResponseHeaders(200,bytes.length);
        OutputStream os = ex.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
