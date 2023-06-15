import React, { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  children: ReactNode;
}

const FormContainer = ({ children }: Props) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
