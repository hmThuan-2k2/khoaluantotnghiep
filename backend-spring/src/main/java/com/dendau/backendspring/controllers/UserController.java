package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.user.UserRequest;
import com.dendau.backendspring.dtos.user.UserRequestChangePassword;
import com.dendau.backendspring.dtos.user.UserResponse;
import com.dendau.backendspring.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping(value = "/save")
    public ResponseEntity<UserResponse> saveUser(@RequestBody UserRequest userRequest) {
        try {
            UserResponse userResponse = userService.saveUser(userRequest);
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        try {
            List<UserResponse> userResponses = userService.getAllUser();
            return ResponseEntity.ok(userResponses);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getUserProfile() {
        try {
        UserResponse userResponse = userService.getUser();
        return ResponseEntity.ok().body(userResponse);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/change_password")
    public ResponseEntity<MessageDTO> changePasswordUser(@RequestBody UserRequestChangePassword userRequest) {
        try {
            MessageDTO Response = userService.changePassword(userRequest);
            return ResponseEntity.ok().body(Response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
