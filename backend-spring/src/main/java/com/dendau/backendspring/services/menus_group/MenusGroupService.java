package com.dendau.backendspring.services.menus_group;

import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.dtos.menus_group.IdMenusGroupDTO;

import java.util.List;

public interface MenusGroupService {
    GetMenusGroupDTO saveMenusGroup(GetMenusGroupDTO request);

    GetMenusGroupDTO getMenusGroupId(IdMenusGroupDTO request);

    List<GetMenusGroupDTO> getAllMenusGroup();
}
