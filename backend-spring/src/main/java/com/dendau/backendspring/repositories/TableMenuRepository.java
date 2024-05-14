package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.TableMenu;
import com.dendau.backendspring.models.TableMenuKey;

public interface TableMenuRepository extends RefreshableCRUDRepository<TableMenu, Long> {
    public  TableMenu findFirstById(TableMenuKey id);
}
