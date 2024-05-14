package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.MenuGroup;

public interface MenuGroupRepository extends RefreshableCRUDRepository<MenuGroup, Long> {
    public MenuGroup findFirstById(long id);
}
