package com.dendau.backendspring.dtos.table_menu;

import com.dendau.backendspring.models.Menus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetTable_TableMenuDTO {
    private TableMenuKeyDTO id;
    private long amount;
    private long price_unit;
    private Boolean isCooking;
    private String note;

    private Menus menu;
}
