package com.insuranceapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.insuranceapp.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
}

