package com.dendau.backendspring.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

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

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTimeIn;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTimePrintInvoice;

    private Long totalMoney;

    private int discount;
    private int surcharge;

    @OneToOne
    @JoinColumn(name = "tables_id", referencedColumnName = "id")
    private Tables tables;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;
}
