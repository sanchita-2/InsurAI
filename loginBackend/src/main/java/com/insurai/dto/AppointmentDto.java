package com.insurai.dto; import java.time.LocalDateTime;
 public class AppointmentDto{
     private Long id;
      private Long userId;
       private Long agentId; 
       private String message;
        private LocalDateTime appointmentTime; 
        private String status;
         private String userName; 
        private String agentName;
         public Long getId(){return id;} public void setId(Long id){this.id=id;} public Long getUserId(){return userId;} public void setUserId(Long userId){this.userId=userId;} 
         public Long getAgentId(){return agentId;} public void setAgentId(Long agentId){this.agentId=agentId;} public String getMessage(){return message;} 
         public void setMessage(String message){this.message=message;} 
         public LocalDateTime getAppointmentTime(){return appointmentTime;}
          public void setAppointmentTime(LocalDateTime appointmentTime){this.appointmentTime=appointmentTime;} public String getStatus(){return status;}
           public void setStatus(String status){this.status=status;} 
           public String getUserName(){return userName;} 
           public void setUserName(String userName){this.userName=userName;}
            public String getAgentName(){return agentName;} public void setAgentName(String agentName){this.agentName=agentName;} }