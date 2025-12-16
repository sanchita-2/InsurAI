package com.insurai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_policies")
public class UserPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private Policy policy;

    private LocalDateTime purchasedAt;

    private String status; // ACTIVE, CANCELLED

    public UserPolicy() {}

    public Long getId() { return id; }
    public User getUser() { return user; }
    public Policy getPolicy() { return policy; }
    public LocalDateTime getPurchasedAt() { return purchasedAt; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setUser(User user) { this.user = user; }
    public void setPolicy(Policy policy) { this.policy = policy; }
    public void setPurchasedAt(LocalDateTime purchasedAt) { this.purchasedAt = purchasedAt; }
    public void setStatus(String status) { this.status = status; }
}
