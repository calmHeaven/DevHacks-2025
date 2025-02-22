package com.example.demo.app.Controller;

import com.example.demo.app.Model.Budget.Budget;
import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.User.User;
import com.example.demo.app.Service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/budgets")
public class BudgetController {
    private final BudgetService budgetService;

    @Autowired
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }

    /**
     * Creates a new budget for a user in a specific category.
     *
     * @param budgetDto The budget details.
     * @return The created Budget object.
     */
    @PreAuthorize("isAuthenticated() && hasRole('USER')")
    @PostMapping(path = "/create-budget")
    public ResponseEntity<Budget> createBudget(@RequestBody Budget budgetDto) {
        Budget budget = budgetService.createBudget(budgetDto.getCategory(), budgetDto.getExpectedAmount());
        return ResponseEntity.status(HttpStatus.CREATED).body(budget);
    }
    @PreAuthorize("isAuthenticated() && hasRole('USER')")
    @GetMapping("/{userId}/{categoryId}")
    public ResponseEntity<Double> getBudgetForCategory(@PathVariable User user, @PathVariable Category category) {
        return ResponseEntity.ok(budgetService.getBudgetForCategory(user, category));
    }

    /**
     * Checks if the user's spending in a category has exceeded the budget.
     *
     * @param userId     The ID of the user.
     * @param categoryId The ID of the category.
     * @return True if the budget is exceeded, false otherwise.
     */
    @PreAuthorize("isAuthenticated() && hasRole('USER')")
    @GetMapping("/is-exceeded/{userId}/{categoryId}")
    public ResponseEntity<Boolean> isBudgetExceeded(@PathVariable User userId, @PathVariable Category categoryId) {
        return ResponseEntity.ok(budgetService.isBudgetExceeded(userId, categoryId));
    }
}
