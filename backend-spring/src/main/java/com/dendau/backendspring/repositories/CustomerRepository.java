package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.Customer;

public interface CustomerRepository extends RefreshableCRUDRepository<Customer, Long> {
    public Customer findFirstById(Long id);
}
