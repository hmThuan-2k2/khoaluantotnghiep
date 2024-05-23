package com.dendau.backendspring.services.customer;

import com.dendau.backendspring.dtos.customer.CustomerRequest;
import com.dendau.backendspring.dtos.customer.CustomerResponse;
import com.dendau.backendspring.models.Customer;
import com.dendau.backendspring.repositories.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public CustomerResponse saveCustomer(CustomerRequest customerRequest) {
        Customer savedCustomer = null;

        Customer customer = modelMapper.map(customerRequest, Customer.class);
        if(customerRequest.getId() != null) {
            Customer oldCustomer= customerRepository.findFirstById(customerRequest.getId());
            if(oldCustomer != null){
                oldCustomer.setId(customer.getId());
                oldCustomer.setName_customer(customer.getName_customer());
                oldCustomer.setNickname(customer.getNickname());
                oldCustomer.setPhoneNumber(customer.getPhoneNumber());
                oldCustomer.setGender(customer.getGender());
                oldCustomer.setAddress(customer.getAddress());
                savedCustomer = customerRepository.save(oldCustomer);
                customerRepository.refresh(savedCustomer);
            } else {
                throw new RuntimeException("Can't find record with identifier: " + customerRequest.getId());
            }
        }
        else {
            savedCustomer = customerRepository.save(customer);
        }
        customerRepository.refresh(savedCustomer);
        CustomerResponse customerResponse = modelMapper.map(savedCustomer, CustomerResponse.class);
        return customerResponse;
    }

    @Override
    public CustomerResponse getCustomer(Long id) {
        Customer customer = customerRepository.findFirstById(id);
        CustomerResponse employeeResponse = modelMapper.map(customer, CustomerResponse.class);
        return employeeResponse;
    }

    @Override
    public List<CustomerResponse> getAllCustomer() {
        List<Customer> customerDTOList = (List<Customer>) customerRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<CustomerResponse>>(){}.getType();
        List<CustomerResponse> customerDTO = modelMapper.map(customerDTOList, setOfDTOsType);
        return customerDTO;
    }
}
