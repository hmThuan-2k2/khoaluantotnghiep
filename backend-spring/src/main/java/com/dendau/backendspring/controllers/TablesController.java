package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesResponseDTO;
import com.dendau.backendspring.services.tables.TablesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/table")
public class TablesController {
    @Autowired
    private TablesService tablesService;

    @PostMapping(value = "/save")
    public ResponseEntity<SaveTablesResponseDTO> saveTables(@RequestBody SaveTablesRequestDTO requestDTO) {
        try {
            SaveTablesResponseDTO responseDTO = tablesService.saveTables(requestDTO);
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetTablesResponseDTO>> getAllTables() {
        try {
            List<GetTablesResponseDTO> responseDTO = tablesService.getAllTables();
            return ResponseEntity.ok(responseDTO);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/detail")
    public ResponseEntity<GetTablesResponseDTO> getTablesDetail(@RequestBody GetTablesRequestDTO requestDTO) {
        try {
            GetTablesResponseDTO responseDTO = tablesService.getTables(requestDTO);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/processing_newspaper/{tableId}")
    public ResponseEntity<MessageDTO> processingNewspaperTables(@PathVariable String tableId) {
        try {
            MessageDTO responseDTO = tablesService.processingNewspaperTable(tableId);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{tableId}")
    public ResponseEntity<MessageDTO> deleteTable(@PathVariable String tableId) {
        try {
            MessageDTO responseDTO = tablesService.deleteTable(tableId);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
