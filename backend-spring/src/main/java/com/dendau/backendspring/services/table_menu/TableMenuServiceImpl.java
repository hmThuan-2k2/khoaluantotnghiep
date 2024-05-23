package com.dendau.backendspring.services.table_menu;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.menus_group.GetMenusGroupDTO;
import com.dendau.backendspring.dtos.menus_group.IdMenusGroupDTO;
import com.dendau.backendspring.dtos.table_menu.*;
import com.dendau.backendspring.models.*;
import com.dendau.backendspring.repositories.*;
import com.dendau.backendspring.services.menus_group.MenusGroupService;
import jakarta.persistence.Table;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.List;

@Service
public class TableMenuServiceImpl implements TableMenuService {

    @Autowired
    private TableMenuRepository tableMenuRepository;
    @Autowired
    private TablesRepository tablesRepository;
    @Autowired
    private MenusRepository menusRepository;

    ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private ProvisionalInvoiceRepository provisionalInvoiceRepository;

    @Override
    public GetTableMenuDTO selectMenuTable(IdTableMenuDTO request) {
        TableMenuKeyDTO tableMenuKeyDTO = request.getId();
        if(tableMenuKeyDTO.getMenuId() == null){
            throw new RuntimeException("Parameter id menu is not found in request..!!");
        } else if (tableMenuKeyDTO.getTableId() == null) {
            throw new RuntimeException("Parameter id table is not found in request..!!");
        }
        TableMenu select = null;
        TableMenuKey tableMenuKey = modelMapper.map(tableMenuKeyDTO, TableMenuKey.class);
        Tables table = tablesRepository.findFirstById(tableMenuKey.getTableId());
        Menus menu = menusRepository.findFirstById(tableMenuKey.getMenuId());
        if (table != null ) {
            if (menu != null) {
                TableMenu oldTableMenu = tableMenuRepository.findFirstById(tableMenuKey);
                if (oldTableMenu != null) {
                    oldTableMenu.setId(tableMenuKey);
                    oldTableMenu.setTable(table);
                    oldTableMenu.setMenu(menu);
                    oldTableMenu.setAmount(oldTableMenu.getAmount() + 1);
                    oldTableMenu.setAmount_cooking(oldTableMenu.getAmount_cooking());
                    oldTableMenu.setPrice_unit(oldTableMenu.getPrice_unit());
                    oldTableMenu.setIsCooking(false);
                    oldTableMenu.setNote(oldTableMenu.getNote());
                    select = tableMenuRepository.save(oldTableMenu);
                    tableMenuRepository.refresh(select);
                } else {
                    oldTableMenu = new TableMenu(tableMenuKey, table, menu, 1, menu.getPrice_sale(), 0, false, null);
                    select = tableMenuRepository.save(oldTableMenu);
                    tableMenuRepository.refresh(select);
                }
                table.setIsEmpty(false);
                table.setIsProcessingNewspaper(false);
                table.setTotalInvoice(table.getTotalInvoice() + oldTableMenu.getPrice_unit());
                table = tablesRepository.save(table);
                tablesRepository.refresh(table);

                menu.setInventory(menu.getInventory() - 1);
                menu = menusRepository.save(menu);
                menusRepository.refresh(menu);

                GetTableMenuDTO response = modelMapper.map(select, GetTableMenuDTO.class);
                return response;
            }
            else throw new RuntimeException("Can't find record menu with identifier: " + tableMenuKeyDTO.getMenuId());
        }
        else throw new RuntimeException("Can't find record table with identifier: " + tableMenuKeyDTO.getTableId());
    }

