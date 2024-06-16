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
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Register component
const Register = () => {
  const navigate = useNavigate();

  // State to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input changes and update the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    const emailError = document.querySelector(".email_error.mt-3");
    const passwordError = document.querySelector(".password_error.mt-3");
    const firstNameError = document.querySelector(".firstName_error");
    const lastNameError = document.querySelector(".lastName_error");
    const passwordConfirmError = document.querySelector(
      ".confirm_password_error.mt-3"
    );
    passwordConfirmError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    firstNameError.innerHTML = "";
    lastNameError.innerHTML = "";

    if (formData.password !== formData.confirmPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      // Make a POST request to register the user

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        },
      })
        .then((res) => {
          // Display errors if any
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
            firstNameError.innerHTML = res.data.errors.firstName;
            lastNameError.innerHTML = res.data.errors.lastName;
          } else {
            // Show success message and navigate to login page
            alert(
              "Votre inscription a réussi. Vous recevrez un email de confirmation lorsque votre inscription sera approuvée. Nous vous remercions !"
            );
            navigate("/auth/login");
          }
        })
        .catch((err) => {
          console.log("error");
        });
    }
  };

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="display-3 text-center text-info mb-3">
              <small>S'inscrire</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Nom"
                    type="text"
                    name="lastName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <div className="lastName_error"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Prenom"
                    type="text"
                    name="firstName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <div className="firstName_error"></div>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
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
                <div className="email_error mt-3"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
                <div className="password_error mt-3"></div>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirmé le mot de passe"
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </InputGroup>
                <div className="confirm_password_error mt-3"></div>
              </FormGroup>
              <Row className="my-4">
                <Col xs="12">
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="customCheckRegister"
                      type="checkbox"
                      name="agreeToPolicy"
                      checked={formData.agreeToPolicy}
                      onChange={handleInputChange}
                    />
                  </div>
                </Col>
              </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  valider
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
        </Row>
      </Col>
    </>
  );
};

export default Register;
