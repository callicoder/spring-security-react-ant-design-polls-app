package com.example.polls.payload;

import javax.validation.constraints.NotNull;

public class ChoiceRequest {
    @NotNull
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
