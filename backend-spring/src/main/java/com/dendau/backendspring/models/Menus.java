package com.dendau.backendspring.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;

@Entity // dùng để khai báo với Spring Boot rằng đây là 1 entity biểu diễn table trong db
@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
@Table(name = "MENUS")
public class Menus {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private long id;
    private String name_menu;
    private long price_sale;
    private long price_cost;
    private String unit;
    private String image_Url;
    private long inventory;

    @ManyToOne
    @JoinColumn(name = "menus_group_id", referencedColumnName = "id")
    private MenuGroup menu_group;

    @OneToMany(mappedBy = "menu")
    Set<TableMenu> table_menu;
}
