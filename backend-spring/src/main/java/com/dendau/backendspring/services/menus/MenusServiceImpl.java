package com.dendau.backendspring.services.menus;

import com.dendau.backendspring.dtos.menus.GetFindMenusGroupDTO;
import com.dendau.backendspring.dtos.menus.GetMenusDTO;
import com.dendau.backendspring.dtos.menus.IdMenusDTO;
import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.models.MenuGroup;
import com.dendau.backendspring.models.Menus;
import com.dendau.backendspring.repositories.MenusRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Service
public class MenusServiceImpl implements  MenusService{

    @Autowired
    private MenusRepository menusRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public GetMenusDTO saveMenus(GetMenusDTO request) {
        if(request.getName_menu() == null){
            throw new RuntimeException("Parameter name is not found in request..!!");
        }
        Menus savesMenus = null;
        Menus menus = modelMapper.map(request, Menus.class);
        if(request.getId() != null) {
            Menus oldMenus = menusRepository.findFirstById(request.getId());
            if(oldMenus != null){
                oldMenus.setId(menus.getId());
                oldMenus.setName_menu(menus.getName_menu());
                oldMenus.setPrice_sale(menus.getPrice_sale());
                oldMenus.setPrice_cost(menus.getPrice_cost());
                oldMenus.setUnit(menus.getUnit());
                oldMenus.setImage_Url(menus.getImage_Url());
                oldMenus.setInventory(menus.getInventory());
                oldMenus.setMenu_group(menus.getMenu_group());
                savesMenus = menusRepository.save(oldMenus);
                menusRepository.refresh(savesMenus);
            } else {
                throw new RuntimeException("Can't find record with identifier: " + request.getId());
            }
        } else {
//            user.setCreatedBy(currentUser);
            savesMenus = menusRepository.save(menus);
        }
        menusRepository.refresh(savesMenus);
        GetMenusDTO response = modelMapper.map(savesMenus, GetMenusDTO.class);
        return response;
    }

    @Override
    public GetMenusDTO getMenusId(IdMenusDTO request) {
        if(request.getId() != null) {
            Menus menus = menusRepository.findFirstById(request.getId());
            if (menus != null) {
                GetMenusDTO response = modelMapper.map(menus, GetMenusDTO.class);
                return response;
            }
            else throw new RuntimeException("Can't find record with identifier: " + request.getId());
        }
        else throw new RuntimeException("Parameter id is not found in request..!!");
    }

    @Override
    public List<GetMenusDTO> getAllMenus() {
        List<Menus> menus = (List<Menus>) menusRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<GetMenusDTO>>(){}.getType();
        List<GetMenusDTO> response = modelMapper.map(menus, setOfDTOsType);
        return response;
    }

    @Override
    public List<GetMenusDTO> getAllMenusGroup(GetFindMenusGroupDTO request) {
        Long idMenuGroup = request.getId();
        List<Menus> menusAll = (List<Menus>) menusRepository.findAll();
        List<Menus> menus = new ArrayList<Menus>(){};
        menusAll.forEach(menu -> {
            if (menu.getMenu_group().getId() == idMenuGroup)
                menus.add(menu);
        });
        Type setOfDTOsType = new TypeToken<List<GetMenusDTO>>(){}.getType();
        List<GetMenusDTO> response = modelMapper.map(menus, setOfDTOsType);
        return response;
    }
}
