import React from "react";
import bootstrapBundleMin from "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Navbar from "../../components/Navbar";

const ContactForm = () => {
  const [formStatus, setFormStatus] = React.useState("Send");
  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus("Submitting...");
    const { name, email, message } = e.target.elements;
    let conFom = {
      name: name.value,
      email: email.value,
      message: message.value,
    };
    console.log(conFom);
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: "70%" }}>
        <center>
          <h1 style={{ fontSize: 30 }}>Contact Us</h1>
        </center>
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
          <button className="btn btn-danger"  style={{backgroundColor: "red"}}type="submit">
            {formStatus}
          </button>
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
