package com.insurai.dto;

import java.time.LocalDateTime;

public class UserPolicyDto {

    private Long id;
    private Long userId;
    private Long policyId;
    private String policyTitle;
    private Double premium;
    private LocalDateTime purchasedAt;
    private String status;

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getPolicyId() { return policyId; }
    public String getPolicyTitle() { return policyTitle; }
    public Double getPremium() { return premium; }
    public LocalDateTime getPurchasedAt() { return purchasedAt; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setPolicyId(Long policyId) { this.policyId = policyId; }
    public void setPolicyTitle(String policyTitle) { this.policyTitle = policyTitle; }
    public void setPremium(Double premium) { this.premium = premium; }
    public void setPurchasedAt(LocalDateTime purchasedAt) { this.purchasedAt = purchasedAt; }
    public void setStatus(String status) { this.status = status; }
}
