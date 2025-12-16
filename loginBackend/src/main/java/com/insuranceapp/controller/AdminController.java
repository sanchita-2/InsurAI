package com.insuranceapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.insuranceapp.model.Admin;
import com.insuranceapp.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173") // ✅ allows frontend access
public class AdminController {

    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin admin) {
        if (admin.getEmail().equals("sanchitaa188@gmail.com") && admin.getPassword().equals("admin123")) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}



