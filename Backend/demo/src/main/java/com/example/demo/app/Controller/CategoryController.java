package com.example.demo.app.Controller;

import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.Enums.CategoryType;
import com.example.demo.app.Service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * Get all categories
     */
    @PreAuthorize("hasAuthority('READ')")
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    /**
     * Get category by ID
     */
    @PreAuthorize("hasAuthority('READ')")
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    /**
     * Create a new category
     */
//    @PreAuthorize("hasAuthority('WRITE')")
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        return ResponseEntity.ok(categoryService.createCategory(category));
    }

    /**
     * Update a category
     */
//    @PreAuthorize("hasAuthority('WRITE')")
    @PutMapping("/{id}")
    public void updateCategory(@PathVariable Long id,
                                                   @RequestParam Category category,
                                                   @RequestParam String name,
                                                   @RequestParam CategoryType type) {
         categoryService.updateCategory(id, category, name, type);
    }

    /**
     * Delete a category
     */
//    @PreAuthorize("hasAuthority('DELETE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
