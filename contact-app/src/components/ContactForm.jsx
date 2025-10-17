import React, { useState, useEffect } from "react";
import api from "../api"; // Assuming you have an API utility for adding/editing contacts

const ContactForm = ({ selectedContact, onSave, onCancel }) => {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (selectedContact) {
      setContact(selectedContact); // Populate form with contact info when editing
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (contact.id) {
        // Edit existing contact
        await api.put(`/update/${contact.id}`, contact);
      } else {
        // Add new contact (though we're not using this functionality anymore)
        await api.post("/add", contact);
      }
      onSave(); // Refresh the contact list after editing
      setContact({ name: "", email: "", phone: "" }); // Reset form after save
    } catch (err) {
      console.error("Error submitting contact:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={contact.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={contact.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">{contact.id ? "Update" : "Add"} Contact</button>
      {contact.id && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default ContactForm;
