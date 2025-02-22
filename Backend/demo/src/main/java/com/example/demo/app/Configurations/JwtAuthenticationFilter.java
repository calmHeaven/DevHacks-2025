package com.example.demo.app.Configurations;

import com.example.demo.app.Model.User.User;
import com.example.demo.app.Repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    public JwtAuthenticationFilter(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //1 Obtain header that contains JWT String - NO TYPOS

        String authHeader = request.getHeader("Authorization"); //Bearer jwt



        if(authHeader==null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }

        //2 Obtain JWT Token
        /*
        * header must be split using the space as the delimiter to obtain the token
        * */
        String jwt = authHeader.split(" ")[1];

        //3 Obtain Subject/ Username in JWT
        /*
        * call extractUsername method from jwt service
        * */
        String username = jwtService.extractUsername(jwt);

        //4 set authentication object inside security context
        /*
        *
         */
        User user = userRepository.findByUsername(username).get();
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                username,
                null,
                user.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authToken);

        //5 execute the rest of the filter
        filterChain.doFilter(request, response);
    }
}
