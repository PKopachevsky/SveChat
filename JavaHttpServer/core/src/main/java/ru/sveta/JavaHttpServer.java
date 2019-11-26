package ru.sveta;

import com.sun.net.httpserver.HttpServer;
import ru.sveta.handlers.SendTextHandler;

import java.io.IOException;
import java.net.InetSocketAddress;

public class JavaHttpServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);
        server.createContext("/chat/send/text", new SendTextHandler());
        server.setExecutor(null); // creates a default executor
        server.start();
    }
}
