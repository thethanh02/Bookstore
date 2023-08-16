package com.shopping.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class CloudinaryServiceImpl implements CloudinaryService {
    private final Cloudinary cloudinary;

    @Override
    public String uploadImage(String imgBase64, String uuid) throws Exception {
        byte[] imageData = Base64.getDecoder().decode(imgBase64);
        
        Map<?, ?> params = ObjectUtils.asMap(
		                "public_id", uuid,
		                "overwrite", true);
        
        Map<?, ?> uploadResult = cloudinary.uploader().upload(imageData, params);
        
        return (String) uploadResult.get("public_id");
//        return (String) uploadResult.get("url");
    }

    @Override
    public void deleteImage(String publicId) throws Exception {
    	cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
    }
}