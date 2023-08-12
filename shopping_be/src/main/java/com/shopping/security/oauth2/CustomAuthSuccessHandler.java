package com.shopping.security.oauth2;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.shopping.security.JwtTokenProvider;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Component
public class CustomAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private final JwtTokenProvider tokenProvider;
	
	@Value("${app.oauth2.redirectUri}")
	private String redirectUri;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		handle(request, response, authentication);
		super.clearAuthenticationAttributes(request);
	}
	
	@Override
	protected void handle(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {

		String targetUrl = redirectUri.isEmpty() ? determineTargetUrl(request, response, authentication) : redirectUri;
		
		String token = tokenProvider.generate(authentication);
		targetUrl = UriComponentsBuilder.fromUriString(targetUrl).queryParam("token", token).build().toUriString();
		getRedirectStrategy().sendRedirect(request, response, targetUrl);
	}
}
