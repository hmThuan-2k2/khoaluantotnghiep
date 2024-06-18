package com.dendau.backendspring.services.user;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.user.UserRequest;
import com.dendau.backendspring.dtos.user.UserRequestChangePassword;
import com.dendau.backendspring.dtos.user.UserResponse;

import java.util.List;


public interface UserService {

    UserResponse saveUser(UserRequest userRequest);

    UserResponse getUser();

    List<UserResponse> getAllUser();

    MessageDTO changePassword(UserRequestChangePassword requestChangePassword);
}
