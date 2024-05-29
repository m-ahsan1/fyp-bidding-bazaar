import React,{useState} from "react";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Navbar from "../../components/Navbar";
import Subbar from "../../components/Subbar";

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
      <Subbar />
      

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
      <center>
        <br></br>
        <h1 style={{ fontSize: 30, textAlign: "center" }}><b>Our Location</b></h1>
        <br></br>
      <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.551513026608!2d74.30043917544943!3d31.481521174231872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903f08ebc7e8b%3A0x47e934f4cd34790!2sFAST%20NUCES%20Lahore!5e0!3m2!1sen!2s!4v1704666610469!5m2!1sen!2s"
      width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"/>
      </center>

    </>
  );
};
export default ContactForm;
