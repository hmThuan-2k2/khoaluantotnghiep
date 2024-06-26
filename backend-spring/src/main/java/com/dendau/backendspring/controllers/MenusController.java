package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.menus.GetFindMenusGroupDTO;
import com.dendau.backendspring.dtos.menus.GetMenusDTO;
import com.dendau.backendspring.dtos.menus.GetRequestAddMenusDTO;
import com.dendau.backendspring.dtos.menus.IdMenusDTO;
import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesResponseDTO;
import com.dendau.backendspring.services.menus.MenusService;
import com.dendau.backendspring.services.tables.TablesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menus")
public class MenusController {

    @Autowired
    private MenusService menusService;

    @PostMapping(value = "/save")
    public ResponseEntity<GetMenusDTO> saveMenus(@RequestBody GetRequestAddMenusDTO request) {
        try {
            GetMenusDTO response = menusService.saveMenus(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetMenusDTO>> getAllMenus() {
        try {
            List<GetMenusDTO> response = menusService.getAllMenus();
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/all_find_menus_group")
    public ResponseEntity<List<GetMenusDTO>> getAllMenusGroup(@RequestBody GetFindMenusGroupDTO request) {
        try {
            List<GetMenusDTO> response = menusService.getAllMenusGroup(request);
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/detail")
    public ResponseEntity<GetMenusDTO> getMenusDetail(@RequestBody IdMenusDTO request) {
        try {
            GetMenusDTO response = menusService.getMenusId(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{menuId}")
    public ResponseEntity<MessageDTO> deleteTable(@PathVariable String menuId) {
        try {
            MessageDTO responseDTO = menusService.deleteMenu(Long.parseLong(menuId));
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
