import React from "react";

import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";
import TableBrevet from "../TableProduction/TableBrevet";

const Brevet = () => {
  return (
    <>
      <HeaderProd
        title="Brevet"
        description="Un brevet dans le domaine de la recherche informatique protège des inventions techniques telles que des algorithmes, des méthodes de traitement de données, des architectures de systèmes, des logiciels ou des dispositifs matériels. Il offre aux inventeurs une exclusivité d'exploitation de leur invention pendant environ 20 ans."
      />
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="15">
          <Card className="bg-secondary shadow">
            <TableBrevet />
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Brevet;
