package com.example.demo.app.Service;

import com.example.demo.app.Model.Category;
import com.example.demo.app.Model.Enums.TransactionType;
import com.example.demo.app.Model.Transaction;
import com.example.demo.app.Model.User.User;
import com.example.demo.app.Repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    /**
     * Calculates the total amount spent by a user in a specific category.
     * @param user
     * @param categoryId
     */
    public double getAmountSpent(User user, Category categoryId) {
        return transactionRepository.getAmountSpent(user, categoryId, TransactionType.valueOf("EXPENSE")).orElse(0.0);
    }
    public void createTransaction(Transaction transaction) {
        if (transaction == null) {
            throw new IllegalStateException("User cannot be null");
        }
        Optional<Transaction> userOptionalName = transactionRepository.findTransactionById(transaction.getId());
        if (userOptionalName.isPresent()) {
            throw new IllegalStateException("Username is already taken");
        }
        else{
            transactionRepository.save(transaction);
        }
        Optional<Transaction> TransactionOptionalDate = transactionRepository.findTransactionByTransactionDateEquals(transaction.getTransactionDate());
        if (TransactionOptionalDate.isPresent()) {
            throw new IllegalStateException("Email is already taken");
        }
        else{
            transactionRepository.save(transaction);
        }
    }
    //CRUD FOR TRANSACTIONS
    public void deleteTransaction(Long id) {
        boolean exists = transactionRepository.existsById(id);
        if (!exists) {
            throw new IllegalStateException("Transaction with id " + id + " does not exist");
        }
        transactionRepository.deleteById(id);
    }
    public void updateTransaction(Long id, String transactionDescription, double transactionAmount, LocalDateTime transactionDate, Category category) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("Transaction with id " + id + " does not exist"));
        Optional<Transaction> transactionOptional = transactionRepository.findTransactionByTransactionDateEquals(transaction.getTransactionDate());
        if (transactionOptional.isPresent()) {
            throw new IllegalStateException("Transaction is already exists");
        }
        else{
            transaction.setTransactionDate(transactionDate);
        }
        if (transactionDescription != null && !transactionDescription.isEmpty() && !transaction.getDescription().equals(transactionDescription)) {
            transaction.setDescription(transactionDescription);
        }
        if(transactionAmount != 0.0 && transactionAmount != transaction.getAmount()){
            transaction.setAmount(transactionAmount);
        }
    }
    public List<Transaction> getTransaction(Long id) {
        return transactionRepository.findById(id).map(List::of)
                .orElseThrow(() -> new IllegalStateException("Transaction with id " + id + " does not exist"));
    }
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
