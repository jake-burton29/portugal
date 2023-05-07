import React from "react";
import Layout from "../components/layout";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import type { NextPage } from "next";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["review"]["getAll"][number];
const ReviewView = (props: PostWithUser) => {
  const { review, author } = props;
  return (
    <div key={review.id} className="flex gap-3 border-b p-4">
      <Image
        src={author.profileImageUrl}
        className="h-12 w-12 rounded-full"
        alt="Profile Image"
        width={48}
        height={48}
        placeholder="blur"
      />
      <div className="flex flex-col">
        <div className="flex">
          <span>
            {author.username
              ? author.username
              : `${author.firstName} ${author.lastName}`}
          </span>
          <span className="font-thin">
            {" "}
            &nbsp; · {` ${dayjs(review.createdAt).fromNow()}`}
          </span>
        </div>
        <h6>{review.title}</h6>
        {review.content}
      </div>
    </div>
  );
};

const reviews: NextPage = () => {
  const { data, isLoading } = api.review.getAll.useQuery();
  if (!data || isLoading) return <div>Loading...</div>;
  return (
    <Layout>
      <div>reviews</div>
      <div>
        {data?.map((fullReview) => (
          <ReviewView {...fullReview} key={fullReview.review.id} />
        ))}
      </div>
    </Layout>
  );
};

export default reviews;