    @Override
    public GetTableMenuDTO saveTableMenu(PutTableMenuDTO request) {
        TableMenuKeyDTO tableMenuKeyDTO = request.getId();
        if(tableMenuKeyDTO.getMenuId() == null){
            throw new RuntimeException("Parameter id menu is not found in request..!!");
        } else if (tableMenuKeyDTO.getTableId() == null) {
            throw new RuntimeException("Parameter id table is not found in request..!!");
        }
        TableMenu saves = null;
        TableMenuKey tableMenuKey = modelMapper.map(tableMenuKeyDTO, TableMenuKey.class);
        TableMenu tableMenu = modelMapper.map(request, TableMenu.class);
        Tables table = tablesRepository.findFirstById(tableMenuKey.getTableId());
        Menus menu = menusRepository.findFirstById(tableMenuKey.getMenuId());
        if (table != null && menu != null) {
            TableMenu oldTableMenu = tableMenuRepository.findFirstById(tableMenuKey);
            if(oldTableMenu != null){
                table.setIsEmpty(false);
                table.setIsProcessingNewspaper(false);
                table.setTotalInvoice(table.getTotalInvoice() - (oldTableMenu.getPrice_unit() * oldTableMenu.getAmount()) + (tableMenu.getPrice_unit() * tableMenu.getAmount()) );
                table = tablesRepository.save(table);
                tablesRepository.refresh(table);

                menu.setInventory(menu.getInventory() + oldTableMenu.getAmount() - tableMenu.getAmount() );
                menu = menusRepository.save(menu);
                menusRepository.refresh(menu);

                oldTableMenu.setId(tableMenuKey);
                oldTableMenu.setTable(table);
                oldTableMenu.setMenu(menu);
                if (oldTableMenu.getAmount() <= tableMenu.getAmount()) {
                    oldTableMenu.setAmount_cooking(oldTableMenu.getAmount_cooking());
                    if (oldTableMenu.getAmount_cooking() == tableMenu.getAmount())
                        oldTableMenu.setIsCooking(true);
                    else oldTableMenu.setIsCooking(false);
                }
                else {
                    if (oldTableMenu.getAmount_cooking() >= tableMenu.getAmount()) {
                        oldTableMenu.setAmount_cooking(tableMenu.getAmount());
                        oldTableMenu.setIsCooking(true);
                    }
                    else {
                        oldTableMenu.setAmount_cooking(oldTableMenu.getAmount_cooking());
                        oldTableMenu.setIsCooking(false);
                    }
                }
                oldTableMenu.setAmount(tableMenu.getAmount());
                oldTableMenu.setPrice_unit(tableMenu.getPrice_unit());
                oldTableMenu.setNote(tableMenu.getNote());
                saves = tableMenuRepository.save(oldTableMenu);
                tableMenuRepository.refresh(saves);
                GetTableMenuDTO response = modelMapper.map(saves, GetTableMenuDTO.class);
                return response;
            }
            else throw new RuntimeException("Can't find record table and menu with identifier: " + request.getId());
        }
        else throw new RuntimeException("Can't find record table and menu with identifier: " + request.getId());
    }

    @Override
    public GetTableMenuDTO getTableMenuId(IdTableMenuDTO request) {
        if(request.getId() != null) {
            TableMenuKeyDTO tableMenuKeyDTO = request.getId();
            if(tableMenuKeyDTO.getMenuId() == null){
                throw new RuntimeException("Parameter id menu is not found in request..!!");
            } else if (tableMenuKeyDTO.getTableId() == null) {
                throw new RuntimeException("Parameter id table is not found in request..!!");
            }
            TableMenuKey tableMenuKey = modelMapper.map(tableMenuKeyDTO, TableMenuKey.class);
            TableMenu tableMenu = tableMenuRepository.findFirstById(tableMenuKey);
            if (tableMenu != null) {
                GetTableMenuDTO response = modelMapper.map(tableMenu, GetTableMenuDTO.class);
                return response;
            }
            else throw new RuntimeException("Can't find record with identifier: " + request.getId());
        }
        else throw new RuntimeException("Parameter id is not found in request..!!");
    }

    @Override
    public List<GetTableMenuDTO> getAllTableMenu() {
        List<TableMenu> tableMenus = (List<TableMenu>) tableMenuRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<GetTableMenuDTO>>(){}.getType();
        List<GetTableMenuDTO> response = modelMapper.map(tableMenus, setOfDTOsType);
        return response;
    }

    @Override
    public MessageDTO deleteTableMenu(IdTableMenuDTO request) {
        TableMenuKeyDTO tableMenuKeyDTO = request.getId();
        if(tableMenuKeyDTO.getMenuId() == null){
            throw new RuntimeException("Parameter id menu is not found in request..!!");
        } else if (tableMenuKeyDTO.getTableId() == null) {
            throw new RuntimeException("Parameter id table is not found in request..!!");
        }
        TableMenu select = null;
        TableMenuKey tableMenuKey = modelMapper.map(tableMenuKeyDTO, TableMenuKey.class);
        Tables table = tablesRepository.findFirstById(tableMenuKey.getTableId());
        Menus menu = menusRepository.findFirstById(tableMenuKey.getMenuId());
        if (table != null && menu != null) {
            TableMenu oldTableMenu = tableMenuRepository.findFirstById(tableMenuKey);
            if(oldTableMenu != null){
                table.setTotalInvoice(table.getTotalInvoice() - (oldTableMenu.getPrice_unit() * oldTableMenu.getAmount()));
                if (table.getTotalInvoice() == 0) {
                    Provisional_Invoice provisional_invoice = provisionalInvoiceRepository.findFirstByTables(table);
                    provisionalInvoiceRepository.delete(provisional_invoice);
                    table.setIsEmpty(true);
                    table.setIsTemporaryInvoice(false);
                    table.setIsProcessingNewspaper(false);
                }
                else {
                    table.setIsEmpty(false);
                }
                table = tablesRepository.save(table);
                tablesRepository.refresh(table);

                menu.setInventory(menu.getInventory() + oldTableMenu.getAmount());
                menu = menusRepository.save(menu);
                menusRepository.refresh(menu);

                tableMenuRepository.delete(oldTableMenu);
                MessageDTO response = new MessageDTO("Deleted data successfully!");
                return response;
            }
            else throw new RuntimeException("Can't find record table and menu with identifier: " + request.getId());
        }
        else throw new RuntimeException("Can't find record table and menu with identifier: " + request.getId());
    }
}
