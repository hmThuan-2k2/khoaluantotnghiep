package com.dendau.backendspring.dtos.provisional_Invoice;

import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.models.Tables;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetProvisionalInvoiceDTO {
    private Long id;
    private String timeIn;
    private String timeOut;
    private String timePrintInvoice;
    private Long totalMoney;
    private int discount;
    private int surcharge;
    private long idCustomer;

    private GetTablesResponseDTO tables;
}
