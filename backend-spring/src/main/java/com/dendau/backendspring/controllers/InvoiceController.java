package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.invoice.GetIdInvoiceDTO;
import com.dendau.backendspring.dtos.invoice.GetInvoiceDTO;
import com.dendau.backendspring.dtos.processing_newspaper.GetProcessingNewspaperDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetDateCreate;
import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;
import com.dendau.backendspring.services.invoice.InvoiceService;
import com.dendau.backendspring.services.provisional_invoice.Provisional_InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    @PostMapping(value = "/save")
    public ResponseEntity<GetInvoiceDTO> saveInvoiceService(@RequestBody GetIdProvisionalInvoiceDTO request) {
        try {
            GetInvoiceDTO response = invoiceService.saveInvoiceService(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetInvoiceDTO>> getAllInvoiceService() {
        try {
            List<GetInvoiceDTO> response = invoiceService.getAllInvoiceService();
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/detail")
    public ResponseEntity<GetInvoiceDTO> getInvoiceService(@RequestBody GetIdInvoiceDTO request) {
        try {
            GetInvoiceDTO response = invoiceService.getInvoiceService(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/all_date_create")
    public ResponseEntity<List<GetInvoiceDTO>> getAllProcessingNewspaperDateCreate(@RequestBody GetDateCreate request) {
        try {
            List<GetInvoiceDTO> response = invoiceService.getAllInvoiceToDateCreate(new SimpleDateFormat("dd/MM/yyyy").parse(request.getDate()));
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
