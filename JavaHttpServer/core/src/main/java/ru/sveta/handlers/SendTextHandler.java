package ru.sveta.handlers;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class SendTextHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange ex) throws IOException {
        InputStream is = ex.getRequestBody();
        is.transferTo(System.out);
        String response = "This is the response";
        byte[] bytes = response.getBytes();
        ex.sendResponseHeaders(200, bytes.length);
        OutputStream os = ex.getResponseBody();
        os.write(bytes);
        os.close();
    }
}
