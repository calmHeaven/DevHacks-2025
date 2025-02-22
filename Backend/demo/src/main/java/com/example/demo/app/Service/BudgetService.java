package com.example.demo.app.Service;

import com.example.demo.app.Model.Budget.Budget;
import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.User.User;
import com.example.demo.app.Repository.BudgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BudgetService {
    private final BudgetRepository budgetRepository;
    private final TransactionService transactionService;
    private final SavingsGoalsService savingsGoalsService;

    @Autowired
    public BudgetService(TransactionService transactionService, BudgetRepository budgetRepository, SavingsGoalsService savingsGoalsService) {
        this.transactionService = transactionService;
        this.savingsGoalsService = savingsGoalsService;
        this.budgetRepository = budgetRepository;
    }

    /**
     * Creates and saves a new budget for a user in a specific category.
     */
    public Budget createBudget(Category category, double budgetAmount) {
        return budgetRepository.save(new Budget(category, budgetAmount));
    }

    /**
     * Checks if the user has exceeded their budget for a specific category.
     */
    public boolean isBudgetExceeded(User user, Category category) {
        double spent = transactionService.getAmountSpent(user, category);
        double budget = getBudgetForCategory(user, category);

        // If no budget is set, assume no limit
        if (budget == 0.0) {
            return false;
        }
        return spent > budget;
    }

    /**
     * Retrieves the budget amount for a given user and category.
     */
    public double getBudgetForCategory(User user, Category category) {
        return budgetRepository.findBudgetByUserAndCategory(user.getId(), category.getId())
                .orElse(0.0); // Default to 0 if no budget is set
    }
    public void transferRemainingBudgetToSavings() {
        List<Budget> budgets = budgetRepository.findAll();

        for (Budget budget : budgets) {
            User user = budget.getUser();
            double spent = transactionService.getAmountSpent(user, new Category());
            double remainingBudget = budget.getExpectedAmount() - spent;

            if (remainingBudget > 0) {
                double savingsAmount = remainingBudget / 2; // Transfer 50% to savings
                savingsGoalsService.autoDepositToSavings(user, savingsAmount);
            }
        }
    }
}
