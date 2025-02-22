package com.example.demo.app.Repository;

import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.Enums.TransactionType;
import com.example.demo.app.Model.Transaction;
import com.example.demo.app.Model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    /**
     * Sums up the total amount spent by a user in a specific category and transaction type.
     */
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t " +
            "WHERE t.user.id = :userId AND t.category.id = :categoryId AND t.transactionType = :type")
    Optional<Double> getAmountSpent(User user, Category category, TransactionType type);

    Optional<Transaction> findTransactionById(Long id);
    Optional<Transaction> findTransactionByTransactionDateEquals(LocalDateTime transactionDate);

}