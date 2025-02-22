package com.example.demo.app.Configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
public class SecurityFilter {

    @Autowired
    private AuthenticationProvider authenticationProvider;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrfConfig -> csrfConfig.disable())
                .sessionManagement(sessionMangConfig -> sessionMangConfig.sessionCreationPolicy(SessionCreationPolicy.STATELESS))//NOTE: Not Using Sessions, because JWT is Stateless So disabling CSRF doesn't have any effect
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authConfig -> {
                    authConfig.requestMatchers(HttpMethod.POST, "/auth/authenticate").permitAll();
                    authConfig.requestMatchers(HttpMethod.POST, "/api/user/create-user").permitAll();
                    authConfig.requestMatchers(HttpMethod.GET, "/user/getusers").hasRole("ADMIN");
                    authConfig.requestMatchers(HttpMethod.GET, "/user/getuser/{id}").hasRole("ADMIN");
                    authConfig.requestMatchers(HttpMethod.POST,"/user/create-user").hasRole("USER");
                    authConfig.requestMatchers(HttpMethod.POST,"/budgets/create-budget").hasRole("USER");
                    authConfig.requestMatchers("/error").permitAll();
                    authConfig.requestMatchers("/**");


                    authConfig.anyRequest().denyAll();
                });
        return http.build();
    }
}
