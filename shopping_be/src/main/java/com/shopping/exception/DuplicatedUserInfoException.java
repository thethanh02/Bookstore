package com.shopping.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicatedUserInfoException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = -284418651318255161L;

	public DuplicatedUserInfoException(String message) {
        super(message);
    }
}