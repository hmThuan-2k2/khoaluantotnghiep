package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.Menus;

public interface MenusRepository extends RefreshableCRUDRepository<Menus, Long> {
    public Menus findFirstById(Long id);
}
