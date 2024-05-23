package com.dendau.backendspring.services.customer;


import com.dendau.backendspring.dtos.customer.CustomerRequest;
import com.dendau.backendspring.dtos.customer.CustomerResponse;
import com.dendau.backendspring.dtos.employee.EmployeeRequest;
import com.dendau.backendspring.dtos.employee.EmployeeResponse;

import java.util.List;

public interface CustomerService {

    CustomerResponse saveCustomer(CustomerRequest customerRequest);

    CustomerResponse getCustomer(Long id);

    List<CustomerResponse> getAllCustomer();

}
