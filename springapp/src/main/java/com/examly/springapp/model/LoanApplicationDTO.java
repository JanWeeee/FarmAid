package com.examly.springapp.model;
 
import java.time.LocalDate;
 
public class LoanApplicationDTO {
    private Long loanApplicationId;
    private LocalDate submissionDate;
    private int loanStatus;
    private String farmLocation;
    private String farmerAddress;
    private double farmSizeInAcres;
    private String farmPurpose;
    private String file;
    private String rejectionReason; // New field for rejection reason
    private int userId;
    private Long loanId;
 
 
    public LoanApplication toLoanApplication(User user, Loan loan) {
        LoanApplication loanApplication = new LoanApplication();
        loanApplication.setLoanApplicationId(this.loanApplicationId);
        loanApplication.setSubmissionDate(this.submissionDate);
        loanApplication.setLoanStatus(this.loanStatus);
        loanApplication.setFarmLocation(this.farmLocation);
        loanApplication.setFarmerAddress(this.farmerAddress);
        loanApplication.setFarmSizeInAcres(this.farmSizeInAcres);
        loanApplication.setFarmPurpose(this.farmPurpose);
        loanApplication.setFile(this.file);
        loanApplication.setUser(user);
        loanApplication.setLoan(loan);
        loanApplication.setRejectionReason(this.rejectionReason);
        return loanApplication;
    }
 
    // Getters and Setters
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
 
    public int getUserId() {
        return userId;
    }
 
    public void setUserId(int userId) {
        this.userId = userId;
    }
 
    public Long getLoanId() {
        return loanId;
    }
 
    public void setLoanId(Long loanId) {
        this.loanId = loanId;
    }
 
    public Long getLoanApplicationId() {
        return loanApplicationId;
    }
 
    public void setLoanApplicationId(Long loanApplicationId) {
        this.loanApplicationId = loanApplicationId;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }
    
    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
 
 