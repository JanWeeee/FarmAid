package com.examly.springapp.service;
 
import com.examly.springapp.model.User;
 
public interface UserService {
 
    User createUser(User user);
 
    User loginUser(User user);
  
    User findUserByEmail(String email);

    User findUserByUserId(int userId);

    int updatePasswordByEmail(String email, String password);
 
    boolean existsByEmail(String email);
}
 