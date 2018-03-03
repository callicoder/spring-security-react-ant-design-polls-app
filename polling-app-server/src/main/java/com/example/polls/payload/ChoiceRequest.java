package com.example.polls.payload;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class ChoiceRequest {
    @NotNull
    @Size(min = 1)
    private String text;

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
