package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.provisional_Invoice.GetIdProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetRequestProvisionalInvoiceDTO;
import com.dendau.backendspring.dtos.table_menu.GetTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.IdTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PostTableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PutTableMenuDTO;
import com.dendau.backendspring.services.provisional_invoice.Provisional_InvoiceService;
import com.dendau.backendspring.services.table_menu.TableMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provisional_invoice")
public class Provisional_InvoiceController {

    @Autowired
    private Provisional_InvoiceService provisionalInvoiceService;

    @PostMapping(value = "/save")
    public ResponseEntity<GetProvisionalInvoiceDTO> saveProvisional_InvoiceService(@RequestBody GetRequestProvisionalInvoiceDTO request) {
        try {
            GetProvisionalInvoiceDTO response = provisionalInvoiceService.saveProvisional_InvoiceService(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<GetProvisionalInvoiceDTO>> getAllProvisional_InvoiceService() {
        try {
            List<GetProvisionalInvoiceDTO> response = provisionalInvoiceService.getAllProvisional_InvoiceService();
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    @PostMapping("/detail")
    public ResponseEntity<GetProvisionalInvoiceDTO> getProvisional_InvoiceService(@RequestBody GetIdProvisionalInvoiceDTO request) {
        try {
            GetProvisionalInvoiceDTO response = provisionalInvoiceService.getProvisional_InvoiceService(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/print_invoice")
    public ResponseEntity<GetProvisionalInvoiceDTO> printInvoiceProvisional_InvoiceService(@RequestBody GetIdProvisionalInvoiceDTO request) {
        try {
            GetProvisionalInvoiceDTO response = provisionalInvoiceService.printInvoiceProvisional_InvoiceService(request);
            return ResponseEntity.ok().body(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
