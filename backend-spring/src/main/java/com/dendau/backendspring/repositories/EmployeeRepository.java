package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.EmployeeInfo;
import com.dendau.backendspring.models.UserInfo;

public interface EmployeeRepository extends RefreshableCRUDRepository<EmployeeInfo, Integer> {
    public EmployeeInfo findFirstById(int id);
//    public int fin();
}
