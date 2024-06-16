import React from "react";
import HeaderProd from "components/Headers/HeaderProd";
import { Container, Col, Card } from "reactstrap";
import TableConvention from "../TableEvenement/TableConvention";

const Convention = () => {
  return (
    <>
      <HeaderProd title="Convention" description="Une convention dans un laboratoire de recherche informatique est un événement organisé régulièrement ou ponctuellement pour réunir des membres de la communauté scientifique, des praticiens de l'industrie, des étudiants et d'autres parties prenantes afin de discuter de sujets variés liés à l'informatique, tels que les dernières avancées technologiques, les tendances de recherche, les défis et les opportunités du secteur, les bonnes pratiques, les méthodologies, etc."/>
      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <TableConvention/>
          </Card>
        </Col>
      </Container>
    </>
  );
};

export default Convention;