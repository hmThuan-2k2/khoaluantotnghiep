package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.EmployeeInfo;
import com.dendau.backendspring.models.UserInfo;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends RefreshableCRUDRepository<UserInfo, Long> {

   public UserInfo findByUsername(String username);
   public UserInfo findFirstById(Long id);
   public UserInfo findFirstByEmployee(EmployeeInfo employeeInfo);
}
