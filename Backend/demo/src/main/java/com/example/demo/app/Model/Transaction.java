package com.example.demo.app.Model;

import com.example.demo.app.Model.Enums.TransactionType;
import com.example.demo.app.Model.User.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transactions")
@Entity
public class Transaction {
    @Id
    @SequenceGenerator(
            name = "transaction_sequence",
            sequenceName = "transaction_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "transaction_sequence"
    )
    @Column(name = "transaction_id", updatable = false, nullable = false)
    private Long id;

    @JoinColumn(name = "user_id")
    @ManyToOne
    private User user;
    @Column(nullable = false, updatable = true)
    private Double amount;
    @Column(nullable = false, updatable = true, name = "transaction_type")
    private TransactionType transactionType;
    @Column(nullable = false, updatable = true)
    private String description;
    @Column(nullable = false, updatable = true)
    private LocalDateTime transactionDate;
    @JoinColumn(name ="category_id")
    @OneToOne
    private Category category;

    public Transaction(User user, Double amount, TransactionType transactionType, String description, LocalDateTime transactionDate) {
        this.user = user;
        this.amount = amount;
        this.transactionType = transactionType;
        this.description = description;
        this.transactionDate = transactionDate;
    }

}
