import React from "react";
import Layout from "../components/layout";
import { api } from "~/utils/api";
const reviews = () => {
  const { data } = api.review.getAll.useQuery();
  return (
    <Layout>
      <div>reviews</div>
      <div>
        {data?.map((review) => (
          <div key={review.id}>{review.content}</div>
        ))}
      </div>
    </Layout>
  );
};

export default reviews;
