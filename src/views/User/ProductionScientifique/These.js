import React from "react";

import HeaderProd from "components/Headers/HeaderProd";

import { Container, Col, Card } from "reactstrap";
import TableThese from "../TableProduction/TableThese";

const These = () => {
  return (
    <>
      <HeaderProd
        title="Thèse"
        description="Une thèse, ou 'thèse de doctorat', est un document écrit présentant les résultats d'une recherche approfondie réalisée par un étudiant dans le cadre de son doctorat. La thèse est généralement un document long et détaillé qui expose la méthodologie utilisée, les résultats obtenus et leur analyse, ainsi que les conclusions tirées de la recherche. Elle doit apporter une contribution originale à la connaissance dans le domaine étudié. Une fois la thèse soutenue avec succès, l'étudiant obtient le grade de docteur."
      />
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="15">
          <Card className="bg-secondary shadow">
            <TableThese />
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default These;
