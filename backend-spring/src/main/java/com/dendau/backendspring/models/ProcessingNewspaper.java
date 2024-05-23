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
@Table(name = "PROCESSING_NEWSPAPER")
public class ProcessingNewspaper {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private long id;

    private long idTable;
    private long idMenu;

    @Temporal(TemporalType.DATE)
    private Date dateCreate;

    @Temporal(TemporalType.TIME)
    private Date timeCreate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTimeCreate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dateTimeCompleted;

    private Boolean isConfirm;

    private long amount_cooking;

    private Boolean isCooking;

    private String note;
}
