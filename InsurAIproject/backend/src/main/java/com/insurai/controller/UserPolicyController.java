package com.insurai.controller;

import com.insurai.dto.UserPolicyDto;
import com.insurai.service.UserPolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-policies")
@CrossOrigin(origins = "*")
public class UserPolicyController {

    private final UserPolicyService service;

    public UserPolicyController(UserPolicyService service) {
        this.service = service;
    }

    @PostMapping("/buy")
    public UserPolicyDto buy(@RequestParam Long userId,
                             @RequestParam Long policyId) {
        return service.buyPolicy(userId, policyId);
    }

    
    @GetMapping("/user/{userId}")
    public List<UserPolicyDto> byUser(@PathVariable Long userId) {
        return service.byUser(userId);
    }
    @GetMapping("/admin/all")
public List<UserPolicyDto> allPurchasedPolicies() {
    return service.allPurchased();
}

   
    @PutMapping("/{id}/cancel")
    public UserPolicyDto cancelPolicy(@PathVariable Long id) {
        return service.cancelPolicy(id);
    }
    @PutMapping("/{id}/renew")
    public UserPolicyDto renewPolicy(@PathVariable Long id) {
        return service.renewPolicy(id);
    }
}
