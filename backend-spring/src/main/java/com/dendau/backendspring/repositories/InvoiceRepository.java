package com.dendau.backendspring.repositories;

import com.dendau.backendspring.helpers.RefreshableCRUDRepository;
import com.dendau.backendspring.models.Customer;
import com.dendau.backendspring.models.Invoice;
import com.dendau.backendspring.models.Provisional_Invoice;
import com.dendau.backendspring.models.Tables;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

public interface InvoiceRepository extends RefreshableCRUDRepository<Invoice, Long> {
    public Invoice findFirstById(Long id);
    public Invoice findFirstByCustomer(Customer customer);
    public List<Invoice> findAllByDateCreate(Date dateCreate);
}
