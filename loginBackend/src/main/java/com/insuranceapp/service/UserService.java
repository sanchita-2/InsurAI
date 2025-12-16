package com.insuranceapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insuranceapp.model.User;
import com.insuranceapp.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return "Email Already Registered";
        }
        userRepository.save(user);
        return "User Registered Successfully";
    }

    public String loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user == null) return "User Not Found";
        if (!user.getPassword().equals(password)) return "Invalid Credentials";
        return "Login Success";
    }
}

