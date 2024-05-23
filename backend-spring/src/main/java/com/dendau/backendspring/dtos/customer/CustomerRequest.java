package com.dendau.backendspring.dtos.customer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data // annotation này sẽ tự động khai báo getter và setter cho class
@AllArgsConstructor // dùng để khai báo constructor với tất cả các properties
@NoArgsConstructor // dùng để khai báo constructor rỗng không có param
@ToString
public class CustomerRequest {
    private Long id;
    private String name_customer;
    private String nickname;
    private String phoneNumber;
    private String gender;
    private String address;
}
