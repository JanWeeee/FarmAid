package com.examly.springapp.model;

import com.examly.springapp.model.Feedback;
import com.examly.springapp.model.User;
import java.time.LocalDate;

public class FeedbackDTO {
    private String text;
    private int userId;

    // Getters and setters

    public Feedback toFeedback(User user) {
        Feedback feedback = new Feedback();
        feedback.setFeedbackText(this.text);
        feedback.setDate(LocalDate.now());
        feedback.setUser(user);
        return feedback;
    }
    
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
