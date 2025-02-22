package com.example.demo.app.Service;


import com.example.demo.app.Model.User.User;
import com.example.demo.app.Model.User.UserDTOMapper;
import com.example.demo.app.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@Service
public class UserService implements UserDetailsService {
    private final static String USER_NOT_FOUND_MSG = "user with username %s not found";


    @Override
    public UserDetails loadUserByUsername(String user)
            throws UsernameNotFoundException {
        return userRepository.findByUsername(user).orElseThrow(() ->
                new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, user)));

    }

    private final UserDTOMapper userDTOMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository,
                       UserDTOMapper userDTOMapper,
                       PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public User createNewUser(User user) {
        if (user == null) {
            throw new IllegalStateException("User cannot be null");
        }
        Optional<User> userOptionalName = userRepository.findByUsername(user.getUsername());
        if (userOptionalName.isPresent()) {
            throw new IllegalStateException("Username is already taken");
        }
        Optional<User> userOptionalEmail = userRepository.findByEmail(user.getEmail());
        if (userOptionalEmail.isPresent()) {
            throw new IllegalStateException("Email is already taken");
        }
        return userRepository.save(user);
    }
    public User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id " + userId + "does not exist"));
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new IllegalStateException("User with username " + username + "does not exist"));
    }

    public List<User> getAllUsers() {
        return new ArrayList<>(userRepository.findAll());
    }

    public void deleteUser(Long userId) {
        boolean exists = userRepository.existsById(userId);
        if (!exists) {
            throw new IllegalStateException("User with id " + userId + " does not exist");
        }

        userRepository.deleteById(userId);
    }

    @Transactional
    public User updateUser(Long userId, String username, String email, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalStateException("User with id " + userId + " does not exist"));
        if (username != null && !username.isEmpty() && !Objects.equals(user.getUsername(), username)) {
            user.setUsername(username);
        }
        if (email != null && !email.isEmpty() && !Objects.equals(user.getEmail(), email)) {
            user.setEmail(email);
        }
        if (password != null && !password.isEmpty() && !Objects.equals(user.getPassword(), password)) {
            user.setPassword(passwordEncoder.encode(password));
        }
        return userRepository.save(user);
    }

}
