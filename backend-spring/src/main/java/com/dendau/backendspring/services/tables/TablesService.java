package com.dendau.backendspring.services.tables;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesResponseDTO;

import java.util.List;

public interface TablesService {

    SaveTablesResponseDTO saveTables(SaveTablesRequestDTO requestDTO);

    GetTablesResponseDTO getTables(GetTablesRequestDTO requestDTO);

    List<GetTablesResponseDTO> getAllTables();

    MessageDTO deleteTable(String id);

    MessageDTO processingNewspaperTable(String id);
}
