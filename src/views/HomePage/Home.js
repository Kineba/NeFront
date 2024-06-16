// import React, { useState } from "react";
// import {
//   Container,
//   Jumbotron,
//   Row,
//   Col,
//   Card,
//   CardBody,
//   CardTitle,
//   CardText,
//   Button,
// } from "reactstrap";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Footer from "components/Footers/Footer";
// import Video from "./Video";

// const transformURLsToLinks = (text) => {
//   const urlRegex = /(https?:\/\/[^\s]+)/g;
//   return text.split(urlRegex).map((part, index) => {
//     if (urlRegex.test(part)) {
//       return (
//         <a key={index} href={part} target="_blank" rel="noopener noreferrer">
//           {part}
//         </a>
//       );
//     }
//     return part;
//   });
// };

// const Home = () => {
//   const [redirectToNews, setRedirectToNews] = useState(false);
//   const posts = useSelector((state) => state.postReducer);
//   // Sort posts by date and get the latest three
//   const latestPosts = posts
//     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//     .slice(0, 3);

//   const handleSeeMore = () => {
//     setRedirectToNews(true);
//   };

//   const formatDate = (isoDate) => {
//     const date = new Date(isoDate);
//     return date.toLocaleDateString("fr-FR", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   if (redirectToNews) {
//     return <Navigate to="/accueil/actuality" />;
//   }

//   return (
//     <>
//       <Video />
//       <Jumbotron>
//         <hr className="my-3" />
//         <h1 className="display-4 text-uppercase text-center">
//           Laboratoire de recherche HATEM BETTAHAR{" "}
//         </h1>
//         <p className="text-dark mt-0 mb-5">
//           Le Laboratoire de Recherche Hatem Bettahar (IRESCOMATH) à la Faculté
//           des Sciences de Gabès, créé en 2020, se spécialise dans les TIC et les
//           Mathématiques Appliquées, soutenant les jeunes chercheurs et
//           favorisant des collaborations scientifiques nationales et
//           internationales.
//         </p>
//       </Jumbotron>
//       <hr className="mt-0" />
//       <Container>
//         <h2 className="display-4 text-uppercase text-center">
//           Dernières actualités
//         </h2>
//         <hr className="mt-0" />
//         <Row>
//           {latestPosts.map((post) => (
//             <Col md="4" key={post._id} className="mb-4">
//               <Card className="card-lift--hover">
//                 <CardBody>
//                   <CardTitle tag="h5" className="display-4 text-info">
//                     {post.title}
//                   </CardTitle>
//                   <CardText className="lead">
//                   {post.message.length > 500
//                       ? transformURLsToLinks(`${post.message.substring(0, 500)}...`)
//                       : transformURLsToLinks(post.message)}
//                   </CardText>
//                   {post.images.length > 0 && (
//                     <img
//                       src={`${process.env.REACT_APP_API_URL}${post.images[0]}`}
//                       alt={post.title}
//                       className="img-thumbnail border-info"
//                     />
//                   )}
//                   <Row className="mt-2 justify-content-xl-between">
//                     <Button color="info" onClick={handleSeeMore}>
//                       En savoir plus
//                     </Button>
//                     <p>Date de publication : {formatDate(post.createdAt)}</p>
//                     </Row>
//                 </CardBody>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//       <Footer />
//     </>
//   );
// };

// export default Home;
import React, { useState } from "react";
import {
  Container,
  Jumbotron,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Footer from "components/Footers/Footer";
import Video from "./Video";

const transformURLsToLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
};

const Home = () => {
  const [redirectToNews, setRedirectToNews] = useState(false);
  const posts = useSelector((state) => state.postReducer);

  // Check if posts is an array before sorting
  const latestPosts = Array.isArray(posts)
    ? posts
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3)
    : [];

  const handleSeeMore = () => {
    setRedirectToNews(true);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (redirectToNews) {
    return <Navigate to="/accueil/actuality" />;
  }

  return (
    <>
      <Video />
      <Jumbotron>
        <hr className="my-3" />
        <h1 className="display-4 text-uppercase text-center">
          Laboratoire de recherche HATEM BETTAHAR{" "}
        </h1>
        <p className="text-dark mt-0 mb-5">
          Le Laboratoire de Recherche Hatem Bettahar (IRESCOMATH) à la Faculté
          des Sciences de Gabès, créé en 2020, se spécialise dans les TIC et les
          Mathématiques Appliquées, soutenant les jeunes chercheurs et
          favorisant des collaborations scientifiques nationales et
          internationales.
        </p>
      </Jumbotron>
      <hr className="mt-0" />
      <Container>
        <h2 className="display-4 text-uppercase text-center">
          Dernières actualités
        </h2>
        <hr className="mt-0" />
        <Row>
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <Col md="4" key={post._id} className="mb-4">
                <Card className="card-lift--hover">
                  <CardBody>
                    <CardTitle tag="h5" className="display-4 text-info">
                      {post.title}
                    </CardTitle>
                    <CardText className="lead">
                      {post.message.length > 500
                        ? transformURLsToLinks(
                            `${post.message.substring(0, 500)}...`
                          )
                        : transformURLsToLinks(post.message)}
                    </CardText>
                    {post.images.length > 0 && (
                      <img
                        src={`${process.env.REACT_APP_API_URL}${post.images[0]}`}
                        alt={post.title}
                        className="img-thumbnail border-info"
                      />
                    )}
                    <Row className="mt-2 justify-content-xl-between">
                      <Button color="info" onClick={handleSeeMore}>
                        En savoir plus
                      </Button>
                      <p>Date de publication : {formatDate(post.createdAt)}</p>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">Aucune actualité disponible pour le moment.</p>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
