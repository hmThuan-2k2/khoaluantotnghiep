package com.dendau.backendspring.services.tables;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.table_menu.GetTable_TableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PostTableMenuDTO;
import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesResponseDTO;
import com.dendau.backendspring.dtos.user.UserResponse;
import com.dendau.backendspring.models.TableMenu;
import com.dendau.backendspring.models.Tables;
import com.dendau.backendspring.models.UserInfo;
import com.dendau.backendspring.repositories.TableMenuRepository;
import com.dendau.backendspring.repositories.TablesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Set;

@Service
public class TablesServiceImpl implements TablesService {

    @Autowired
    private TablesRepository tablesRepository;

    @Autowired
    private TableMenuRepository tableMenuRepository;


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
                oldTables.setIsEmpty(tables.getIsEmpty());
                oldTables.setIsTemporaryInvoice(tables.getIsTemporaryInvoice());
                oldTables.setIsProcessingNewspaper(tables.getIsProcessingNewspaper());
                oldTables.setTotalInvoice(tables.getTotalInvoice());
//                oldTables.setTable_menu(tableMenuRepository.findAllByTable(oldTables));
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
            System.out.println(tables.toString());
            if (tables != null) {
                GetTablesResponseDTO responseDTO = modelMapper.map(tables, GetTablesResponseDTO.class);
                Set<TableMenu> tableMenus = tableMenuRepository.findAllByTable(tables);
                Type setOfDTOsType = new TypeToken<List<GetTable_TableMenuDTO>>(){}.getType();
                List<GetTable_TableMenuDTO> responseTableMenu = modelMapper.map(tableMenus, setOfDTOsType);
                responseDTO.setTable_menu(responseTableMenu);
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
        responseDTO.forEach(index -> {
            Tables table = tablesRepository.findFirstById(index.getId());
            Set<TableMenu> tableMenus = tableMenuRepository.findAllByTable(table);
            Type setOfDTOsTypeTableMenu = new TypeToken<List<GetTable_TableMenuDTO>>(){}.getType();
            List<GetTable_TableMenuDTO> responseTableMenu = modelMapper.map(tableMenus, setOfDTOsTypeTableMenu);
            index.setTable_menu(responseTableMenu);
        });
        return responseDTO;
    }

    @Override
    public MessageDTO deleteTable(String id) {
        Long idTable = Long.parseLong(id);
        Tables table = tablesRepository.findFirstById(idTable);
        if (table != null) {
            tablesRepository.delete(table);
            MessageDTO response = new MessageDTO("Xoá thông tin bàn thành công!");
            return response;
        }
        else throw new RuntimeException("Can't find record table and menu with identifier: " + id);
    }
}
