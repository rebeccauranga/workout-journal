import React from "react";
import { useParams } from "react-router-dom";

const SessionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return <div>{id}</div>;
};

export default SessionDetail;
