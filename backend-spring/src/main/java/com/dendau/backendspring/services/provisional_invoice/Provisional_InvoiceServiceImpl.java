package com.dendau.backendspring.services.provisional_invoice;

import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.table_menu.*;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.models.*;
import com.dendau.backendspring.repositories.MenusRepository;
import com.dendau.backendspring.repositories.ProvisionalInvoiceRepository;
import com.dendau.backendspring.repositories.TableMenuRepository;
import com.dendau.backendspring.repositories.TablesRepository;
import com.dendau.backendspring.services.table_menu.TableMenuService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class Provisional_InvoiceServiceImpl implements Provisional_InvoiceService {

    @Autowired
    private TableMenuRepository tableMenuRepository;

    @Autowired
    private TablesRepository tablesRepository;

    @Autowired
    private ProvisionalInvoiceRepository provisionalInvoiceRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public GetProvisionalInvoiceDTO saveProvisional_InvoiceService(GetRequestProvisionalInvoiceDTO request) {
        if(request.getIdTable() == null){
            throw new RuntimeException("Parameter id table is not found in request..!!");
        }
        Date date = new Date();
        Provisional_Invoice saves = null;
        Tables table = tablesRepository.findFirstById(request.getIdTable());
        if (table != null) {
            if (request.getId() != null) {
                Provisional_Invoice oldProvisional_Invoice = provisionalInvoiceRepository.findFirstById(request.getId());
                if (oldProvisional_Invoice != null) {
                    oldProvisional_Invoice.setDiscount(request.getDiscount());
                    oldProvisional_Invoice.setSurcharge(request.getSurcharge());
                    oldProvisional_Invoice.setIdCustomer(request.getIdCustomer());
                    oldProvisional_Invoice.setTotalMoney(table.getTotalInvoice());
                    oldProvisional_Invoice.setTables(table);
                    saves = provisionalInvoiceRepository.save(oldProvisional_Invoice);
                    provisionalInvoiceRepository.refresh(saves);
                }
                else throw new RuntimeException("Can't find record id table menu with identifier: " + request.getId());
            }
            else {
                Provisional_Invoice oldProvisional_Invoice = new Provisional_Invoice();
                oldProvisional_Invoice.setDateTimeIn(date);
                oldProvisional_Invoice.setDateTimePrintInvoice(null);
                oldProvisional_Invoice.setDiscount(request.getDiscount());
                oldProvisional_Invoice.setSurcharge(request.getSurcharge());
                oldProvisional_Invoice.setIdCustomer(request.getIdCustomer());
                oldProvisional_Invoice.setTotalMoney(table.getTotalInvoice());
                oldProvisional_Invoice.setTables(table);
                saves = provisionalInvoiceRepository.save(oldProvisional_Invoice);
                provisionalInvoiceRepository.refresh(saves);
            }
            GetProvisionalInvoiceDTO response = modelMapper.map(saves, GetProvisionalInvoiceDTO.class);
            GetTablesResponseDTO responseDTO = modelMapper.map(table, GetTablesResponseDTO.class);
            Set<TableMenu> tableMenus = tableMenuRepository.findAllByTable(table);
            Type setOfDTOsType = new TypeToken<List<GetTable_TableMenuDTO>>(){}.getType();
            List<GetTable_TableMenuDTO> responseTableMenu = modelMapper.map(tableMenus, setOfDTOsType);
            responseDTO.setTable_menu(responseTableMenu);
            if (saves.getDateTimeIn() != null)
                response.setDateTimeIn(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss")
                    .format(saves.getDateTimeIn()));
            else response.setDateTimeIn(null);
            if (saves.getDateTimePrintInvoice() != null)
                response.setDateTimePrintInvoice(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss")
                    .format(saves.getDateTimePrintInvoice()));
            else response.setDateTimePrintInvoice(null);
            response.setTables(responseDTO);
            return response;
        }
        else throw new RuntimeException("Can't find record table and menu with identifier: " + request.getIdTable());
    }

    @Override
    public GetProvisionalInvoiceDTO getProvisional_InvoiceService(GetIdProvisionalInvoiceDTO request) {
        if(request.getId() != null) {
            Provisional_Invoice provisional_invoice = provisionalInvoiceRepository.findFirstById(request.getId());
            if (provisional_invoice != null) {
                GetProvisionalInvoiceDTO response = modelMapper.map(provisional_invoice, GetProvisionalInvoiceDTO.class);
                Tables table = tablesRepository.findFirstById(provisional_invoice.getTables().getId());
                GetTablesResponseDTO responseDTO = modelMapper.map(table, GetTablesResponseDTO.class);
                Set<TableMenu> tableMenus = tableMenuRepository.findAllByTable(table);
                Type setOfDTOsType = new TypeToken<List<GetTable_TableMenuDTO>>(){}.getType();
                List<GetTable_TableMenuDTO> responseTableMenu = modelMapper.map(tableMenus, setOfDTOsType);
                responseDTO.setTable_menu(responseTableMenu);
                if (provisional_invoice.getDateTimeIn() != null)
                    response.setDateTimeIn(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss")
                            .format(provisional_invoice.getDateTimeIn()));
                else response.setDateTimeIn(null);
                if (provisional_invoice.getDateTimePrintInvoice() != null)
                    response.setDateTimePrintInvoice(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss")
                            .format(provisional_invoice.getDateTimePrintInvoice()));
                else response.setDateTimePrintInvoice(null);
                response.setTables(responseDTO);
                response.setTables(responseDTO);
                return response;
            }
            else throw new RuntimeException("Can't find record with identifier: " + request.getId());
        }
        else throw new RuntimeException("Parameter id is not found in request..!!");
    }

    @Override
    public List<GetProvisionalInvoiceDTO> getAllProvisional_InvoiceService() {
        List<Provisional_Invoice> provisionalInvoices = (List<Provisional_Invoice>) provisionalInvoiceRepository.findAll();
        Type setOfDTOsType = new TypeToken<List<GetProvisionalInvoiceDTO>>(){}.getType();
        List<GetProvisionalInvoiceDTO> response = modelMapper.map(provisionalInvoices, setOfDTOsType);
        response.forEach(index -> {
            GetTablesResponseDTO tables = index.getTables();
            Tables table = tablesRepository.findFirstById(tables.getId());
            Set<TableMenu> tableMenus = tableMenuRepository.findAllByTable(table);
            Type setOfDTOsTypeTableMenu = new TypeToken<List<GetTable_TableMenuDTO>>(){}.getType();
            List<GetTable_TableMenuDTO> responseTableMenu = modelMapper.map(tableMenus, setOfDTOsTypeTableMenu);
            tables.setTable_menu(responseTableMenu);
            index.setTables(tables);
            Provisional_Invoice provisional_invoice = provisionalInvoiceRepository.findFirstById(index.getId());
            if (provisional_invoice.getDateTimeIn() != null)
                index.setDateTimeIn(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss")
                        .format(provisional_invoice.getDateTimeIn()));
            else index.setDateTimeIn(null);
            if (provisional_invoice.getDateTimePrintInvoice() != null)
                index.setDateTimePrintInvoice(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss")
                        .format(provisional_invoice.getDateTimePrintInvoice()));
            else index.setDateTimePrintInvoice(null);
        });
        return response;
    }
}
