package com.dendau.backendspring.services.employee;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.employee.EmployeeRequest;
import com.dendau.backendspring.dtos.employee.EmployeeResponse;
import com.dendau.backendspring.models.EmployeeInfo;
import com.dendau.backendspring.models.RefreshToken;
import com.dendau.backendspring.models.UserInfo;
import com.dendau.backendspring.repositories.EmployeeRepository;
import com.dendau.backendspring.repositories.RefreshTokenRepository;
import com.dendau.backendspring.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class EmployeeServiceImpl implements  EmployeeService{

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RefreshTokenRepository refreshTokenRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public EmployeeResponse saveEmployee(EmployeeRequest employeeRequest) {
        EmployeeInfo savedEmployee = null;

        EmployeeInfo employee = modelMapper.map(employeeRequest, EmployeeInfo.class);
        System.out.println(employee.toString());
        if(employeeRequest.getId() != 0) {
            EmployeeInfo oldEmployee= employeeRepository.findFirstById(employeeRequest.getId());
            if(oldEmployee != null){
                oldEmployee.setId(employee.getId());
                oldEmployee.setName(employee.getName());
                oldEmployee.setDateOfBirth(employee.getDateOfBirth());
                oldEmployee.setGender(employee.getGender());
                oldEmployee.setAddress(employee.getAddress());
                oldEmployee.setPhoneNumber(employee.getPhoneNumber());
                oldEmployee.setIdCard(employee.getIdCard());
                oldEmployee.setNote(employee.getNote());
                savedEmployee = employeeRepository.save(oldEmployee);
                employeeRepository.refresh(savedEmployee);
            } else {
                throw new RuntimeException("Can't find record with identifier: " + employeeRequest.getId());
            }
        }
        else {
            savedEmployee = employeeRepository.save(employee);
        }
        employeeRepository.refresh(savedEmployee);
        EmployeeResponse employeeResponse = modelMapper.map(savedEmployee, EmployeeResponse.class);
        return employeeResponse;
    }

    @Override
    public EmployeeResponse getEmployee(int id) {
        EmployeeInfo employee = employeeRepository.findFirstById(id);
        EmployeeResponse employeeResponse = modelMapper.map(employee, EmployeeResponse.class);
        return employeeResponse;
    }

    @Override
    public List<EmployeeResponse> getAllEmployee() {
        List<EmployeeInfo> employeeDTOList = (List<EmployeeInfo>) employeeRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<EmployeeResponse>>(){}.getType();
        List<EmployeeResponse> employeeDTO = modelMapper.map(employeeDTOList, setOfDTOsType);
        return employeeDTO;
    }

    @Override
    public MessageDTO deleteEmployee(int id) {
        MessageDTO messageDTO;
        EmployeeInfo employeeInfo = employeeRepository.findFirstById(id);
        UserInfo userInfo = userRepository.findFirstByEmployee(employeeInfo);
        if (userInfo != null) {
            RefreshToken refreshToken = refreshTokenRepository.findFirstByUserInfo(userInfo);
            if (refreshToken != null) {
                refreshTokenRepository.delete(refreshToken);
            }
            userRepository.delete(userInfo);
        }
        employeeRepository.delete(employeeInfo);
        messageDTO = new MessageDTO("Xoá nhân viên thành công!", 1);
        return messageDTO;
    }
}
