package com.dendau.backendspring.dtos.tables;

import com.dendau.backendspring.models.TableMenu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class SaveTablesRequestDTO {
    private Long id;
    private String name;
    private boolean isTrong;
    private boolean isTamTinh;
    private boolean isBaoCheBien;
    private long total;
    private Set<TableMenu> table_menu;
}
