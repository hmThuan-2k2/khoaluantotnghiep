package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.dtos.menus_group.IdMenusGroupDTO;
import com.dendau.backendspring.services.menus_group.MenusGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/menus_group")
public class MenusGroupController {

    @Autowired
    private MenusGroupService menusGroupService;

    @PostMapping(value = "/save")
    public ResponseEntity<GetMenusGroupDTO> saveMenusGroup(@RequestBody GetMenusGroupDTO request) {
        try {
            GetMenusGroupDTO response = menusGroupService.saveMenusGroup(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetMenusGroupDTO>> getAllMenusGroup() {
        try {
            List<GetMenusGroupDTO> response = menusGroupService.getAllMenusGroup();
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/detail")
    public ResponseEntity<GetMenusGroupDTO> getMenusDetail(@RequestBody IdMenusGroupDTO request) {
        try {
            GetMenusGroupDTO response = menusGroupService.getMenusGroupId(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
