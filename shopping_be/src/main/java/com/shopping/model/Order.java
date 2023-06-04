package com.shopping.model;

import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "`order`")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String phoneNum;
	private String address;
	private String paymentMethod;
	
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

	public Order(String name, String phoneNum, String address, String paymentMethod) {
		super();
		this.name = name;
		this.phoneNum = phoneNum;
		this.address = address;
		this.paymentMethod = paymentMethod;
	}
	
	public void addOrderItem(OrderItem orderItem) {
		this.orderItems.add(orderItem);
	}
}
