package com.example.contactapp.service;

import com.example.contactapp.model.Contact;
import com.example.contactapp.repository.ContactRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    private final ContactRepository repo;

    public ContactService(ContactRepository repo) {
        this.repo = repo;
    }

    public List<Contact> findAll() {
        return repo.findAll();
    }

    public Optional<Contact> findById(Long id) {
        return repo.findById(id);
    }

    public Contact save(Contact contact) {
        return repo.save(contact);
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }
}
