package com.dendau.backendspring.dtos.tables;

import com.dendau.backendspring.dtos.table_menu.GetTable_TableMenuDTO;
import com.dendau.backendspring.dtos.table_menu.PostTableMenuDTO;
import com.dendau.backendspring.models.TableMenu;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.Set;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetTablesResponseDTO {
    private long id;
    private String name;
    private Boolean isEmpty;
    private Boolean isTemporaryInvoice;
    private Boolean isProcessingNewspaper;
    private long totalInvoice;
    private List<GetTable_TableMenuDTO> table_menu;
}
