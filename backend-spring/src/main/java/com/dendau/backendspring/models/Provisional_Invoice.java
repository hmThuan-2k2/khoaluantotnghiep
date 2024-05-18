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
@Table(name = "Provisional_Invoice")
public class Provisional_Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String timeIn;
    private String timeOut;
    private String timePrintInvoice;
    private Long totalMoney;
    private int discount;
    private int surcharge;
    private long idCustomer;

    @OneToOne
    @JoinColumn(name = "tables_id", referencedColumnName = "id")
    private Tables tables;
}
