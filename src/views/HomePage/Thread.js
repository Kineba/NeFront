import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "actions/post.action";
import PostForm from "./AddPost";
import { useAuth } from "components/AuthContext";
import {
  Row,
  Col,
  Card,
  Media,
  CardBody,
  CardImg,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import axios from "axios";

const transformURLsToLinks = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
};

function Thread() {
  const [loadPost, setLoadPost] = useState(true);
  const [showFullImages, setShowFullImages] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);

  const { user } = useAuth();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch]);

  const toggleShowFullImages = (postId) => {
    setShowFullImages((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const deletePost = async (postId) => {
    try {
      const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?");
      if (confirmation) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}api/post/delete/actuality/${postId}`
        );
        dispatch(getPosts());
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
    }
  };

  const openEditForm = (post) => {
    setEditingPost(post);
    setShowPostForm(false);
  };

  const closeEditForm = () => {
    setEditingPost(null);
    setShowPostForm(false);
  };

  const handleAddPost = () => {
    setEditingPost(null);
    setShowPostForm(true);
  };

  const handlePostFormSubmit = () => {
    dispatch(getPosts());
    setEditingPost(null); // Réinitialiser editingPost pour fermer le formulaire
    setShowPostForm(false); // Facultatif : pour s'assurer que showPostForm est également mis à false
  };
  
  

  const handlePostFormCancel = () => {
    setShowPostForm(false);
  };

  const renderPosts = () => {
    return posts.length > 0
      ? posts.map((post) => (
          <Col md="8" key={post._id} className="center">
            <Card className="card-lift--hover">
              <CardBody>
                <Row className="justify-content-xl-between">
                  <p className="display-3 text-info">{post.title}</p>
                  <Media>
                    <span className="avatar">
                      <img
                        alt="..."
                        src={require("../../assets/img/brand/irescomath.png")}
                      />
                    </span>
                  </Media>
                </Row>
                <p className="lead text-justify">
                  {transformURLsToLinks(post.message)}
                </p>
                {post.images.length > 0 && (
                  <>
                    <CardImg
                      top
                      src={`${process.env.REACT_APP_API_URL}${post.images[0]}`}
                      alt="..."
                      className="img-thumbnail border-info"
                    />
                    <hr className="m-3" />
                    {showFullImages[post._id] && (
                      <div>
                        {post.images.slice(1).map((image, index) => (
                          <React.Fragment key={index}>
                            <img
                              src={`${process.env.REACT_APP_API_URL}${image}`}
                              alt="..."
                              className="img-thumbnail border-info"
                            />
                            <hr className="m-3" />
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                    {post.images.length > 1 && (
                      <Button
                        color="link"
                        onClick={() => toggleShowFullImages(post._id)}
                      >
                        {showFullImages[post._id] ? "Voir moins" : "Voir plus"}
                      </Button>
                    )}
                  </>
                )}
                <Row className="align-items-center justify-content-xl-between">
                  {user &&
                    (user.role === "admin" || user.role === "secretary") && (
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          role="button"
                          size="sm"
                          color="light"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu
                          className="dropdown-menu-arrow"
                          positionFixed
                        >
                          <DropdownItem onClick={() => openEditForm(post)}>
                            Modifier
                          </DropdownItem>
                          <DropdownItem onClick={() => deletePost(post._id)}>
                            Supprimer
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    )}
                  <p>Date de publication : {formatDate(post.createdAt)}</p>
                </Row>
              </CardBody>
            </Card>
            <hr className="mt-3" />
            {editingPost && editingPost._id === post._id && (
              <div className="p-lg-5">
                <PostForm
                  id={editingPost._id}
                  title={editingPost.title}
                  message={editingPost.message}
                  images={editingPost.images}
                  onSubmit={handlePostFormSubmit}
                  onCancel={closeEditForm}
                />
              </div>
            )}
          </Col>
        ))
      : null;
  };

  return (
    <div>
      {showPostForm ? (
        <PostForm
          id={editingPost?._id}
          title={editingPost?.title || ""}
          message={editingPost?.message || ""}
          images={editingPost?.images || []}
          onSubmit={handlePostFormSubmit}
          onCancel={handlePostFormCancel}
        />
      ) : (
        user &&
        (user.role === "admin" || user.role === "secretary") && (
          <Button color="info" className="btn" onClick={handleAddPost}>
            Ajouter Actualité
          </Button>
        )
      )}
      <Row>{renderPosts()}</Row>
    </div>
  );
}

export default Thread;
