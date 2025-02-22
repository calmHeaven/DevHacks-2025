package com.example.demo.app.Repository;

import com.example.demo.app.Model.Budget.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
@EnableJpaRepositories
//extend JPA repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    @Query("SELECT COALESCE(b.actualAmount, 0) FROM Budget b " +
            "WHERE b.user.id = :userId AND b.category.id = :categoryId")
    Optional<Double> findBudgetByUserAndCategory(Long userId, Long categoryId);

    //find by id
    Optional<Budget> findById(long id);
    //find by name
    //find by user id
    Optional<Budget> findByUserId(long userId);
    //delete by id
    void deleteById(long id);
}