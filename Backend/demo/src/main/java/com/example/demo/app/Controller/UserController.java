package com.example.demo.app.Controller;
import com.example.demo.app.Authentication.AuthenticationService;
import com.example.demo.app.Model.User.User;
import com.example.demo.app.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping(path = {"/api/user"})
public class UserController {
    private final UserService userService;
    private final AuthenticationService authenticationService;
    @Autowired
    public UserController(UserService userService, AuthenticationService authenticationService) {
        this.userService = userService;
        this.authenticationService = authenticationService;
    }
    @GetMapping
    public ResponseEntity<String> getProduct(){
        return ResponseEntity.ok("Hello from this secured endpoint");
    }
    @PreAuthorize("hasRole('ADMIN') and hasAnyAuthority('ADMIN', 'READ', 'WRITE')")
    @GetMapping(path="/getusers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @PreAuthorize("hasRole('ADMIN') && hasPermission('ADMIN', 'WRITE','READ')")
    @GetMapping(path = "getuser/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUser(id);
    }
    @PostMapping(path="/create-user")
    public void createUser(@RequestBody User user) {
        authenticationService.signup(user);
    }
    @PreAuthorize("#userId == authentication.principal.id")
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }
    @PreAuthorize("#userId == authentication.principal.id")
    @PutMapping(path = "/{userId}")
    public void updateUser (
            @PathVariable("userId") Long userId,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String password
    ){
        userService.updateUser(userId, username, email, password);
    }
}
