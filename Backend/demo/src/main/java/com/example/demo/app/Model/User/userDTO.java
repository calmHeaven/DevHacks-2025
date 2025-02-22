package com.example.demo.app.Model.User;

import lombok.Value;

import java.util.List;

/**
 * DTO for {@link User}
 */
@Value
public class userDTO {
    Long id;
    String username;
    String email;
    List<String> role;
}