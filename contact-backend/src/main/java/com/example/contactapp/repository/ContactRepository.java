package com.example.contactapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.contactapp.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}

