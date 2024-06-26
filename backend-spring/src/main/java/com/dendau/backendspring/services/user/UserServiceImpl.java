package com.dendau.backendspring.services.user;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.user.UserRequest;
import com.dendau.backendspring.dtos.user.UserRequestChangePassword;
import com.dendau.backendspring.dtos.user.UserResponse;
import com.dendau.backendspring.models.UserInfo;
import com.dendau.backendspring.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    ModelMapper modelMapper = new ModelMapper();



    @Override
    public UserResponse saveUser(UserRequest userRequest) {
        if(userRequest.getUsername() == null){
            throw new RuntimeException("Parameter username is not found in request..!!");
        } else if(userRequest.getPassword() == null){
            throw new RuntimeException("Parameter password is not found in request..!!");
        }


//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        UserDetails userDetail = (UserDetails) authentication.getPrincipal();
//        String usernameFromAccessToken = userDetail.getUsername();
//
//        UserInfo currentUser = userRepository.findByUsername(usernameFromAccessToken);

        UserInfo savedUser = null;

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = userRequest.getPassword();
        String encodedPassword = encoder.encode(rawPassword);

        UserInfo user = modelMapper.map(userRequest, UserInfo.class);
        user.setPassword(encodedPassword);
        if(userRequest.getId() != null){
            UserInfo oldUser = userRepository.findFirstById(userRequest.getId());
            if(oldUser != null){
                oldUser.setId(user.getId());
                oldUser.setPassword(user.getPassword());
                oldUser.setUsername(user.getUsername());
                oldUser.setRoles(user.getRoles());

                savedUser = userRepository.save(oldUser);
                userRepository.refresh(savedUser);
            } else {
                throw new RuntimeException("Can't find record with identifier: " + userRequest.getId());
            }
        } else {
//            user.setCreatedBy(currentUser);
            savedUser = userRepository.save(user);
        }
        userRepository.refresh(savedUser);
        UserResponse userResponse = modelMapper.map(savedUser, UserResponse.class);
        return userResponse;
    }

    @Override
    public UserResponse getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetail = (UserDetails) authentication.getPrincipal();
        String usernameFromAccessToken = userDetail.getUsername();
        UserInfo user = userRepository.findByUsername(usernameFromAccessToken);
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);
        return userResponse;
    }

    @Override
    public List<UserResponse> getAllUser() {
        List<UserInfo> users = (List<UserInfo>) userRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<UserResponse>>(){}.getType();
        List<UserResponse> userResponses = modelMapper.map(users, setOfDTOsType);
        return userResponses;
    }

    @Override
    public MessageDTO changePassword(UserRequestChangePassword requestChangePassword) {
        MessageDTO messageDTO;

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPasswordOld = requestChangePassword.getPasswordOld();
        String encodedPasswordOld = encoder.encode(rawPasswordOld);


        String rawPasswordNew = requestChangePassword.getPasswordNew();
        String encodedPasswordNew = encoder.encode(rawPasswordNew);

        UserInfo userOld = userRepository.findFirstById(requestChangePassword.getId());
        if(userOld != null){
            if (Objects.equals(rawPasswordOld, rawPasswordNew)) {
                userOld.setPassword(encodedPasswordNew);
                userRepository.save(userOld);
                messageDTO = new MessageDTO("Đổi mật khẩu thành công, vui lòng đăng nhập lại!", 1);

            }
            else {
                messageDTO = new MessageDTO("Mật khẩu nhập lại không đúng, vui long nhập lại nếu muốn đổi mật khẩu!", 2);
            }
        } else {
//            user.setCreatedBy(currentUser);
            messageDTO = new MessageDTO("Không tìm thấy user có id = " + requestChangePassword.getId() + " !", 2);
        }
        return messageDTO;
    }


}
