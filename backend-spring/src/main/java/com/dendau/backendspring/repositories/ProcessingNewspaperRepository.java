package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.ProcessingNewspaper;
import com.dendau.backendspring.models.Provisional_Invoice;

import java.util.Date;
import java.util.List;

public interface ProcessingNewspaperRepository extends RefreshableCRUDRepository<ProcessingNewspaper, Long> {
    public ProcessingNewspaper findFirstById(Long id);
    public List<ProcessingNewspaper> findAllByDateCreate(Date dateCreate);
    public List<ProcessingNewspaper> findAllByDateCreateAndIsConfirm(Date dateCreate,Boolean isConfirm);
    public List<ProcessingNewspaper> findAllByDateCreateAndIsConfirmAndIsCooking(Date dateCreate,Boolean isConfirm, Boolean isCooking);
}
