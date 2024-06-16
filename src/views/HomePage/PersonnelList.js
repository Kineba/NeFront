import React from "react";
import { Container, Col, Card, Row } from "reactstrap";
import Video from "./Video";
import Footer from "components/Footers/Footer";

const personnelData = [
  { id: 1, name: "KHALIFA DABBEK", position: "Mathématiques", role: "PR" },
  { id: 2, name: "FEDOUA BENABID", position: "Informatique", role: "MC" },
  { id: 3, name: "HAIFA TOUATI", position: "Informatique", role: "MC" },
  { id: 4, name: "HOUCIN TOMBARI", position: "Informatique", role: "MC" },
  {
    id: 5,
    name: "NAJOUA BENNAJI",
    position: "Électronique et Microélectronique",
    role: "MC",
  },
  {
    id: 6,
    name: "SALAH ZIDI",
    position: "Informatique Industrielle",
    role: "MC",
  },
  { id: 7, name: "MOHAMED ABID", position: "Informatique", role: "MA" },
  { id: 8, name: "AHMED ABOUD", position: "Informatique", role: "MA" },
  { id: 9, name: "BECHIR ALAYA", position: "Informatique", role: "MA" },
  { id: 10, name: "IKBEL AZAIEZ", position: "Informatique", role: "MA" },
  { id: 11, name: "MOHAMED BELHASSEN", position: "Informatique", role: "MA" },
  { id: 12, name: "HACEN BEN ABDALLAH", position: "Mathématiques", role: "MA" },
  { id: 13, name: "EYA BEN CHARRADA", position: "Informatique", role: "MA" },
  { id: 14, name: "CHAKER BEN MAHMOUD", position: "Informatique", role: "MA" },
  { id: 15, name: "HAFEDH BEN ZINA", position: "Télécom", role: "MA" },
  { id: 16, name: "MBAREK CHARHAD", position: "Informatique", role: "MA" },
  { id: 17, name: "NASREDDINE HAJLAOUI", position: "Informatique", role: "MA" },
  { id: 18, name: "KHALED HASSINE", position: "Informatique", role: "MA" },
  { id: 19, name: "JAWHAR HBIL", position: "Mathématiques", role: "MA" },
  { id: 20, name: "ISSAM JABRI", position: "Informatique", role: "MA" },
  { id: 21, name: "KAOUTHER MANSOUR", position: "Informatique", role: "MA" },
  { id: 22, name: "ABIR MCHERGUI", position: "Informatique", role: "MA" },
  { id: 23, name: "FETHI MGUIS", position: "Informatique", role: "MA" },
  { id: 24, name: "TAREK MOULAHI", position: "Informatique", role: "MA" },
  { id: 25, name: "FATMA SOMAA", position: "Informatique", role: "MA" },
  { id: 26, name: "NADIA SRAIEB", position: "Mathématiques", role: "MA" },
  { id: 27, name: "MOUNIRA TARHOUNI", position: "Informatique", role: "MA" },
  { id: 28, name: "MOHAMED ZAWAY", position: "Informatique", role: "MA" },
  { id: 29, name: "AMOR HAMMAMI", position: "Informatique", role: "MA" },
  { id: 30, name: "AMINE LAMINE", position: "Mathématiques", role: "MA" },
  { id: 31, name: "SARRA JEBRI", position: "Télécom", role: "AS" },
  { id: 32, name: "ARIJ BEN AMOR", position: "Télécom", role: "AS" },
  { id: 33, name: "AMIRA CHRIKI", position: "Informatique", role: "AS" },
  { id: 34, name: "JOHN DOE", position: "Mathématiques", role: "AS" },
  { id: 35, name: "JANE SMITH", position: "Informatique", role: "AS" },
];

const roles = {
  PR: "Professeur",
  MC: "Maîtres de Conférences",
  MA: "Maîtres Assistants",
  AS: "Assistants",
};

function PersonnelList() {
  const groupedPersonnel = personnelData.reduce((acc, person) => {
    if (!acc[person.role]) {
      acc[person.role] = [];
    }
    acc[person.role].push(person);
    return acc;
  }, {});

  return (
    <div>
      <Video />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1 center" xl="10">
            <Card md className="bg-white shadow card-lift--hover">
              <div className="mx-md-n-9 mx-md-n-9 my-md-n-6">
                <h1 className="display-3 text-info text-center text-underline ">
                  {" "}
                  Liste des membres et de leurs spécialités
                </h1>
                {Object.keys(groupedPersonnel).map((role) => (
                  <div key={role}>
                    <h1 className="display-3 text-info"> {roles[role]}</h1>
                    <ul>
                      {groupedPersonnel[role].map((person) => (
                        <li key={person.id}>
                          <h4 className="lead">
                            {person.name} <p>({person.position})</p>
                          </h4>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default PersonnelList;
