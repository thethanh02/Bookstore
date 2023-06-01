package com.shopping.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EntityNotFoundException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 5163651968645988909L;

	public EntityNotFoundException(String message) {
        super(message);
    }
}