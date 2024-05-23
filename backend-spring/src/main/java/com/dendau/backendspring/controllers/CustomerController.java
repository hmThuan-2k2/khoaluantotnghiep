package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.customer.CustomerRequest;
import com.dendau.backendspring.dtos.customer.CustomerResponse;
import com.dendau.backendspring.dtos.employee.EmployeeRequest;
import com.dendau.backendspring.dtos.employee.EmployeeResponse;
import com.dendau.backendspring.services.customer.CustomerService;
import com.dendau.backendspring.services.employee.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @GetMapping("/all")
    public ResponseEntity<List<CustomerResponse>> getAllCustomer() {
        try {
            List<CustomerResponse> customerResponses = customerService.getAllCustomer();
            return ResponseEntity.ok(customerResponses);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/get/{customerId}")
    public ResponseEntity<CustomerResponse> getCustomerId(@PathVariable String customerId) {
        try {
            CustomerResponse responseDTO = customerService.getCustomer(Long.parseLong(customerId));
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<CustomerResponse> saveUser(@RequestBody CustomerRequest customerRequest) {
        try {
            CustomerResponse customerResponse = customerService.saveCustomer(customerRequest);
            return ResponseEntity.ok(customerResponse);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
