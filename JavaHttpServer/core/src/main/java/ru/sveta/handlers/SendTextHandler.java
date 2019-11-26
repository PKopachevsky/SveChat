package ru.sveta.handlers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import ru.sveta.storage.ChatStorage;

import java.io.IOException;
import java.io.OutputStream;

public class SendTextHandler implements HttpHandler {

    public SendTextHandler() {
    }

    @Override
    public void handle(HttpExchange ex) throws IOException {
        String body = new String(ex.getRequestBody().readAllBytes());
        System.out.println(body);
        String response = "OK";
        byte[] bytes = response.getBytes();
        ex.sendResponseHeaders(200, bytes.length);
        OutputStream os = ex.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
