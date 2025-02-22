package com.example.demo.app.Service;

import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.Enums.CategoryType;
import com.example.demo.app.Repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    /**
     * Fetch all categories.
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    /**
     * Fetch a category by ID.
     */
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    /**
     * Fetch a category by name.
     */
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByCategoryName(name);
    }

    /**
     * Create a new category (if it doesn't exist).
     */
    public Category createCategory(Category category) {
        if (categoryRepository.existsByCategoryName(category.getCategoryName())) {
            throw new IllegalStateException("Category with this name already exists!");
        }
        return categoryRepository.save(category);
    }

    /**
     * Delete a category by ID.
     */
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalStateException("Category not found!");
        }
        categoryRepository.deleteById(id);
    }
    public void updateCategory(Long id, Category category, String name, CategoryType type) {
        if (!categoryRepository.existsById(id)) {
            throw new IllegalStateException("Category not found!");
        }
        if(type != null && type.toString().length() > 0 && !type.toString().equals(category.getType().toString())) {
            category.setType(type);
        }
        else{
            throw new IllegalStateException("Category type cannot be empty!");
        }
        if(name != null && name.length() > 0 && !name.equals(category.getCategoryName())) {
            category.setCategoryName(name);
        }
        else{
            throw new IllegalStateException("Category name cannot be empty!");
        }
        categoryRepository.save(category);
    }
}
