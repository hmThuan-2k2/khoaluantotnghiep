package com.dendau.backendspring.services.invoice;

import com.dendau.backendspring.dtos.invoice.GetIdInvoiceDTO;
import com.dendau.backendspring.dtos.invoice.GetInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;

import java.util.Date;
import java.util.List;

public interface InvoiceService {

    GetInvoiceDTO saveInvoiceService(GetIdProvisionalInvoiceDTO request);

    GetInvoiceDTO getInvoiceService(GetIdInvoiceDTO request);

    List<GetInvoiceDTO> getAllInvoiceService();

    List<GetInvoiceDTO> getAllInvoiceToDateCreate(Date dateCreate);

}
