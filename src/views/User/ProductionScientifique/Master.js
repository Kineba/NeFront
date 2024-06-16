import React from "react";

import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";
import TableMaster from "../TableProduction/TableMaster";

const Master = () => {

  return (
    <>
      <HeaderProd
        title="Mastère"
        description="Un master de recherche est un diplôme de deuxième cycle universitaire qui se concentre principalement sur la recherche académique dans un domaine spécifique. Il est souvent considéré comme une étape vers un doctorat et implique généralement la rédaction d'un mémoire de recherche. Ce programme vise à approfondir les connaissances théoriques et pratiques dans un domaine particulier et à développer les compétences nécessaires à la recherche scientifique."
      />
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="14">
          <Card className="bg-secondary shadow">
            <TableMaster />
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Master;
