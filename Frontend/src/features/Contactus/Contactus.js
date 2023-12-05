import React,{useState} from "react";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Navbar from "../../components/Navbar";

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState("Send");
  const [message, setMessage] = useState({ text: "", type: "" });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
  
    try {
      const { name, email, message } = e.target.elements;
      const formData = {
        name: name.value,
        email: email.value,
        message: message.value,
      };
  
      const response = await fetch("http://localhost:3001/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setFormStatus("Send");
        setMessage({ text: "Message sent!", type: "success" });
        setTimeout(() => {
          setMessage({ text: "", type: "" });
        }, 3000);
        e.target.reset();
      } else {
        setFormStatus("Send");
        setMessage({ text: "Failed to send message.", type: "error" });
      }
    } catch (error) {
      setFormStatus("Send");
      setMessage({ text: "Error submitting message.", type: "error" });
    }
  };
  
  return (
    <>
      <Navbar />
      

      <div className="container mt-5" style={{ maxWidth: "70%" }}>
      <h1 style={{ fontSize: 30, textAlign: "center" }}>Contact Us</h1>
        
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input className="form-control" type="text" id="name" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-control" type="email" id="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea className="form-control" id="message" required />
          </div>
          <button className="btn btn-danger" style={{ backgroundColor: "red" }} type="submit">
            {formStatus}
          </button>
          {message.text && (
            <p className={`message-${message.type}`}>{message.text}</p>
          )}
        </form>
        <div className="mt-4">
          {/* Social media icons */}
          <FontAwesomeIcon icon={faTwitter} size="2x" style={{ margin: '0 5px' }} />
          <FontAwesomeIcon icon={faFacebook} size="2x" style={{ margin: '0 5px' }} />
          <FontAwesomeIcon icon={faInstagram} size="2x" style={{ margin: '0 5px' }} />
        </div>
      </div>
    </>
  );
};
export default ContactForm;
