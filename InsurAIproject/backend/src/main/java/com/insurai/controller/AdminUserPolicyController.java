package com.insurai.controller;

import com.insurai.dto.UserPolicyDto;
import com.insurai.service.UserPolicyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/user-policies")
@CrossOrigin(origins = "*")
public class AdminUserPolicyController {

    private final UserPolicyService service;

    public AdminUserPolicyController(UserPolicyService service) {
        this.service = service;
    }

    /* ADMIN → VIEW ALL PURCHASED POLICIES */
    @GetMapping
    public List<UserPolicyDto> all() {
        return service.all();
    }
}
