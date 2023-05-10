import React from "react";
import Layout from "../components/layout";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import type { NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

type ReviewWithUser = RouterOutputs["review"]["getAll"][number];
const ReviewView = (props: ReviewWithUser) => {
  const { review, author } = props;
  return (
    <div key={review.id} className="flex gap-3 border-b p-4">
      <Image
        src={author.profileImageUrl}
        className="h-12 w-12 rounded-full"
        alt="Profile Image"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex">
          <span>
            {author.username ?? `${author.firstName} ${author.lastName}`}
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
  if (isLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;
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
