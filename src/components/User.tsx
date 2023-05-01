import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DialogBox from "./Dialog";
import { UserInterface } from "../hooks/useUsers";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  user: UserInterface;
  index: number;
  onDeleteUser: (id: number) => void;
  onSaveUser: (index: number, user: UserInterface) => void;
};

const User = ({ user, index, onDeleteUser, onSaveUser }: Props) => {
  const [tempUser, setUser] = useState(user);
  const [disabled, setDisabled] = useState(true);
  const [enableSave, setSaveEnabled] = useState(true);
  const [error, setError] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setUser(user);
  }, [user]);

  const calculateAge = (birthdate: string) => {
    const ageDiff = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const calculateDob = (age: number): string => {
    const date = new Date();
    const year = date.getFullYear() - age;
    const month = date.getMonth();
    const day = date.getDay();
    const dob = new Date(year, month, day).toISOString().slice(0, 10);
    return dob;
  };

  const onDeleteUserHandle = (index: number) => {
    setShowDialog(true);
    // onDeleteUser(index);
  };

  const handleConfirmClick = (index: number) => {
    setShowDialog(false);
    onDeleteUser(index);
  };

  const handleCancelClick = () => {
    setShowDialog(false);
  };

  const onSaveUserHandle = (index: number) => {
    if (
      calculateAge(tempUser.dob) <= 0 ||
      tempUser.country === "" ||
      tempUser.description === ""
    ) {
      setError("All Fields are mandatory");
      return;
    }

    const regex = /\d/;
    if (regex.test(tempUser.country)) {
      setError("Country cannot contain numbers");
      return;
    }

    setError("");
    setDisabled(true);
    onSaveUser(index, tempUser);
  };

  const onCancelUserHandle = () => {
    setUser(user);
    setDisabled(true);
    setSaveEnabled(true);
  };

  const handleChange = (e: any) => {
    console.log(e.target.value);
    setSaveEnabled(false);
    const { name } = e.target;

    if (name === "dob") {
      e.target.value = calculateDob(e.target.value);
    }

    setUser({ ...tempUser, [e.target.name]: e.target.value });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    // allow only numbers and backspace
    if (key !== "Backspace" && /\D/.test(key)) {
      e.preventDefault();
    }
  };

  return (
    <>
      <Accordion.Item
        eventKey={index.toString()}
        style={{ marginBottom: "10px" }}
      >
        <Card key={tempUser.id}>
          <Accordion.Header>
            <img
              src={tempUser.picture}
              alt={tempUser.first}
              style={{ marginRight: "10px" }}
            />
            <Card style={{ padding: "10px", marginLeft: "20px" }}>
              {tempUser.first} {tempUser.last}
            </Card>
          </Accordion.Header>
          <Accordion.Body>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId={`formBasicAge${index}`}>
                    <Form.Label>Age:</Form.Label>
                    <div>
                      <Form.Control
                        type="text"
                        name="dob"
                        maxLength={4}
                        onKeyDown={handleKeyPress}
                        disabled={disabled}
                        value={calculateAge(tempUser.dob)}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formBasicGender${index}`}>
                    <Form.Label>Gender:</Form.Label>
                    <Form.Select
                      name="gender"
                      value={tempUser.gender}
                      onChange={handleChange}
                      disabled={disabled}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Transgender</option>
                      <option>Rather not say</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId={`formBasicCountry${index}`}>
                    <Form.Label>Country:</Form.Label>
                    <div>
                      <Form.Control
                        type="text"
                        disabled={disabled}
                        name="country"
                        value={tempUser.country}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId={`formBasicDescription${index}`}>
                    <Form.Label>Description:</Form.Label>
                    <div>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        disabled={disabled}
                        value={tempUser.description}
                        style={{ resize: "none" }}
                        onChange={handleChange}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                {disabled ? (
                  <div className="d-flex justify-content-between">
                    {error && (
                      <Col style={{ alignSelf: "center", color: "red" }}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        {error}
                      </Col>
                    )}
                    <Col className="text-end">
                      <Button
                        variant="primary"
                        className="me-2 mt-2"
                        disabled={calculateAge(user.dob) > 18 ? false : true}
                        onClick={() => setDisabled(false)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className="mt-2"
                        onClick={() => onDeleteUserHandle(index)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    {error && (
                      <Col style={{ alignSelf: "center", color: "red" }}>
                        <FontAwesomeIcon
                          style={{ padding: "10px", verticalAlign: "-11px" }}
                          icon={faExclamationTriangle}
                        />
                        {error}
                      </Col>
                    )}
                    <Col className="text-end">
                      <Button
                        variant="danger"
                        className="me-2 mt-2"
                        onClick={() => onCancelUserHandle()}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        className="mt-2"
                        disabled={enableSave}
                        onClick={() => onSaveUserHandle(index)}
                      >
                        Save
                      </Button>
                    </Col>
                  </div>
                )}
                {showDialog && (
                  <DialogBox
                    show={showDialog}
                    index={index}
                    message="Are you sure you want to delete?"
                    onCancel={handleCancelClick}
                    onDelete={handleConfirmClick}
                  />
                )}
              </Row>
            </Form>
          </Accordion.Body>
        </Card>
      </Accordion.Item>
    </>
  );
};

export default User;
