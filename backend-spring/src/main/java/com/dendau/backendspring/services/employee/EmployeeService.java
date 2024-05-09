package com.dendau.backendspring.services.employee;


import com.dendau.backendspring.dtos.employee.EmployeeRequest;
import com.dendau.backendspring.dtos.employee.EmployeeResponse;

import java.util.List;

public interface EmployeeService {

    EmployeeResponse saveEmployee(EmployeeRequest employeeRequest);

    EmployeeResponse getEmployee(int id);

    List<EmployeeResponse> getAllEmployee();

}
