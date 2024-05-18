package com.dendau.backendspring.services.menus_group;

import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.dtos.menus_group.IdMenusGroupDTO;
import com.dendau.backendspring.models.MenuGroup;
import com.dendau.backendspring.repositories.MenuGroupRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class MenusGroupServiceImpl implements MenusGroupService {

    @Autowired
    private MenuGroupRepository menuGroupRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public GetMenusGroupDTO saveMenusGroup(GetMenusGroupDTO request) {
        if(request.getName_menu_group() == null){
            throw new RuntimeException("Parameter name group is not found in request..!!");
        }
        MenuGroup saves = null;
        MenuGroup menus_group = modelMapper.map(request, MenuGroup.class);
        if(request.getId() != null) {
            MenuGroup oldMenusGroup = menuGroupRepository.findFirstById(request.getId());
            if(oldMenusGroup != null){
                oldMenusGroup.setId(menus_group.getId());
                oldMenusGroup.setName_menu_group(menus_group.getName_menu_group());
                oldMenusGroup.setImage_Url(menus_group.getImage_Url());
                saves = menuGroupRepository.save(oldMenusGroup);
                menuGroupRepository.refresh(saves);
            } else {
                throw new RuntimeException("Can't find record with identifier: " + request.getId());
            }
        } else {
//            user.setCreatedBy(currentUser);
            saves = menuGroupRepository.save(menus_group);
        }
        menuGroupRepository.refresh(saves);
        GetMenusGroupDTO response = modelMapper.map(saves, GetMenusGroupDTO.class);
        return response;
    }

    @Override
    public GetMenusGroupDTO getMenusGroupId(IdMenusGroupDTO request) {
        if(request.getId() != null) {
            MenuGroup menus_group = menuGroupRepository.findFirstById(request.getId());
            if (menus_group != null) {
                GetMenusGroupDTO response = modelMapper.map(menus_group, GetMenusGroupDTO.class);
                return response;
            }
            else throw new RuntimeException("Can't find record with identifier: " + request.getId());
        }
        else throw new RuntimeException("Parameter id is not found in request..!!");
    }

    @Override
    public List<GetMenusGroupDTO> getAllMenusGroup() {
        List<MenuGroup> menusGroups = (List<MenuGroup>) menuGroupRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<GetMenusGroupDTO>>(){}.getType();
        List<GetMenusGroupDTO> response = modelMapper.map(menusGroups, setOfDTOsType);
        return response;
    }
}
