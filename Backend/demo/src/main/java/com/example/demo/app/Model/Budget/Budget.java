package com.example.demo.app.Model.Budget;

import com.example.demo.app.Model.Category;
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
@Table(name = "budget", indexes = {
        @Index(name = "idx_budget_category_id", columnList = "category_id")
})
@Entity
public class Budget {
    @Id
    @SequenceGenerator(
            name = "budget_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "budget_sequence"
    )
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    @Column(nullable = true)
    private Double actualAmount = 0.0;

    @Column(nullable = true)
    private Double expectedAmount;

    @Column(nullable = true)
    private LocalDateTime startDate;

    @Column(nullable = true)
    private LocalDateTime endDate = LocalDateTime.now().plusMonths(1);

    @Column(nullable = true)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Budget(User user, Category category, double budget) {
        this.user = user;
        this.category = category;
        this.expectedAmount = budget;
        this.startDate = LocalDateTime.now();
        this.endDate = LocalDateTime.now().plusMonths(1);
    }

    // Add this constructor
    public Budget(Category category, double budget) {
        this.category = category;
        this.expectedAmount = budget;
        this.startDate = LocalDateTime.now();
        this.endDate = LocalDateTime.now().plusMonths(1);
    }
}