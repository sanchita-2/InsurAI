package com.insurai.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.insurai.dto.PolicyDto;
import java.util.List;
import com.insurai.service.PolicyService;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "*")
public class PublicPolicyController {

    private final PolicyService service;

    public PublicPolicyController(PolicyService service) {
        this.service = service;
    }

    @GetMapping
    public List<PolicyDto> all() {
        return service.all();
    }
}

