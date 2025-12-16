package com.insurai.repository;

import com.insurai.entity.UserPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPolicyRepository extends JpaRepository<UserPolicy, Long> {

    List<UserPolicy> findByUserId(Long userId);
    List<UserPolicy> findByPolicyId(Long policyId);
}
