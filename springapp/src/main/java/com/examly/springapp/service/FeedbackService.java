package com.examly.springapp.service;
 
import java.util.List;
 
import org.springframework.stereotype.Service;
 
import com.examly.springapp.model.Feedback;
 
@Service
public interface FeedbackService {
 
    Feedback createFeedback(Feedback feedback, int userId);
 
    Feedback getFeedbackById(Long id);
 
    List<Feedback> getAllFeedbacks();
 
    Boolean deleteFeedback(Long id);
 
    List<Feedback> getFeedbacksByUserId(int userId);
 
}
