// eslint-disable-next-line no-unused-vars
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const LogoutModal = ({ show, onHide }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <Modal size="sm" show={show} onHide={onHide} centered>
      <Modal.Body className="d-flex flex-column text-center">
        Are you sure you want to logout?
        <div className="mt-5">
          <Button
            variant="secondary"
            className="me-2"
            style={{ width: "100px" }}
            onClick={onHide}
          >
            Cancel
          </Button>
          <Button
            variant="warning text-white"
            style={{ width: "100px" }}
            onClick={() => {
              handleLogout();
              onHide();
            }}
          >
            Yes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
