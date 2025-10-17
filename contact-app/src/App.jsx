import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import api from "./api"; // Assuming you have an API utility for fetching data

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isFormVisible, setFormVisible] = useState(false); // Track whether the form should be visible

  // Fetch contacts when the component mounts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await api.get("/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []); // Only run once when the component mounts

  // Trigger to fetch contacts after adding a new contact
  const handleAddContact = async () => {
    const response = await api.get("/contacts");
    setContacts(response.data); // Update the contacts list
    setFormVisible(false); // Hide the form after adding contact
  };

  // Toggle visibility of the contact form
  const toggleForm = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📞 Contact Management System</h1>

      {/* Show form if isFormVisible is true */}
      {isFormVisible && <ContactForm onAdd={handleAddContact} />}

      {/* Button to toggle form visibility */}
      <button onClick={toggleForm}>
        {isFormVisible ? "Cancel" : "Add New Contact"}
      </button>

      {/* Render the contact list */}
      <ContactList contacts={contacts} />
    </div>
  );
};

export default App;
