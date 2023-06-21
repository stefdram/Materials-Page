import React, { SyntheticEvent, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { NavigateFunction, useNavigate } from "react-router-dom";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [NIK, setNIK] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    // interact with the backend
    if (name === "" || NIK === "" || password === "") {
      setError("Please fill in all fields!");
      return;
    }
    const response = await fetch("http://localhost:4000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        nik: NIK,
        password: password,
      }),
    });

    if (response.status === 400) {
      setError("User already exist!");
      setName("");
      setNIK("");
      setPassword("");
      return;
    }

    navigate("/login");
  };

  let basicTemplate = (
    <div>
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="firstName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="basicId">
            <Form.Label>NIK</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter NIK"
              value={NIK}
              onChange={(e) => setNIK(e.target.value)}
              min={10000000}
              max={99999999}
            />
          </Form.Group>

          <Form.Group className="my-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (inputValue.includes(" ")) {
                  setError("Password cannot contain spaces!");
                } else {
                  setError("");
                  setPassword(inputValue);
                }
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {error !== "" && (
          <p style={{ marginTop: "20px", color: "red" }}>{error}</p>
        )}
      </FormContainer>
    </div>
  );

  return <div>{basicTemplate}</div>;
};
export default SignupScreen;
