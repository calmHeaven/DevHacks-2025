package com.example.demo.app.Model.Budget;

import com.example.demo.app.Model.Category;
import lombok.Value;

/**
 * DTO for {@link Budget}
 */
@Value
public class BudgetDTO {
    Long id;
    Double actualAmount;
    Double expectedAmount;
    Category category;
    Budget budget;
}