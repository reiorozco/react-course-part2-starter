import React from "react";
import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { id: idUser } = useParams();

  return <p>User {idUser}</p>;
};

export default UserDetailPage;
