package com.examly.springapp.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.DuplicateLoanException;
import com.examly.springapp.model.Loan;
import com.examly.springapp.repository.LoanRepo;

@Service
public class LoanServiceImpl implements LoanService {

    private LoanRepo lRepo;

    @Autowired
    public LoanServiceImpl(LoanRepo lRepo) {
        this.lRepo = lRepo;
    }

    @Override
    public Loan addLoan(Loan loan) {
        if (lRepo.existsByLoanType(loan.getLoanType())) {
            throw new DuplicateLoanException(
                    "Loan with type " + loan.getLoanType() + " already exists for user " + ".");
        }
        return lRepo.save(loan);

    }

    @Override
    public Loan deleteLoan(Long loanId) {
        Optional<Loan> loanOpt = lRepo.findById(loanId);
        if (loanOpt.isPresent()) {
            Loan loan = loanOpt.get();
            lRepo.deleteById(loanId);
            return loan;
        } else {
            return null;
        }

    }

    @Override
    public List<Loan> getAllLoans() {
        return lRepo.findAll();
    }

    @Override
    public Loan getLoanById(Long loanId) {
        Optional<Loan> loanOpt = lRepo.findById(loanId);
        if (loanOpt.isPresent()) {
            return loanOpt.get();
        }
        return null;
    }

    @Override
    public Loan updateLoan(Long loanId, Loan updatedLoan) {
        if (lRepo.existsById(loanId)) {
            updatedLoan.setLoanId(loanId);
            return lRepo.save(updatedLoan);
        }

        return null;
    }

    @Override
    public Map<String, Integer> getLoanStatus() {
        int approved = lRepo.countByStatus("approved");
        int pending = lRepo.countByStatus("pending");
        int rejected = lRepo.countByStatus("rejected");

        Map<String, Integer> statusData = new HashMap<>();
        statusData.put("approved", approved);
        statusData.put("pending", pending);
        statusData.put("rejected", rejected);

        return statusData;
    }

    @Override
    public Map<String, Object> getMonthlyLoanData() {
        List<String> months = Arrays.asList("January", "February", "March", "April", "May", "June", "July");
        List<Integer> applications = new ArrayList<>();
        List<Integer> approved = new ArrayList<>();

        for (String month : months) {
            applications.add(lRepo.countByMonth(month));
            approved.add(lRepo.countByMonthAndStatus(month, "approved"));
        }

        Map<String, Object> monthlyData = new HashMap<>();
        monthlyData.put("months", months);
        monthlyData.put("applications", applications);
        monthlyData.put("approved", approved);

        return monthlyData;
    }

}
