import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  const user = useSelector(selectCurrentUser);
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {user.first_name} {user.last_name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {user.email}
                </Card.Text>
                <Card.Text>
                  <strong>Description:</strong> {user.description || "N/A"}
                </Card.Text>
                <Card.Text>
                  <strong>State:</strong> {user.state || "N/A"}
                </Card.Text>
                <Card.Text>
                  <strong>City:</strong> {user.city || "N/A"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
