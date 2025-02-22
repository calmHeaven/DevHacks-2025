package com.example.demo.app.Repository;

import com.example.demo.app.Model.SavingsGoals;
import com.example.demo.app.Model.User.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@EnableJpaRepositories
@Repository
public interface SavingsRepository extends JpaRepository<SavingsGoals, Long> {
    List<SavingsGoals> findSavingsGoalsById(User user);
    Optional<SavingsGoals> findSavingsGoalsByUserAndId(User user, Long id);
}