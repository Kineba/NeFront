import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
  Alert,
  Row,
} from "reactstrap";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/forgotPassword`,
        { email },
        { withCredentials: true }
      );

      if (res.data.Status === "Success") {
        alert(
          "Vérifiez votre email pour la réinitialisation de votre mot de passe !"
        );
        navigate("/auth/login");
      } else if (res.data.Status === "userNotFound") {
        setErrors(
          "Nous sommes désolés, nous n'avons pas pu trouver de compte correspondant aux informations que vous avez fournies."
        );
      }
    } catch (err) {
      console.log(err);
      setErrors("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardBody className="px-lg-5 py-lg-5">
          <div className="display-3 text-center text-info mb-4">
            <small>Mot de passe oublié</small>
          </div>
          <Form role="form" onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="new-email"
                />
              </InputGroup>
            </FormGroup>
            {errors && (
              <Alert color="danger" className="alert">
                {errors}
              </Alert>
            )}
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Valider
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
      <Row className="mt-3">
        <Col className="text-left" xs="6">
          <Link to="/auth/login" className="text-light">
            <small>Se connecter</small>
          </Link>
        </Col>
        <Col className="text-right" xs="6">
          <Link to="/auth/register" className="text-light">
            <small>Creez un nouveau compte</small>
          </Link>
        </Col>
      </Row>
    </Col>
  );
};

export default ForgotPassword;
