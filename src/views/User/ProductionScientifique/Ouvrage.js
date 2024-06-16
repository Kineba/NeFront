import React from "react";

import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";
import TableOuvrage from "../TableProduction/TableOuvrage";

const Ouvrage = () => {

  return (
    <>
      <HeaderProd title="Ouvrage Scientifique" description="Un ouvrage scientifique est un livre ou une publication écrite qui présente des informations, des théories, des recherches et des analyses dans un domaine spécifique de la science. Ces ouvrages sont généralement destinés à un public académique ou spécialisé et sont souvent utilisés comme références dans l'enseignement et la recherche."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="14">
        <Card className="bg-secondary shadow">
            {/* <div className="text-center">
              <h3>
                Jessica Jones
                <span className="font-weight-light">, 27</span>
              </h3>
              <div className="h5 font-weight-300">
                <i className="ni location_pin mr-2" />
                Bucharest, Romania
              </div>
              <div className="h5 mt-4">
                <i className="ni business_briefcase-24 mr-2" />
                Solution Manager - Creative Tim Officer
              </div>
              <div>
                <i className="ni education_hat mr-2" />
                <h1>Ouvrage</h1>
              </div>
              <hr className="my-4" />
              <p>
                Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                Murphy — writes, performs and records all of his own music.
              </p>
              <a href="#pablo" onClick={(e) => e.preventDefault()}></a>
            </div> */}
            <TableOuvrage />
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Ouvrage;
