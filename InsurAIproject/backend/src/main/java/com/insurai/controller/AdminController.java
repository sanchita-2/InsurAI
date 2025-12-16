package com.insurai.controller;
 import com.insurai.dto.UserDto; 
 import com.insurai.service.AppointmentService;
  import com.insurai.service.UserService;
   import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;
     import java.util.List; @RestController @RequestMapping("/api/admin") @CrossOrigin(origins = "*") public class AdminController { private final UserService userService;
         private final AppointmentService appointmentService; 
         public AdminController(UserService userService, AppointmentService appointmentService){ this.userService=userService; this.appointmentService=appointmentService; 

         }
          @GetMapping("/agents") public ResponseEntity<List<UserDto>> getAgents(){ return ResponseEntity.ok(userService.getAllAgents()); } 
          @PutMapping("/approve/{id}") public ResponseEntity<?> approveAgent(@PathVariable Long id){ try{ return ResponseEntity.ok(userService.approveAgent(id,1));

           }catch(RuntimeException e){ return ResponseEntity.badRequest().body(e.getMessage()); }
         } @GetMapping("/users") public ResponseEntity<List<UserDto>> getUsers(){ return ResponseEntity.ok(userService.getAllUsers()); 
            
         } @GetMapping("/appointments") public ResponseEntity<?> allAppointments(){ return ResponseEntity.ok(appointmentService.getAllAppointments()); } 
        }
