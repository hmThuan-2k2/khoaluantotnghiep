package com.dendau.backendspring.services.invoice;

import com.dendau.backendspring.dtos.invoice.GetIdInvoiceDTO;
import com.dendau.backendspring.dtos.invoice.GetInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.table_menu.GetTable_TableMenuDTO;
import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.dtos.user.UserResponse;
import com.dendau.backendspring.models.*;
import com.dendau.backendspring.repositories.*;
import com.dendau.backendspring.services.provisional_invoice.Provisional_InvoiceService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private ProvisionalInvoiceRepository provisionalInvoiceRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TableMenuRepository tableMenuRepository;

    @Autowired
            private  TablesRepository tablesRepository;

    ModelMapper modelMapper = new ModelMapper();

    @Override
    public GetInvoiceDTO saveInvoiceService(GetIdProvisionalInvoiceDTO request) {
        if (request.getId() != null) {
            Provisional_Invoice provisional_invoice = provisionalInvoiceRepository.findFirstById(request.getId());
            if (provisional_invoice != null) {
                Date date = new Date();
                Invoice saves = null;
                Customer customer;
                if (provisional_invoice.getCustomer() != null) {
                    customer = customerRepository.findFirstById(provisional_invoice.getCustomer().getId());
                }
                else {
                    customer = null;
                }
                Invoice invoice = new Invoice();
                invoice.setDateCreate(date);
                invoice.setDateTimeCreate(date);
                invoice.setTimeCreate(date);
                invoice.setDateTimeIn(provisional_invoice.getDateTimeIn());
                invoice.setIntoMoney(provisional_invoice.getTotalMoney());
                invoice.setDiscount(provisional_invoice.getDiscount());
                invoice.setSurcharge(provisional_invoice.getSurcharge());
                invoice.setTotalMoney(
                        provisional_invoice.getTotalMoney()
                                - provisional_invoice.getDiscount() * provisional_invoice.getTotalMoney() / 100
                                + provisional_invoice.getSurcharge() * provisional_invoice.getTotalMoney() / 100
                );
                invoice.setCustomer(customer);
                saves = invoiceRepository.save(invoice);
                invoiceRepository.refresh(saves);

                Tables tables = provisional_invoice.getTables();
                Set<TableMenu> tableMenuList = tableMenuRepository.findAllByTable(tables);
                tableMenuRepository.deleteAll(tableMenuList);

                tables.setIsEmpty(true);
                tables.setIsProcessingNewspaper(false);
                tables.setIsTemporaryInvoice(false);
                tables.setTotalInvoice(0);
                tables = tablesRepository.save(tables);
                tablesRepository.refresh(tables);

                provisionalInvoiceRepository.delete(provisional_invoice);

                GetInvoiceDTO response = modelMapper.map(saves, GetInvoiceDTO.class);
                response.setDateTimeCreate(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(saves.getDateTimeCreate()));
                response.setDateTimeIn(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(saves.getDateTimeIn()));
                return response;
            }
            else throw new RuntimeException("Can't find record with identifier: " + request.getId());
        }
        else {
            throw new RuntimeException("Parameter id Provisional Invoice is not found in request..!!");
        }
    }

    @Override
    public GetInvoiceDTO getInvoiceService(GetIdInvoiceDTO request) {
        if(request.getId() != null) {
            Invoice invoice = invoiceRepository.findFirstById(request.getId());
            if (invoice != null) {
                GetInvoiceDTO response = modelMapper.map(invoice, GetInvoiceDTO.class);
                response.setDateTimeCreate(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(invoice.getDateTimeCreate()));
                response.setDateTimeIn(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(invoice.getDateTimeIn()));
                return response;
            }
            else throw new RuntimeException("Can't find record with identifier: " + request.getId());
        }
        else throw new RuntimeException("Parameter id Invoice is not found in request..!!");
    }

    @Override
    public List<GetInvoiceDTO> getAllInvoiceService() {
        List<Invoice> invoices = (List<Invoice>) invoiceRepository.findAll();
//        Type setOfDTOsType = new TypeToken<List<GetInvoiceDTO>>(){}.getType();
//        List<GetInvoiceDTO> invoicesResponses = modelMapper.map(invoices, setOfDTOsType);
        List<GetInvoiceDTO> invoicesResponses = new ArrayList<GetInvoiceDTO>();
        invoices.forEach(invoice -> {
            GetInvoiceDTO data = new GetInvoiceDTO();
            data.setId(invoice.getId());
            data.setDateTimeCreate(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(invoice.getDateTimeCreate()));
            data.setDateTimeIn(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(invoice.getDateTimeIn()));
            data.setIntoMoney(invoice.getIntoMoney());
            data.setDiscount(invoice.getDiscount());
            data.setSurcharge(invoice.getSurcharge());
            data.setTotalMoney(invoice.getTotalMoney());
            data.setCustomer(invoice.getCustomer());
            invoicesResponses.add(data);
        });
        return invoicesResponses;
    }

    @Override
    public List<GetInvoiceDTO> getAllInvoiceToDateCreate(Date dateCreate) {
        List<Invoice> invoices = (List<Invoice>) invoiceRepository.findAllByDateCreate(dateCreate);
//        Type setOfDTOsType = new TypeToken<List<GetInvoiceDTO>>(){}.getType();
//        List<GetInvoiceDTO> invoicesResponses = modelMapper.map(invoices, setOfDTOsType);
        List<GetInvoiceDTO> invoicesResponses = new ArrayList<GetInvoiceDTO>();
        invoices.forEach(invoice -> {
            GetInvoiceDTO data = new GetInvoiceDTO();
            data.setId(invoice.getId());
            data.setDateTimeCreate(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(invoice.getDateTimeCreate()));
            data.setDateTimeIn(new SimpleDateFormat("HH:mm, dd/MM/yyyy").format(invoice.getDateTimeIn()));
            data.setIntoMoney(invoice.getIntoMoney());
            data.setDiscount(invoice.getDiscount());
            data.setSurcharge(invoice.getSurcharge());
            data.setTotalMoney(invoice.getTotalMoney());
            data.setCustomer(invoice.getCustomer());
            invoicesResponses.add(data);
        });
        return invoicesResponses;
    }
}
