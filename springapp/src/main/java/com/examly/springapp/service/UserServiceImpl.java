package com.examly.springapp.service;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.examly.springapp.exceptions.UserExistException;
import com.examly.springapp.exceptions.UserNotFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepo;
 
@Service
public class UserServiceImpl implements UserService {
 
    UserRepo userRepo;
    PasswordEncoder passwordEncoder;
 
    @Autowired
    public UserServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }
 
    @Override
    public User createUser(User user) {
        if (userRepo.findByEmail(user.getEmail()) != null) {
            throw new UserExistException("User with this email already exists!!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }


    @Override
    public User loginUser(User user) {
        User foundUser = userRepo.findByUsername(user.getUsername());
        if (foundUser != null) {
            User existingUser = foundUser;
            if (user.getPassword().equals(existingUser.getPassword())) {
                return existingUser;
            }
        }
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("User Not Found !!", 500);
        }
        return user;
    }

    @Override public User findUserByUserId(int userId) { 
        return userRepo.findById(userId).orElse(null); 
    }

    @Override
    public int updatePasswordByEmail(String email, String password) {
        password = passwordEncoder.encode(password);
        userRepo.updatePasswordByEmail(email, password);
        return 0;
    }
 
    @Override
    public boolean existsByEmail(String email) {
        boolean b = userRepo.existsByEmail(email);
        if (b)
            return true;
        return false;
    }
}