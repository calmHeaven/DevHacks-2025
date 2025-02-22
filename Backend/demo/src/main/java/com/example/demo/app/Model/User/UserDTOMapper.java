package com.example.demo.app.Model.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;
@Service
public class UserDTOMapper implements Function<User, userDTO> {
    @Override
    public userDTO apply(User user){
        return new userDTO(
             user.getId(),
                user.getUsername(),
                user.getEmail(),
            user.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList())
        );
    }
}
