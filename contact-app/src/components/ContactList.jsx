import React, { useEffect, useState } from "react";
import api from "../api";
import ContactForm from "./ContactForm";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);

  // Load contacts when the component mounts
  const loadContacts = async () => {
    try {
      const res = await api.get("/all");
      setContacts(res.data);
    } catch (err) {
      console.error("Error loading contacts:", err);
    }
  };

  // Delete a contact
  const deleteContact = async (id) => {
    try {
      await api.delete(`/delete/${id}`);
      loadContacts(); // Reload contacts after deletion
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  // Set up editing mode for a contact
  const handleEdit = (contact) => setEditingContact(contact);

  // Handle saving the edited contact
  const handleSave = () => {
    setEditingContact(null); // Hide the form after save
    loadContacts(); // Reload contacts to reflect the updated data
  };

  // Cancel the edit and close the form
  const handleCancel = () => setEditingContact(null);

  useEffect(() => {
    loadContacts(); // Load contacts on mount
  }, []);

  return (
    <div>
      <h2>Contacts</h2>

      {/* Only show the form if there's a contact to edit */}
      {editingContact && (
        <ContactForm
          selectedContact={editingContact}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            {contact.name} — {contact.email} — {contact.phone}
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => deleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
