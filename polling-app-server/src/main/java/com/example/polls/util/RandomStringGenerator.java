package com.example.polls.util;

import java.util.UUID;

public class RandomStringGenerator {
    public static String getRandom(){
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        return randomUUIDString;
    }
}
