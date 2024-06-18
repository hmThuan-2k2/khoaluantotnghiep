package com.dendau.backendspring.dtos.menus;

import com.dendau.backendspring.models.MenuGroup;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class GetRequestAddMenusDTO {
    private Long id;
    private String name_menu;
    private long price_sale;
    private long price_cost;
    private String unit;
    private String image_Url;
    private long inventory;
    private Long id_menu_group;
}
