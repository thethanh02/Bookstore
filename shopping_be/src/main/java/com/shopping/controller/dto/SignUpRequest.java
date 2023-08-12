package com.shopping.controller.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

	@Schema(example = "user3")
    @NotBlank
    private String username;

	@Schema(example = "a123456")
    @NotBlank
    @Size(min = 6, message = "Password should be atleast 6 characters.")
    private String password;

	@Schema(example = "User")
    @NotBlank
    private String name;

	@Schema(example = "user@mycompany.com")
    @Email
    private String email;
}