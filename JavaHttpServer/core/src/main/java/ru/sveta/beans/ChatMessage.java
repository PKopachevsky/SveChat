package ru.sveta.beans;

public class ChatMessage {
    private String author;
    private String text;
    private long time;

    public String getAuthor() {
        return author;
    }

    public ChatMessage setAuthor(String author) {
        this.author = author;
        return this;
    }

    public String getText() {
        return text;
    }

    public ChatMessage setText(String text) {
        this.text = text;
        return this;
    }

    public long getTime() {
        return time;
    }

    public ChatMessage setTime(long time) {
        this.time = time;
        return this;
    }
}
