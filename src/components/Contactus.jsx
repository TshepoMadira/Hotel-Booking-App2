import React, { useState } from "react";
import emailjs from "emailjs-com";

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_saxhxw5";
    const templateID = "template_jx6vi08";
    const userID = "HaUr40DNpgZEgcfxD";

    emailjs.send(serviceID, templateID, formData, userID)
      .then((response) => {
        console.log("Email sent successfully!", response);
        alert("Thank you for your message! I'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Oops! Something went wrong. Please try again.");
      });
  };

  return (
    <section id="contact">
      <h2>Get In Touch</h2>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name" 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email" 
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Your Message"
            required
          />
        </div>
        <button type="submit" className="cta-button">
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contactus;