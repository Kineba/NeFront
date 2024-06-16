import React from "react";

import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";
import TableHabilitation from "views/Admin/TableProduction/TableHabilitation";

const HabilitationAdmin = () => {

  return (
    <>
      <HeaderProd
        title="Habilitation"
        description="L'habilitation dans le domaine d'un laboratoire de recherche informatique concerne les qualifications et autorisations nécessaires pour travailler, mener des recherches ou superviser des projets dans ce domaine."
      />
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="14">
          <Card className="bg-secondary shadow">
            <TableHabilitation />
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default HabilitationAdmin;
