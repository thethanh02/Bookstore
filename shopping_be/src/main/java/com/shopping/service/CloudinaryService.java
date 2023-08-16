package com.shopping.service;

public interface CloudinaryService {
    String uploadImage(String imgBase64, String uuid) throws Exception;

    void deleteImage(String cloudinaryPublicId) throws Exception;
}
