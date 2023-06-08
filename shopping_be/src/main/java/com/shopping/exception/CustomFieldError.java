package com.shopping.exception;

import lombok.Data;

@Data
public class CustomFieldError {
	private String field;
	private String message;
}
