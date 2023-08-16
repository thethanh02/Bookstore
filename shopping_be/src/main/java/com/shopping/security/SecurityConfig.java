package com.shopping.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.shopping.security.oauth2.CustomAuthSuccessHandler;
import com.shopping.security.oauth2.CustomOAuth2UserService;

import static org.springframework.security.config.Customizer.withDefaults;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final CustomOAuth2UserService customOauth2UserService;
    private final CustomAuthSuccessHandler customAuthSuccessHandler;
    private final JwtAuthFilter tokenAuthenticationFilter;

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers(HttpMethod.GET, "/api/users/me").hasAnyAuthority(ADMIN, USER)
                .requestMatchers("/api/users", "/api/users/**").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.POST, "/api/books/**").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.PUT, "/api/books/**").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.DELETE, "/api/books/**").hasAuthority(ADMIN)
                .requestMatchers(HttpMethod.GET, "/api/books", "/api/books/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/comments/new").hasAnyAuthority(ADMIN, USER)
                .requestMatchers("/api/cartitem", "/api/cartitem/**").hasAnyAuthority(ADMIN, USER)
                .requestMatchers("/api/orders/all").hasAnyAuthority(ADMIN)
                .requestMatchers("/api/orders", "/api/orders/**").hasAnyAuthority(ADMIN, USER)
                .requestMatchers("/public/**", "/auth/**", "/oauth2/**").permitAll()
                .requestMatchers("/", "/error", "/csrf", "/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
            ).oauth2Login(oauth2Login -> oauth2Login
                    .userInfoEndpoint().userService(customOauth2UserService)
                    .and()
                    .successHandler(customAuthSuccessHandler))
            .logout(l -> l.logoutSuccessUrl("/").permitAll());
        http.addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        http.exceptionHandling(e -> e.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)));
        http.sessionManagement((session) -> session
        		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    		);
//        http.cors(AbstractHttpConfigurer::disable);
        http.cors(withDefaults()).csrf(csrf -> csrf.disable());
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
}