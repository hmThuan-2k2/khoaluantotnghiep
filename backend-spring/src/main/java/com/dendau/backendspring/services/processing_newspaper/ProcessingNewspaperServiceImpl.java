package com.dendau.backendspring.services.processing_newspaper;

import com.dendau.backendspring.dtos.processing_newspaper.GetProcessingNewspaperDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.table_menu.GetTable_TableMenuDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.models.*;
import com.dendau.backendspring.repositories.*;
import com.dendau.backendspring.services.provisional_invoice.Provisional_InvoiceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ProcessingNewspaperServiceImpl implements ProcessingNewspaperService {

    @Autowired
    private ProcessingNewspaperRepository processingNewspaperRepository;

    @Autowired
    private TableMenuRepository tableMenuRepository;

    @Autowired
    private TablesRepository tablesRepository;

    @Autowired
    private MenusRepository menusRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public GetProvisionalInvoiceDTO saveProvisional_InvoiceService(GetRequestProvisionalInvoiceDTO request) {
        if(request.getIdTable() == null){
            throw new RuntimeException("Parameter id table is not found in request..!!");
        }
        Date date = new Date();
        Provisional_Invoice saves = null;
        Customer customer;
        if (request.getIdCustomer() != null) {
            customer = customerRepository.findFirstById(request.getIdCustomer());
        }
        else customer = null;
        Tables table = tablesRepository.findFirstById(request.getIdTable());
        if (table != null) {
            if (request.getId() != null) {
                Provisional_Invoice oldProvisional_Invoice = provisionalInvoiceRepository.findFirstById(request.getId());
                if (oldProvisional_Invoice != null) {
                    oldProvisional_Invoice.setDiscount(request.getDiscount());
                    oldProvisional_Invoice.setSurcharge(request.getSurcharge());
                    oldProvisional_Invoice.setCustomer(customer);
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
                oldProvisional_Invoice.setCustomer(customer);
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
    public GetProvisionalInvoiceDTO printInvoiceProvisional_InvoiceService(GetIdProvisionalInvoiceDTO request) {
        Date date = new Date();
        if(request.getId() != null) {
            Provisional_Invoice provisional_invoice = provisionalInvoiceRepository.findFirstById(request.getId());
            if (provisional_invoice != null) {
                provisional_invoice.setDateTimePrintInvoice(date);
                provisional_invoice = provisionalInvoiceRepository.save(provisional_invoice);
                provisionalInvoiceRepository.refresh(provisional_invoice);
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

    @Override
    public List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreate(Date dateCreate) {
        List<ProcessingNewspaper> ds = processingNewspaperRepository.findAllByDateCreate(dateCreate);
        ds.sort(new ProcessingNewspaperComparator());
        List<GetProcessingNewspaperDTO> response = new ArrayList<GetProcessingNewspaperDTO>();
        ds.forEach(processingNewspaper -> {
            GetProcessingNewspaperDTO data = new GetProcessingNewspaperDTO();
            data.setId(processingNewspaper.getId());
            data.setMenu(menusRepository.findFirstById(processingNewspaper.getIdMenu()));
            data.setTable(tablesRepository.findFirstById(processingNewspaper.getIdTable()));
            data.setDateCreate(new SimpleDateFormat("dd/MM/yyyy").format(processingNewspaper.getDateCreate()));
            data.setTimeCreate(new SimpleDateFormat("HH:mm:ss").format(processingNewspaper.getTimeCreate()));
            data.setDateTimeCreate(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCreate()));
            data.setDateTimeCompleted(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCompleted()));
            data.setIsConfirm(processingNewspaper.getIsConfirm());
            data.setAmount_cooking(processingNewspaper.getAmount_cooking());
            data.setIsCooking(processingNewspaper.getIsCooking());
            data.setNote(processingNewspaper.getNote());
            response.add(data);
        });
        return response;
    }

    @Override
    public List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreateAndConfirm(Date dateCreate, Boolean isConfirm) {
        List<ProcessingNewspaper> ds = processingNewspaperRepository.findAllByDateCreateAndIsConfirm(dateCreate, isConfirm);
        ds.sort(new ProcessingNewspaperComparator());
        List<GetProcessingNewspaperDTO> response = new ArrayList<GetProcessingNewspaperDTO>();
        ds.forEach(processingNewspaper -> {
            GetProcessingNewspaperDTO data = new GetProcessingNewspaperDTO();
            data.setId(processingNewspaper.getId());
            data.setMenu(menusRepository.findFirstById(processingNewspaper.getIdMenu()));
            data.setTable(tablesRepository.findFirstById(processingNewspaper.getIdTable()));
            data.setDateCreate(new SimpleDateFormat("dd/MM/yyyy").format(processingNewspaper.getDateCreate()));
            data.setTimeCreate(new SimpleDateFormat("HH:mm:ss").format(processingNewspaper.getTimeCreate()));
            data.setDateTimeCreate(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCreate()));
            data.setDateTimeCompleted(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCompleted()));
            data.setIsConfirm(processingNewspaper.getIsConfirm());
            data.setAmount_cooking(processingNewspaper.getAmount_cooking());
            data.setIsCooking(processingNewspaper.getIsCooking());
            data.setNote(processingNewspaper.getNote());
            response.add(data);
        });
        return response;
    }

    @Override
    public List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(Date dateCreate, Boolean isConfirm, Boolean isCooking) {
        List<ProcessingNewspaper> ds = processingNewspaperRepository.findAllByDateCreateAndIsConfirmAndIsCooking(dateCreate, isConfirm, isCooking);
        ds.sort(new ProcessingNewspaperComparator());
        List<GetProcessingNewspaperDTO> response = new ArrayList<GetProcessingNewspaperDTO>();
        ds.forEach(processingNewspaper -> {
            GetProcessingNewspaperDTO data = new GetProcessingNewspaperDTO();
            data.setId(processingNewspaper.getId());
            data.setMenu(menusRepository.findFirstById(processingNewspaper.getIdMenu()));
            data.setTable(tablesRepository.findFirstById(processingNewspaper.getIdTable()));
            data.setDateCreate(new SimpleDateFormat("dd/MM/yyyy").format(processingNewspaper.getDateCreate()));
            data.setTimeCreate(new SimpleDateFormat("HH:mm:ss").format(processingNewspaper.getTimeCreate()));
            data.setDateTimeCreate(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCreate()));
            data.setDateTimeCompleted(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCompleted()));
            data.setIsConfirm(processingNewspaper.getIsConfirm());
            data.setAmount_cooking(processingNewspaper.getAmount_cooking());
            data.setIsCooking(processingNewspaper.getIsCooking());
            data.setNote(processingNewspaper.getNote());
            response.add(data);
        });
        return response;
    }
}
