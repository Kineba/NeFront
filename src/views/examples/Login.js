import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "components/AuthContext";
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
  Row,
  Col,
} from "reactstrap";
// import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email_error.mt-4");
    const passwordError = document.querySelector(".password_error.mt-4");
    const compteError = document.querySelector(".compte_error");
    // Effacer les erreurs précédentes
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    compteError.innerHTML = "";

    try {
      const response = await login(formData.email, formData.password);
      if (response && response.data.errors) {
        emailError.innerHTML = response.data.errors.email || "";
        passwordError.innerHTML = response.data.errors.password || "";
        compteError.innerHTML = response.data.errors.adminProble || "";
      } else {
        navigate("/labo/profile");
      }
      
       
      
    } catch (err) {
      console.error(err);
      // compteError.innerHTML = "Une erreur s'est produite lors de la connexion.";
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="display-3 text-center text-info mb-4">
              <small>se connecter</small>
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
                    type="text"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="new-email"
                  />
                </InputGroup>
               
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
                
                <div className="password_error mt-4"></div>
                <div className="email_error mt-4"></div>
               
                
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Valider
                </Button>
              </div>
              <div className="compte_error"></div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-left" xs="6">
            <Link to="/auth/forgot_password" className="text-light">
              <small>Mot de passe oublié?</small>
            </Link>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/auth/register" className="text-light">
              <small>Creez un nouveau compte</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
