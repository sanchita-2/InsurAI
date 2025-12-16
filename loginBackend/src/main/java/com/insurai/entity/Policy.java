package com.insurai.entity;
import jakarta.persistence.*;
@Entity @Table(name="policies")
 public class Policy { @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
     private Long id; 
     private String title;
      @Column(length=4000)
       private String description; 
      private Double premium; 
      public Policy(){}
       public Long getId(){return id;

      }

       public void setId(Long id){this.id=id;}

        public String getTitle(){return title;} 
        public void setTitle(String title){this.title=title;} 
        public String getDescription(){return description;}
         public void setDescription(String description){this.description=description;}
         public Double getPremium(){return premium;} 
         public void setPremium(Double premium){this.premium=premium;} }
