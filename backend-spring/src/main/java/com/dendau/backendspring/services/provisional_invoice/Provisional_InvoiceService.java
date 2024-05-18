package com.dendau.backendspring.services.provisional_invoice;

import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;

import java.util.List;

public interface Provisional_InvoiceService {

    GetProvisionalInvoiceDTO saveProvisional_InvoiceService(GetRequestProvisionalInvoiceDTO request);

    GetProvisionalInvoiceDTO getProvisional_InvoiceService(GetIdProvisionalInvoiceDTO request);

    List<GetProvisionalInvoiceDTO> getAllProvisional_InvoiceService();

}
