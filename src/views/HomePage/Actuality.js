import { Container, Col, Card } from "reactstrap";
import Video from "./Video";
import Footer from "components/Footers/Footer";
import Thread from "./Thread";

import { useAuth } from "components/AuthContext";
import Header from "components/Headers/Header";

const Actuality = () => {
  const { user } = useAuth();
  return (
    <>
      {user && (user.role === "admin" || user.role === "secretary") && (
        <Header />
      )}
      {!user && <Video />}

      <Container className="mt--7" fluid>
        <Col className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <div className="p-lg-5">
              <Thread />
            </div>
          </Card>
        </Col>
      </Container>
      <Footer />
    </>
  );
};

export default Actuality;
