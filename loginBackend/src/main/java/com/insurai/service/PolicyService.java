package com.insurai.service;

import com.insurai.dto.PolicyDto;
import com.insurai.entity.Policy;
import com.insurai.mapper.PolicyMapper;
import com.insurai.repository.PolicyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyService {

    private final PolicyRepository repo;
    private final PolicyMapper mapper;

    public PolicyService(PolicyRepository repo, PolicyMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<PolicyDto> all() {
        return repo.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    public PolicyDto create(PolicyDto dto) {
        Policy saved = repo.save(mapper.toEntity(dto));
        return mapper.toDto(saved);
    }

    public PolicyDto update(Long id, PolicyDto dto) {
        Policy p = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        p.setTitle(dto.getTitle());
        p.setDescription(dto.getDescription());
        p.setPremium(dto.getPremium());

        return mapper.toDto(repo.save(p));
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
