package com.dendau.backendspring.services.employee;

import com.dendau.backendspring.dtos.employee.EmployeeRequest;
import com.dendau.backendspring.dtos.employee.EmployeeResponse;
import com.dendau.backendspring.models.EmployeeInfo;
import com.dendau.backendspring.repositories.EmployeeRepository;
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
}
