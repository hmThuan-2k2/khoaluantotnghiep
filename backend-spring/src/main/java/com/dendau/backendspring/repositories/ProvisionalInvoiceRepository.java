package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.Provisional_Invoice;
import com.dendau.backendspring.models.Tables;

public interface ProvisionalInvoiceRepository extends RefreshableCRUDRepository<Provisional_Invoice, Long> {
    public Provisional_Invoice findFirstById(Long id);
    public Provisional_Invoice findFirstByTables(Tables tables);
}
