package com.dendau.backendspring.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity // dùng để khai báo với Spring Boot rằng đây là 1 entity biểu diễn table trong db
@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
@Table(name = "TABLES_MENU")
public class TableMenu {
    @EmbeddedId
    private TableMenuKey id;

    @ManyToOne
    @MapsId("tableId")
    @JoinColumn(name = "table_id")
    private Tables table;

    @ManyToOne
    @MapsId("menuId")
    @JoinColumn(name = "menu_id")
    private Menus menu;

    private long soLuong;
    private long donGia;
    private boolean isCheBien;
}
