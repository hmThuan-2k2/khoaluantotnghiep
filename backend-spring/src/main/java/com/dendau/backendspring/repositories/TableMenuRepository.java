package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.TableMenu;
import com.dendau.backendspring.models.TableMenuKey;
import com.dendau.backendspring.models.Tables;

import java.util.Set;

public interface TableMenuRepository extends RefreshableCRUDRepository<TableMenu, Long> {
    public  TableMenu findFirstById(TableMenuKey id);
    public Set<TableMenu> findAllByTable(Tables table);
}
