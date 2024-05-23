package com.dendau.backendspring.dtos.processing_newspaper;

import com.dendau.backendspring.dtos.tables.GetTablesResponseDTO;
import com.dendau.backendspring.models.Customer;
import com.dendau.backendspring.models.Menus;
import com.dendau.backendspring.models.Tables;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetProcessingNewspaperDTO {
    private long id;

    private Tables table;
    private Menus menu;

    private String dateCreate;
    private String timeCreate;
    private String dateTimeCreate;
    private String dateTimeCompleted;

    private Boolean isConfirm;
    private long amount_cooking;
    private Boolean isCooking;

    private String note;
}
