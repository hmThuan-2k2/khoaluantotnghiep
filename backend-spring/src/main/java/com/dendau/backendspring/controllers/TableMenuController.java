package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.table_menu.GetTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.IdTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PostTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PutTableMenuDTO;
import com.dendau.backendspring.services.table_menu.TableMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/table_menu")
public class TableMenuController {

    @Autowired
    private TableMenuService tableMenuService;

    @PostMapping(value = "/select")
    public ResponseEntity<GetTableMenuDTO> selectTableMenu(@RequestBody IdTableMenuDTO request) {
        try {
            GetTableMenuDTO response = tableMenuService.selectMenuTable(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping(value = "/save")
    public ResponseEntity<GetTableMenuDTO> saveTableMenu(@RequestBody PutTableMenuDTO request) {
        try {
            GetTableMenuDTO response = tableMenuService.saveTableMenu(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetTableMenuDTO>> getAllTableMenu() {
        try {
            List<GetTableMenuDTO> response = tableMenuService.getAllTableMenu();
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @GetMapping("/detail")
    public ResponseEntity<GetTableMenuDTO> getTableMenuDetail(@RequestBody IdTableMenuDTO request) {
        try {
            GetTableMenuDTO response = tableMenuService.getTableMenuId(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/delete")
    public  ResponseEntity<MessageDTO> deleteTableMenu(@RequestBody IdTableMenuDTO request) {
        try {
            MessageDTO response = tableMenuService.deleteTableMenu(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
