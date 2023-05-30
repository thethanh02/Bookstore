package com.shopping.utils;

import java.util.Base64;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Base64Detect {
    public static boolean isBase64(String input) {
        try {
            Base64.getDecoder().decode(input);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
    public static boolean isPath(String input) {
        Path path = Paths.get(input);
        return Files.exists(path);
    }
}