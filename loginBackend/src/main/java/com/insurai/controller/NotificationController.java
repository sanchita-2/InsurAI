package com.insurai.controller; import com.insurai.dto.NotificationDto; import com.insurai.service.NotificationService; import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation.*; import java.util.List;
 @RestController 
@RequestMapping("/api/notifications")
 @CrossOrigin(origins = "*")
  public class NotificationController { private final NotificationService service;
     public NotificationController(NotificationService service){ this.service=service; 

 
    }
     @GetMapping("/user/{userId}") public ResponseEntity<List<NotificationDto>> forUser(@PathVariable Long userId){ return ResponseEntity.ok(service.getUserNotifications(userId)); }
      @GetMapping("/agent/{agentId}") public ResponseEntity<List<NotificationDto>> forAgent(@PathVariable Long agentId){ return ResponseEntity.ok(service.getAgentNotifications(agentId)); } 
      @PutMapping("/seen/{id}") public ResponseEntity<?> markSeen(@PathVariable Long id){ service.markAsSeen(id); return ResponseEntity.ok().build(); } 
      @PutMapping("/user/{userId}/seen-all") public ResponseEntity<?> markAllUser(@PathVariable Long userId){ service.markAllAsSeenForUser(userId); return ResponseEntity.ok().build(); } 
      @PutMapping("/agent/{agentId}/seen-all") public ResponseEntity<?> markAllAgent(@PathVariable Long agentId){ service.markAllAsSeenForAgent(agentId); return ResponseEntity.ok().build(); } 
    }
