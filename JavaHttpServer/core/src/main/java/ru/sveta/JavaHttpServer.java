package ru.sveta;

import com.sun.net.httpserver.HttpServer;
import ru.sveta.handlers.GetHistoryHandler;
import ru.sveta.handlers.GetMessagesHandler;
import ru.sveta.handlers.SendJsonHandler;
import ru.sveta.storage.ChatStorage;

import java.io.IOException;
import java.net.InetSocketAddress;

public class JavaHttpServer {
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8888), 0);
        ChatStorage chatStorage = new ChatStorage();
        server.createContext("/chat/send/json", new SendJsonHandler(chatStorage));
        server.createContext("/chat/messages", new GetMessagesHandler(chatStorage));
        server.setExecutor(null); // creates a default executor
        server.start();
    }
}
