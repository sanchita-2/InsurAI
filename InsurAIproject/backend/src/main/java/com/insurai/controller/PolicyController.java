package com.insurai.controller; import com.insurai.dto.PolicyDto; 
import com.insurai.service.PolicyService; import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*; import java.util.List;
  @RestController 
  @RequestMapping("/api/admin/policies")

  @CrossOrigin(origins = "*") public class PolicyController { 
    private final PolicyService service;
     public PolicyController(PolicyService service){ this.service=service; }
   @GetMapping public ResponseEntity<List<PolicyDto>> all(){ return ResponseEntity.ok(service.all()); 


} @PostMapping public ResponseEntity<PolicyDto> create(@RequestBody PolicyDto dto){ return ResponseEntity.ok(service.create(dto)); }
 @PutMapping("/{id}") public ResponseEntity<PolicyDto> update(@PathVariable Long id, @RequestBody PolicyDto dto)
 { return ResponseEntity.ok(service.update(id,dto)); 

   }
    @DeleteMapping("/{id}") public ResponseEntity<?> delete(@PathVariable Long id){ service.delete(id);
         return ResponseEntity.ok().build();
         } }
