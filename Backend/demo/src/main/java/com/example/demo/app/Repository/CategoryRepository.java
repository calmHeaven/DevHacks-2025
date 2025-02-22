package com.example.demo.app.Repository;

import com.example.demo.app.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@EnableJpaRepositories
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Find category by name
    Optional<Category> findByCategoryName(String name);

    // Check if a category exists by name
    boolean existsByCategoryName(String name);
}
