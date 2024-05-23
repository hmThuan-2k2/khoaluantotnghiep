package com.dendau.backendspring.services.tables;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.table_menu.GetTable_TableMenuDTO;
import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesRequestDTO;
import com.dendau.backendspring.dtos.tables.SaveTablesResponseDTO;
import com.dendau.backendspring.models.ProcessingNewspaper;
import com.dendau.backendspring.models.TableMenu;
import com.dendau.backendspring.models.TableMenuKey;
import com.dendau.backendspring.models.Tables;
import com.dendau.backendspring.repositories.ProcessingNewspaperRepository;
import com.dendau.backendspring.repositories.ProvisionalInvoiceRepository;
import com.dendau.backendspring.repositories.TableMenuRepository;
import com.dendau.backendspring.repositories.TablesRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class TablesServiceImpl implements TablesService {

    @Autowired
    private TablesRepository tablesRepository;

    @Autowired
    private TableMenuRepository tableMenuRepository;

    @Autowired
    private ProcessingNewspaperRepository processingNewspaperRepository;


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

    @Override
    public MessageDTO processingNewspaperTable(String id) {
        Date date = new Date();
        Long idTable = Long.parseLong(id);
        GetTablesRequestDTO tablesRequestDTO = new GetTablesRequestDTO(idTable);
        GetTablesResponseDTO table = getTables(tablesRequestDTO);
        System.out.println(table.toString());
        Tables saveTable = new Tables(table.getId(),table.getName(),table.getIsEmpty(), table.getIsTemporaryInvoice(), true, table.getTotalInvoice(), null);
        saveTable = tablesRepository.save(saveTable);
        tablesRepository.refresh(saveTable);
        List<GetTable_TableMenuDTO> ds = table.getTable_menu();
        System.out.println(ds.toString());
        ds.forEach(index -> {
            Long amount_cooking = index.getAmount_cooking();
            Long amount = index.getAmount();
            if (amount > amount_cooking) {
                ProcessingNewspaper data = new ProcessingNewspaper();
                data.setIdTable(index.getId().getTableId());
                data.setIdMenu(index.getId().getMenuId());
                data.setDateCreate(date);
                data.setTimeCreate(date);
                data.setDateTimeCreate(date);
                data.setIsConfirm(false);
                data.setIsCooking(false);
                data.setNote(index.getNote());
                data.setAmount_cooking(amount - amount_cooking);
                data = processingNewspaperRepository.save(data);
                processingNewspaperRepository.refresh(data);
                TableMenuKey idKeyTableMenu = modelMapper.map(index.getId(), TableMenuKey.class);
                TableMenu tableMenu = tableMenuRepository.findFirstById(idKeyTableMenu);
                tableMenu.setAmount_cooking(tableMenu.getAmount());
                tableMenu.setIsCooking(true);
                tableMenu = tableMenuRepository.save(tableMenu);
                tableMenuRepository.refresh(tableMenu);
            }
        });
        MessageDTO response = new MessageDTO("Báo chế biến thành công!");
        return response;
    }
}
