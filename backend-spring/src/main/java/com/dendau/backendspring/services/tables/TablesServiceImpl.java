package com.dendau.backendspring.services.tables;

import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesResponseDTO;
import com.dendau.backendspring.dtos.user.UserResponse;
import com.dendau.backendspring.models.Tables;
import com.dendau.backendspring.models.UserInfo;
import com.dendau.backendspring.repositories.TablesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class TablesServiceImpl implements TablesService {

    @Autowired
    private TablesRepository tablesRepository;


    ModelMapper modelMapper = new ModelMapper();


    @Override
    public SaveTablesResponseDTO saveTables(SaveTablesRequestDTO requestDTO) {
        if(requestDTO.getName() == null){
            throw new RuntimeException("Parameter name is not found in request..!!");
        }
        Tables savesTables = null;
        Tables tables = modelMapper.map(requestDTO, Tables.class);
        if(requestDTO.getId() != null) {
            Tables oldTables = tablesRepository.findFirstById(requestDTO.getId());
            if(oldTables != null){
                oldTables.setId(tables.getId());
                oldTables.setName(tables.getName());
                oldTables.setTrong(tables.isTrong());
                oldTables.setTamTinh(tables.isTamTinh());
                oldTables.setBaoCheBien(tables.isBaoCheBien());
                oldTables.setTotal(tables.getTotal());
                oldTables.setTable_menu(tables.getTable_menu());
                savesTables = tablesRepository.save(oldTables);
                tablesRepository.refresh(savesTables);
            } else {
                throw new RuntimeException("Can't find record with identifier: " + requestDTO.getId());
            }
        } else {
//            user.setCreatedBy(currentUser);
            savesTables = tablesRepository.save(tables);
        }
        tablesRepository.refresh(savesTables);
        SaveTablesResponseDTO responseDTO = modelMapper.map(savesTables, SaveTablesResponseDTO.class);
        return responseDTO;
    }

    @Override
    public GetTablesResponseDTO getTables(GetTablesRequestDTO requestDTO) {
        if(requestDTO.getId() != null) {
            Tables tables = tablesRepository.findFirstById(requestDTO.getId());
            if (tables != null) {
                GetTablesResponseDTO responseDTO = modelMapper.map(tables, GetTablesResponseDTO.class);
                return responseDTO;
            }
            else throw new RuntimeException("Can't find record with identifier: " + requestDTO.getId());
        }
        else throw new RuntimeException("Parameter id is not found in request..!!");
    }

    @Override
    public List<GetTablesResponseDTO> getAllTables() {
        List<Tables> tables = (List<Tables>) tablesRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<GetTablesResponseDTO>>(){}.getType();
        List<GetTablesResponseDTO> responseDTO = modelMapper.map(tables, setOfDTOsType);
        return responseDTO;
    }
}
