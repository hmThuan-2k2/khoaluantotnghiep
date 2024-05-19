package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.MenuGroup;
import com.dendau.backendspring.models.Menus;

import java.util.List;
import java.util.Set;

public interface MenusRepository extends RefreshableCRUDRepository<Menus, Long> {
    public Menus findFirstById(Long id);
}
