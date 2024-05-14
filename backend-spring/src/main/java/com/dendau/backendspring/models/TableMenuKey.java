package com.dendau.backendspring.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.Objects;


@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
@Embeddable
public class TableMenuKey implements Serializable {
    @Column(name = "table_id")
    long tableId;

    @Column(name = "menu_id")
    long menuId;


    public long getTableId() {
        return tableId;
    }

    public void setTableId(long tableId) {
        this.tableId = tableId;
    }

    public long getMenuId() {
        return menuId;
    }

    public void setMenuId(long menuId) {
        this.menuId = menuId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TableMenuKey that)) return false;
        return tableId == that.tableId && menuId == that.menuId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(tableId, menuId);
    }
}
