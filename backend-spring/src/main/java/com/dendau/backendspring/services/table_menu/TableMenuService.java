package com.dendau.backendspring.services.table_menu;

import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.dtos.menus_group.IdMenusGroupDTO;
import com.dendau.backendspring.dtos.table_menu.GetTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.IdTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PostTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PutTableMenuDTO;

import java.util.List;

public interface TableMenuService {
    GetTableMenuDTO selectMenuTable(IdTableMenuDTO request);

    GetTableMenuDTO saveTableMenu(PutTableMenuDTO request);

    GetTableMenuDTO getTableMenuId(IdTableMenuDTO request);

    List<GetTableMenuDTO> getAllTableMenu();

    String deleteTableMenu(IdTableMenuDTO request);
}
