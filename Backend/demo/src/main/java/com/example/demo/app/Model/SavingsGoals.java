package com.example.demo.app.Model;

import com.example.demo.app.Model.User.User;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name="savings_goals")
@Entity
public class SavingsGoals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // Ensure this column exists in the DB
    private User user;

    @Column(nullable = false, name = "target_amount")
    private Double targetAmount;

    private Double currentAmount = 0.0;

    @Column(nullable = false)
    private String description;

    private boolean completed = false;

    public SavingsGoals(User user, String description, Double targetAmount) {
        this.user = user;
        this.description = description;
        this.targetAmount = targetAmount;
        this.currentAmount = 0.0;
    }

    public void addAmount(double amount) {
        this.currentAmount += amount;
        if (this.currentAmount >= this.targetAmount) {
            this.completed = true;
        }
    }
}
