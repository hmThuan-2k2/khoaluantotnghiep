package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.user.UserRequest;
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

    @PostMapping(value = "/save")
    public ResponseEntity<UserResponse> saveUser(@RequestBody UserRequest userRequest) {
        try {
            UserResponse userResponse = userService.saveUser(userRequest);
            return ResponseEntity.ok(userResponse);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'RESTAURANT_MANAGER')")
    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        try {
            List<UserResponse> userResponses = userService.getAllUser();
            return ResponseEntity.ok(userResponses);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/profile")
    public ResponseEntity<UserResponse> getUserProfile() {
        try {
        UserResponse userResponse = userService.getUser();
        return ResponseEntity.ok().body(userResponse);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'RESTAURANT_MANAGER')")
    @GetMapping("/hello")
    public String hello() {
        try {
            return "Hello World!";
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    @PreAuthorize("hasAuthority('RESTAURANT_MANAGER')")
    @GetMapping("/test1")
    public String test1() {
        try {
            return "Welcome Restaurant Manager!";
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/test")
    public String test() {
        try {
            return "Welcome Admin!";
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

}
