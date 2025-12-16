package com.insurai.service;

import com.insurai.dto.UserPolicyDto;
import com.insurai.entity.Policy;
import com.insurai.entity.User;
import com.insurai.entity.UserPolicy;
import com.insurai.repository.PolicyRepository;
import com.insurai.repository.UserPolicyRepository;
import com.insurai.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserPolicyService {

    private final UserPolicyRepository repo;
    private final UserRepository userRepo;
    private final PolicyRepository policyRepo;

    public UserPolicyService(UserPolicyRepository repo,
                             UserRepository userRepo,
                             PolicyRepository policyRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.policyRepo = policyRepo;
    }

    /* ================= BUY POLICY ================= */
    public UserPolicyDto buyPolicy(Long userId, Long policyId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Policy policy = policyRepo.findById(policyId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        UserPolicy up = new UserPolicy();
        up.setUser(user);
        up.setPolicy(policy);
        up.setPurchasedAt(LocalDateTime.now());
        up.setStatus("ACTIVE");

        return toDto(repo.save(up));
    }

    /* ================= GET USER POLICIES ================= */
    public List<UserPolicyDto> byUser(Long userId) {
        return repo.findByUserId(userId)
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    /* ================= CANCEL POLICY ================= */
    public UserPolicyDto cancelPolicy(Long userPolicyId) {
        UserPolicy up = repo.findById(userPolicyId)
                .orElseThrow(() -> new RuntimeException("UserPolicy not found"));

        if (!"ACTIVE".equals(up.getStatus())) {
            throw new RuntimeException("Only ACTIVE policies can be cancelled");
        }

        up.setStatus("CANCELLED");
        return toDto(repo.save(up));
    }

    /* ================= RENEW POLICY ================= */
    public UserPolicyDto renewPolicy(Long userPolicyId) {
        UserPolicy up = repo.findById(userPolicyId)
                .orElseThrow(() -> new RuntimeException("UserPolicy not found"));

        if ("ACTIVE".equals(up.getStatus())) {
            throw new RuntimeException("Active policy cannot be renewed");
        }

        up.setStatus("ACTIVE");
        up.setPurchasedAt(LocalDateTime.now()); // renewal date

        return toDto(repo.save(up));
    }
    /* ADMIN */
public List<UserPolicyDto> all() {
    return repo.findAll()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
}

public List<UserPolicyDto> allPurchased() {
    return repo.findAll()
            .stream()
            .map(this::toDto)
            .collect(Collectors.toList());
}
    /* ================= DTO MAPPER ================= */
    private UserPolicyDto toDto(UserPolicy up) {
        UserPolicyDto d = new UserPolicyDto();
        d.setId(up.getId());
        d.setUserId(up.getUser().getId());
        d.setPolicyId(up.getPolicy().getId());
        d.setPolicyTitle(up.getPolicy().getTitle());
        d.setPremium(up.getPolicy().getPremium());
        d.setPurchasedAt(up.getPurchasedAt());
        d.setStatus(up.getStatus());
        return d;
    }
}
