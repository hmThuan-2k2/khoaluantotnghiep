package com.dendau.backendspring.services.menus;

import com.dendau.backendspring.dtos.menus.GetMenusDTO;
import com.dendau.backendspring.dtos.menus.IdMenusDTO;

import java.util.List;

public interface MenusService {
    GetMenusDTO saveMenus(GetMenusDTO request);

    GetMenusDTO getMenusId(IdMenusDTO request);

    List<GetMenusDTO> getAllMenus();
}
