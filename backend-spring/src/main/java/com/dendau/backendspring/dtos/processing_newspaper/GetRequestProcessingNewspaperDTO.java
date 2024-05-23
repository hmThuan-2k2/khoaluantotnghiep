package com.dendau.backendspring.dtos.processing_newspaper;

import com.dendau.backendspring.models.Menus;
import com.dendau.backendspring.models.Tables;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetRequestProcessingNewspaperDTO {
    private Long id;

    private Long idTable;
    private Long idMenu;

    private Date dateCreate;
    private Date timeCreate;
    private Date dateTimeCreate;
    private Date dateTimeCompleted;

    private Boolean isConfirm;
    private long amount_cooking;
    private Boolean isCooking;

    private String note;
}
