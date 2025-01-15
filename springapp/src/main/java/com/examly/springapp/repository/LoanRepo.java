package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Loan;

@Repository
public interface LoanRepo extends JpaRepository<Loan, Long> {

    boolean existsByLoanType(String loanType);

    int countByStatus(String status);

    @Query("SELECT COUNT(l) FROM Loan l WHERE FUNCTION('MONTHNAME', l.applicationDate) = :month")
    int countByMonth(@Param("month") String month);

    @Query("SELECT COUNT(l) FROM Loan l WHERE FUNCTION('MONTHNAME', l.applicationDate) = :month AND l.status = :status")
    int countByMonthAndStatus(@Param("month") String month, @Param("status") String status);
}
