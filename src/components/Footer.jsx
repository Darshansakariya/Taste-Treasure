// eslint-disable-next-line no-unused-vars
import React from "react";
import "../componentsCSS/footer.css";

export default function Footer() {
  return (
    <>
      {/* <!-- TODO footer start --> */}
      <footer className="footer1 pt-5 w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="wrapper d-flex justify-content-center align-items-center">
          <div className="wrapper5">
            <h1 className="text-center">Eat, Cook, Repeat</h1>
            <h5 className="text-center">
              Share your best recipe by uploading here !
            </h5>
          </div>
        </div>
      </footer>
      {/* <!-- ! --> */}
      <footer className="footer2 w-100 d-flex flex-column justify-content-center align-items-center">
        <div className="foot d-flex justify-content-center">
          <ul className="d-flex list-unstyled">
            <li>Product</li>
            <li>Company</li>
            <li>Learn More</li>
            <li>Get in Touch</li>
          </ul>
        </div>
      </footer>
      {/* <!-- TODO footer end --> */}
    </>
  );
}
