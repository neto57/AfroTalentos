package com.example.talentosAfro;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"controller", "model", "repository"})
public class TalentosAfroApplication {
    public static void main(String[] args) {
        SpringApplication.run(TalentosAfroApplication.class, args);
    }
}
