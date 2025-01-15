package com.examly.springapp.model;
 
import java.time.LocalDate;
 
import com.fasterxml.jackson.annotation.JsonIgnore;
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
 
@Entity
public class LoanApplication {
 
    @Id
    @GeneratedValue
    Long loanApplicationId;
    LocalDate submissionDate;
    int loanStatus;
    String farmLocation;
    String farmerAddress;
    double farmSizeInAcres;
    String farmPurpose;
    String file;
    String rejectionReason; // New field for rejection reason
 
    @ManyToOne
    @JoinColumn(name="userId", nullable = false)
    private User user;
 
    @ManyToOne
    @JoinColumn(name="loanId", nullable = false)
    private Loan loan;
 
    public Long getLoanApplicationId() {
        return loanApplicationId;
    }
 
    public void setLoanApplicationId(Long loanApplicationId) {
        this.loanApplicationId = loanApplicationId;
    }
 
    public LocalDate getSubmissionDate() {
        return submissionDate;
    }
 
    public void setSubmissionDate(LocalDate submissionDate) {
        this.submissionDate = submissionDate;
    }
 
    public int getLoanStatus() {
        return loanStatus;
    }
 
    public void setLoanStatus(int loanStatus) {
        this.loanStatus = loanStatus;
    }
 
    public String getFarmLocation() {
        return farmLocation;
    }
 
    public void setFarmLocation(String farmLocation) {
        this.farmLocation = farmLocation;
    }
 
    public String getFarmerAddress() {
        return farmerAddress;
    }
 
    public void setFarmerAddress(String farmerAddress) {
        this.farmerAddress = farmerAddress;
    }
 
    public double getFarmSizeInAcres() {
        return farmSizeInAcres;
    }
 
    public void setFarmSizeInAcres(double farmSizeInAcres) {
        this.farmSizeInAcres = farmSizeInAcres;
    }
 
    public String getFarmPurpose() {
        return farmPurpose;
    }
 
    public void setFarmPurpose(String farmPurpose) {
        this.farmPurpose = farmPurpose;
    }
 
    public String getFile() {
        return file;
    }
 
    public void setFile(String file) {
        this.file = file;
    }
 
    public User getUser() {
        return user;
    }
 
    public void setUser(User user) {
        this.user = user;
    }
 
    public Loan getLoan() {
        return loan;
    }

    public void setLoan(Loan loan) {
        this.loan = loan;
    }


    public String getRejectionReason() {
        return rejectionReason;
    }
    
    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }



}