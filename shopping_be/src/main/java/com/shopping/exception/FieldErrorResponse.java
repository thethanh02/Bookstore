package com.shopping.exception;

import java.util.List;

import lombok.Data;

@Data
public class FieldErrorResponse {
	private List<CustomFieldError> fieldErrors;
}
