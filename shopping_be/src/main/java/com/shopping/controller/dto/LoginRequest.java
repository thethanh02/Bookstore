package com.shopping.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

	@Schema(example = "user")
    @NotBlank(message = "username không được để trống")
    private String username;

	@Schema(example = "a123456")
    @NotBlank(message = "password không được để trống")
    private String password;
}