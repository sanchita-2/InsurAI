package com.insurai.service;

import com.insurai.dto.UserDto;
import com.insurai.entity.User;
import com.insurai.mapper.UserMapper;
import com.insurai.repository.UserRepository;
import com.insurai.security.JwtUtil;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final UserMapper mapper;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepo, UserMapper mapper, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.mapper = mapper;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(User u) {

        
        Optional<User> existing = userRepo.findByEmail(u.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

       
        String role = u.getRole() == null ? "USER" : u.getRole().toUpperCase();
        u.setRole(role);

  
        if ("AGENT".equals(role)) {
            u.setApproved(0); 
        } else {
            u.setApproved(1); 
        }

       
        User saved = userRepo.save(u);

    
        String token = jwtUtil.generateToken(saved.getEmail());

        return new AuthResponse(token, mapper.toDto(saved));
    }

   
    public AuthResponse login(String email, String password) {

        User u = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!u.getPassword().equals(password)) {
            throw new RuntimeException("Invalid credentials");
        }

    
        if ("AGENT".equalsIgnoreCase(u.getRole())
                && (u.getApproved() == null || u.getApproved() != 1)) {
            throw new RuntimeException("Agent not approved");
        }

        String token = jwtUtil.generateToken(u.getEmail());
        return new AuthResponse(token, mapper.toDto(u));
    }


    public static class AuthResponse {
        private String token;
        private UserDto user;

        public AuthResponse(String token, UserDto user) {
            this.token = token;
            this.user = user;
        }

        public String getToken() {
            return token;
        }

        public UserDto getUser() {
            return user;
        }
    }
}
