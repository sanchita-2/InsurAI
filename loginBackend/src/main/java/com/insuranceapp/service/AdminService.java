package com.insuranceapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insuranceapp.model.Admin;
import com.insuranceapp.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public String loginAdmin(String email, String password) {
        Admin admin = adminRepository.findByEmail(email);
        if (admin == null) return "Admin Not Found";
        if (!admin.getPassword().equals(password)) return "Invalid Credentials";
        return "Admin Login Success";
    }
}

