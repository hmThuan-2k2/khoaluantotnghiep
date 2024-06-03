package com.dendau.backendspring.dtos.invoice;

import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.models.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetInvoiceDTO {
    private Long id;

    private String dateTimeCreate;
    private String dateTimeIn;

    private Long intoMoney;
    private int discount;
    private int surcharge;
    private Long totalMoney;

    private Customer customer;
}
