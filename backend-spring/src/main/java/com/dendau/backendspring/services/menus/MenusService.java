package com.dendau.backendspring.services.menus;

import com.dendau.backendspring.dtos.menus.GetFindMenusGroupDTO;
import com.dendau.backendspring.dtos.menus.GetMenusDTO;
import com.dendau.backendspring.dtos.menus.IdMenusDTO;
import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;

import java.util.List;

public interface MenusService {
    GetMenusDTO saveMenus(GetMenusDTO request);

    GetMenusDTO getMenusId(IdMenusDTO request);

    List<GetMenusDTO> getAllMenus();

    List<GetMenusDTO> getAllMenusGroup(GetFindMenusGroupDTO request);
}
