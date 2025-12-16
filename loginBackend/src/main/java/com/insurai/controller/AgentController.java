package com.insurai.controller;
 import com.insurai.entity.User; import com.insurai.repository.UserRepository; import org.springframework.http.ResponseEntity; import org.springframework.web.bind.annotation.*; 
 import java.util.List;
  @RestController
   @RequestMapping("/api/agents") @CrossOrigin(origins = "*")
    public class AgentController { private final UserRepository userRepository; 
        public AgentController(UserRepository userRepository){ this.userRepository=userRepository;

         }
          @GetMapping public ResponseEntity<List<User>> getAllAgents(){ return ResponseEntity.ok(userRepository.findByRole("AGENT"));

           } @GetMapping("/approved") public ResponseEntity<List<User>> getApprovedAgents(){ return ResponseEntity.ok(userRepository.findByRoleAndApproved("AGENT",1));


        }
         @PutMapping("/{id}/approve") public ResponseEntity<User> approveAgent(@PathVariable Long id, @RequestParam Integer approved){ return userRepository.findById(id).map(agent->{ agent.setApproved(approved); userRepository.save(agent); return ResponseEntity.ok(agent); }).orElse(ResponseEntity.notFound().build());
         }
         }
