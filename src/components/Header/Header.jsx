import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Button,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { db, auth } from "../../db";
import { AuthContext } from "../../auth";

export function Header() {
  const { currentUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSignOut = () => {
    auth.signOut();
  };

  const handleSubmit = async () => {
    try {
      if (currentUser && currentUser.uid) {
        await db.collection("todos").add({
          name,
          completed: false,
          createdAt: Date.now(),
          lastUpdated: Date.now(),
          userId: currentUser.uid,
        });
        //close modal
        setName("");
        setShow(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="#">Todos List</Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleShow}>
            + Add
          </Button>
          <Link to={"/"}>
            <Button variant="outline-light" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Link>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">
                Name
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
