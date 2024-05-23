package com.dendau.backendspring.services.processing_newspaper;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.processing_newspaper.GetProcessingNewspaperDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;

import java.util.Date;
import java.util.List;

public interface ProcessingNewspaperService {

    List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreate(Date dateCreate);

    List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreateAndConfirm(Date dateCreate, Boolean isConfirm);

    List<GetProcessingNewspaperDTO> getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(Date dateCreate, Boolean isConfirm, Boolean isCooking);

    MessageDTO confirmProcessingNewspaper(Long id);

    MessageDTO cookingProcessingNewspaper(Long id);
}
