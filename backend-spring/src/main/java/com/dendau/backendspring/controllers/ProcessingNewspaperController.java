package com.dendau.backendspring.controllers;

import com.dendau.backendspring.dtos.MessageDTO;
import com.dendau.backendspring.dtos.processing_newspaper.GetProcessingNewspaperDTO;
import com.dendau.backendspring.dtos.provisional_Invoice.GetDateCreate;
import com.dendau.backendspring.services.processing_newspaper.ProcessingNewspaperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.List;

@RestController
@RequestMapping("/processing_newspaper")
public class ProcessingNewspaperController {

    @Autowired
    private ProcessingNewspaperService processingNewspaperService;


    @PostMapping("/all_date_create")
    public ResponseEntity<List<GetProcessingNewspaperDTO>> getAllProcessingNewspaperDateCreate(@RequestBody GetDateCreate request) {
        try {
            List<GetProcessingNewspaperDTO> response = processingNewspaperService.getAllProcessingNewspaperToDateCreate(new SimpleDateFormat("dd/MM/yyyy").parse(request.getDate()));
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/all_date_create_and_not_confirm")
    public ResponseEntity<List<GetProcessingNewspaperDTO>> getAllProcessingNewspaperToDateCreateAndConfirmIsNot(@RequestBody GetDateCreate request) {
        try {
            List<GetProcessingNewspaperDTO> response = processingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirm(new SimpleDateFormat("dd/MM/yyyy").parse(request.getDate()), false);
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/all_date_create_and_confirm_and_not_cooking")
    public ResponseEntity<List<GetProcessingNewspaperDTO>> getAllProcessingNewspaperToDateCreateAndConfirmAndNotCooking(@RequestBody GetDateCreate request) {
        try {
            List<GetProcessingNewspaperDTO> response = processingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(new SimpleDateFormat("dd/MM/yyyy").parse(request.getDate()), true, false);
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/all_date_create_and_confirm_and_cooking")
    public ResponseEntity<List<GetProcessingNewspaperDTO>> getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(@RequestBody GetDateCreate request) {
        try {
            List<GetProcessingNewspaperDTO> response = processingNewspaperService.getAllProcessingNewspaperToDateCreateAndConfirmAndCooking(new SimpleDateFormat("dd/MM/yyyy").parse(request.getDate()), true, true);
            return ResponseEntity.ok(response);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @GetMapping(value = "/confirm/{id}")
    public ResponseEntity<MessageDTO> confirmProcessingNewspaper(@PathVariable String id) {
        try {
            MessageDTO response = processingNewspaperService.confirmProcessingNewspaper(Long.valueOf(id));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping(value = "/cooking/{id}")
    public ResponseEntity<MessageDTO> cookingProcessingNewspaper(@PathVariable String id) {
        try {
            MessageDTO response = processingNewspaperService.cookingProcessingNewspaper(Long.valueOf(id));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
