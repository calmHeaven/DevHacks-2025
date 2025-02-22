package com.example.demo.app.Service;

import com.example.demo.app.Model.SavingsGoals;
import com.example.demo.app.Model.SavingsGoals;
import com.example.demo.app.Model.User.User;
import com.example.demo.app.Repository.SavingsRepository;
import com.example.demo.app.Repository.SavingsRepository;
import com.example.demo.app.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class SavingsGoalsService {

    private final SavingsRepository savingsRepository;
    private final UserRepository userRepository;

    public SavingsGoalsService(SavingsRepository savingsRepository, UserRepository userRepository) {
        this.userRepository = userRepository;
        this.savingsRepository = savingsRepository;
    }

    /**
     * Create a new savings goal for a user.
     */
    public SavingsGoals createSavingsGoal(Long userId, String description, double targetAmount) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        SavingsGoals goal = new SavingsGoals(user, description, targetAmount);
        return savingsRepository.save(goal);
    }

    /**
     * Get all savings goals for a user.
     */
    public List<SavingsGoals> getSavingsGoals(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return savingsRepository.findSavingsGoalsById(user);
    }

    /**
     * Add money to a savings goal.
     */
    @Transactional
    public SavingsGoals addToSavingsGoal(Long userId, Long goalId, double amount) {
        SavingsGoals goal = savingsRepository.findSavingsGoalsByUserAndId(userRepository.getReferenceById(userId), goalId)
                .orElseThrow(() -> new RuntimeException("Savings goal not found"));

        goal.addAmount(amount);
        return savingsRepository.save(goal);
    }

    /**
     * Check if a goal is completed.
     */
    public boolean isGoalCompleted(Long userId, Long goalId) {
        SavingsGoals goal = savingsRepository.findSavingsGoalsByUserAndId(userRepository.getReferenceById(userId), goalId)
                .orElseThrow(() -> new RuntimeException("Savings goal not found"));

        return goal.isCompleted();
    }

    @Transactional
    public void autoDepositToSavings(User user, double amount) {
        List<SavingsGoals> goals = savingsRepository.findSavingsGoalsById(user);

        if (goals.isEmpty()) {
            System.out.println("No savings goals for user: " + user.getId());
            return;
        }

        double amountPerGoal = amount / goals.size();
        for (SavingsGoals goal : goals) {
            goal.addAmount(amountPerGoal);
            savingsRepository.save(goal);
        }
    }
}