package com.dendau.backendspring.services.processing_newspaper;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.processing_newspaper.GetProcessingNewspaperDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.table_menu.GetTable_TableMenuDTO;
import com.dendau.backendspring.dtos.tables.GetTablesRequestDTO;
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
    private ProvisionalInvoiceRepository provisionalInvoiceRepository;

    @Autowired
    private TableMenuRepository tableMenuRepository;

    @Autowired
    private TablesRepository tablesRepository;

    @Autowired
    private MenusRepository menusRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreate(Date dateCreate) {
        List<ProcessingNewspaper> ds = processingNewspaperRepository.findAllByDateCreate(dateCreate);
        ds.sort((o1, o2) -> o2.getDateTimeCreate().compareTo(o1.getDateTimeCreate()));
        List<GetProcessingNewspaperDTO> response = new ArrayList<GetProcessingNewspaperDTO>();
        ds.forEach(processingNewspaper -> {
            GetProcessingNewspaperDTO data = new GetProcessingNewspaperDTO();
            data.setId(processingNewspaper.getId());
            data.setMenu(menusRepository.findFirstById(processingNewspaper.getIdMenu()));
            data.setTable(tablesRepository.findFirstById(processingNewspaper.getIdTable()));
            data.setDateCreate(new SimpleDateFormat("dd/MM/yyyy").format(processingNewspaper.getDateCreate()));
            data.setTimeCreate(new SimpleDateFormat("HH:mm:ss").format(processingNewspaper.getTimeCreate()));
            data.setDateTimeCreate(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCreate()));
            if(processingNewspaper.getDateTimeCompleted() != null)
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
        ds.sort(Comparator.comparing(ProcessingNewspaper::getDateTimeCreate));
        List<GetProcessingNewspaperDTO> response = new ArrayList<GetProcessingNewspaperDTO>();
        ds.forEach(processingNewspaper -> {
            GetProcessingNewspaperDTO data = new GetProcessingNewspaperDTO();
            data.setId(processingNewspaper.getId());
            data.setMenu(menusRepository.findFirstById(processingNewspaper.getIdMenu()));
            data.setTable(tablesRepository.findFirstById(processingNewspaper.getIdTable()));
            data.setDateCreate(new SimpleDateFormat("dd/MM/yyyy").format(processingNewspaper.getDateCreate()));
            data.setTimeCreate(new SimpleDateFormat("HH:mm:ss").format(processingNewspaper.getTimeCreate()));
            data.setDateTimeCreate(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCreate()));
            if(processingNewspaper.getDateTimeCompleted() != null)
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
        if (isCooking)
            ds.sort((o1, o2) -> o2.getDateTimeCompleted().compareTo(o1.getDateTimeCompleted()));
        else ds.sort(Comparator.comparing(ProcessingNewspaper::getDateTimeCreate));
        List<GetProcessingNewspaperDTO> response = new ArrayList<GetProcessingNewspaperDTO>();
        ds.forEach(processingNewspaper -> {
            GetProcessingNewspaperDTO data = new GetProcessingNewspaperDTO();
            data.setId(processingNewspaper.getId());
            data.setMenu(menusRepository.findFirstById(processingNewspaper.getIdMenu()));
            data.setTable(tablesRepository.findFirstById(processingNewspaper.getIdTable()));
            data.setDateCreate(new SimpleDateFormat("dd/MM/yyyy").format(processingNewspaper.getDateCreate()));
            data.setTimeCreate(new SimpleDateFormat("HH:mm:ss").format(processingNewspaper.getTimeCreate()));
            data.setDateTimeCreate(new SimpleDateFormat("dd/MM/yyyy - HH:mm:ss").format(processingNewspaper.getDateTimeCreate()));
            if(processingNewspaper.getDateTimeCompleted() != null)
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
    public MessageDTO confirmProcessingNewspaper(Long id) {
        ProcessingNewspaper data = processingNewspaperRepository.findFirstById(id);
        if (data != null) {
            data.setIsConfirm(true);
            data = processingNewspaperRepository.save(data);
            processingNewspaperRepository.refresh(data);
            MessageDTO response = new MessageDTO("Xác nhận BCB thành công!", 1);
            return response;
        }
        else throw new RuntimeException("Can't find record processing newspaper with identifier: " + id);
    }

    @Override
    public MessageDTO cookingProcessingNewspaper(Long id) {
        Date date = new Date();
        ProcessingNewspaper data = processingNewspaperRepository.findFirstById(id);
        if (data != null) {
            data.setIsCooking(true);
            data.setDateTimeCompleted(date);
            data = processingNewspaperRepository.save(data);
            processingNewspaperRepository.refresh(data);
            MessageDTO response = new MessageDTO("Chế biến món ăn thành công!", 1);
            return response;
        }
        else throw new RuntimeException("Can't find record processing newspaper with identifier: " + id);
    }

    @Override
    public MessageDTO cancelProcessingNewspaper(Long id) {
        ProcessingNewspaper data = processingNewspaperRepository.findFirstById(id);
        if (data != null) {
            MessageDTO response;
            TableMenu tableMenu ;
            TableMenuKey tableMenuKey = new TableMenuKey(data.getIdTable(), data.getIdMenu());
            tableMenu = tableMenuRepository.findFirstById(tableMenuKey);
            if (tableMenu != null) {
                Tables table = tablesRepository.findFirstById(tableMenuKey.getTableId());
                Menus menu = menusRepository.findFirstById(tableMenuKey.getMenuId());
                if (table != null && menu != null) {
                    TableMenu oldTableMenu = tableMenuRepository.findFirstById(tableMenuKey);
                    if(oldTableMenu != null){
                        table.setIsProcessingNewspaper(false);
                        table = tablesRepository.save(table);
                        tablesRepository.refresh(table);

                        oldTableMenu.setIsCooking(false);
                        oldTableMenu.setAmount_cooking(oldTableMenu.getAmount_cooking() - data.getAmount_cooking());
                        oldTableMenu.setNote(oldTableMenu.getNote() + " (Bếp huỷ báo chế biến thực đơn số lượng " + data.getAmount_cooking() + " ) ");
                        tableMenuRepository.save(oldTableMenu);

                        processingNewspaperRepository.delete(data);

                        response = new MessageDTO("Huỷ phiếu báo chế biến thành công!", 1);
                    }
                    else throw new RuntimeException("Can't find record table and menu with identifier: " + tableMenuKey.getTableId() + "-" + tableMenuKey.getMenuId());
                }
                else throw new RuntimeException("Can't find record table and menu with identifier: " + tableMenuKey.getTableId() + "-" + tableMenuKey.getMenuId());
            }
            else {
                response = new MessageDTO("Thông tin hoá đơn bàn đã thanh toán, không thể huỷ phiếu báo chế biến!", 2);
            }
            return response;
        }
        else throw new RuntimeException("Can't find record processing newspaper with identifier: " + id);
    }
}
