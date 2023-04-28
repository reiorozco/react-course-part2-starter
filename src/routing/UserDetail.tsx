import React from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const { id: idUser } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();

  return <p>User {idUser}</p>;
};

export default UserDetail;
