package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.employee.EmployeeRequest;
import com.dendau.backendspring.dtos.employee.EmployeeResponse;
import com.dendau.backendspring.services.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/all")
    public ResponseEntity<List<EmployeeResponse>> getAllEmployee() {
        try {
            List<EmployeeResponse> employeeResponses = employeeService.getAllEmployee();
            return ResponseEntity.ok(employeeResponses);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<EmployeeResponse> saveUser(@RequestBody EmployeeRequest employeeRequest) {
        try {
            EmployeeResponse employeeResponse = employeeService.saveEmployee(employeeRequest);
            return ResponseEntity.ok(employeeResponse);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
