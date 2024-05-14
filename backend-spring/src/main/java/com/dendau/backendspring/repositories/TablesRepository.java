package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.EmployeeInfo;
import com.dendau.backendspring.models.Tables;

public interface TablesRepository extends RefreshableCRUDRepository<Tables, Long> {
    public Tables findFirstById(long id);
}
