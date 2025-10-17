package com.example.contactapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ContactBackendApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(ContactBackendApplication.class, args);
	}

}
