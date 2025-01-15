package com.examly.springapp.service;

import java.util.List;
import java.util.Map;

import com.examly.springapp.model.Loan;

public interface LoanService {

    Loan addLoan(Loan loan);

    Loan getLoanById(Long loanId);

    List<Loan> getAllLoans();

    Loan updateLoan(Long loanId, Loan updatedLoan);

    Loan deleteLoan(Long loanId);

    Map<String, Object> getMonthlyLoanData();

    Map<String, Integer> getLoanStatus();
}
