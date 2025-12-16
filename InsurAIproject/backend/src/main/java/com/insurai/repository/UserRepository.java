package com.insurai.repository;
import com.insurai.entity.User; import org.springframework.data.jpa.repository.JpaRepository; import java.util.List; import java.util.Optional;
public interface UserRepository extends JpaRepository<User, Long> { Optional<User> findByEmail(String email); List<User> findByRole(String role); List<User> findByRoleAndApproved(String role, Integer approved); }
