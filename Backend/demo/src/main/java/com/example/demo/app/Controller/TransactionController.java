package com.example.demo.app.Controller;

import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.Enums.TransactionType;
import com.example.demo.app.Model.Transaction;
import com.example.demo.app.Model.User.User;
import com.example.demo.app.Service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService){
        this.transactionService = transactionService;
    }

    @PostMapping("/create-transaction")
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction){
        transactionService.createTransaction(transaction);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/user/{userId}")
    public List<Transaction> getTransactionsById(@RequestBody Long userId){
        return transactionService.getTransaction(userId);
    }
    @GetMapping("/user/{userId}/category/{categoryId}/total-spent")
    public double getTotalSpentByCategory(@RequestBody User userId, @RequestBody Category categoryId, TransactionType transactionType){
        return transactionService.getAmountSpent(userId, categoryId);
    }
    @PreAuthorize("hasAuthority('WRITE')")
    @PutMapping("/{transactionId}")
    public void updateTransaction(
            @PathVariable Long transactionId,
            @RequestBody String transactionDescription,
            @RequestBody double transactionAmount,
            @RequestBody LocalDateTime transactionDate,
            @RequestBody Category transactionCategory) {
         transactionService.updateTransaction(transactionId, transactionDescription, transactionAmount, transactionDate, transactionCategory);
    }
    @PreAuthorize("hasAuthority('READ')")
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }
    @PreAuthorize("hasAuthority('DELETE')")
    @DeleteMapping("/{transactionId}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long transactionId) {
        transactionService.deleteTransaction(transactionId);
        return ResponseEntity.ok("Transaction deleted successfully");
    }
    @PreAuthorize("hasAuthority('READ')")
    @GetMapping("/total-spent/{userId}/{categoryId}")
    public ResponseEntity<Double> getTotalSpent(@PathVariable User userId, @PathVariable Category categoryId) {
        return ResponseEntity.ok(transactionService.getAmountSpent(userId, new Category()));
    }
}
