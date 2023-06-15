import React, { SyntheticEvent, useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router";

const LoginScreen = () => {
  const [NIK, setNIK] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    // interact with the backend using fetch
    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nik: NIK,
        password: password,
      }),
    });
    if (response.status === 404) {
      setError("User does not exist!");
      setNIK("");
      setPassword("");
      return;
    } else if (response.status === 400) {
      setError("Incorrect Password!");
      setPassword("");
      return;
    }
    const data = await response.json();
    const token = data.token;
    console.log(token);
    localStorage.setItem('token', token);
    localStorage.setItem('NIK', NIK);
    setNIK("");
    setPassword("");
    navigate("/materials");
  };

  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
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
            onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default LoginScreen;
