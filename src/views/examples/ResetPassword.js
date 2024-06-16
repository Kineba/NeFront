import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    timeOut: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Effacer les messages d'erreur lors de la saisie de nouvelles données
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/resetPassword/${id}/${token}`,
      withCredentials: true,
      data: {
        password: formData.password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          setErrors({
            ...errors,
            password: res.data.errors.minPassword,
          });
        } else if (res.data.Status === "Success") {
          alert("Mot de passe modifier avec succèe!");
          navigate("/auth/login");
        } else if (res.data.Status === "ErrorWithToken") {
          setErrors({
            ...errors,
            timeOut:
              "Le délai pour la réinitialisation du mot de passe est expiré. Veuillez réessayer.",
          });
          setTimeout(() => {
            navigate("/auth/forgot_password");
          }, 5000); // Redirection après 3 secondes
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="display-3 text-center text-info mb-4">
              <small>Réinitialiser mot de passe</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="nouveau mot de passe"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                  />
                </InputGroup>
                {errors.password && (
                  <div className="text-center text-danger mt-3">
                    {errors.password}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirmer le nouveau mot de passe"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    required
                  />
                </InputGroup>

                {errors.confirmPassword && (
                  <div className="text-center text-danger mt-3">
                    {errors.confirmPassword}
                  </div>
                )}
                {errors.timeOut && (
                  <div className="text-center text-danger mt-3">
                    {errors.timeOut}
                  </div>
                )}
              </FormGroup>
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
              <small>S'inscrire</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default ResetPassword;
