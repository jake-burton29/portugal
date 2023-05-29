import React from "react";
import Layout from "../components/layout";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import type { NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Rating } from "~/components/Rating";

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

const CreateReview = () => {
  const { user } = useUser();

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.review.create.useMutation({
    onSuccess: () => {
      setTitleInput("");
      setContentInput("");
      void ctx.review.getAll.invalidate();
    },
  });

  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  if (!user) return null;
  return (
    <form>
      <input
        type="text"
        placeholder="Title"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        disabled={isPosting}
      />
      <input
        type="text"
        placeholder="Content"
        value={contentInput}
        onChange={(e) => setContentInput(e.target.value)}
        disabled={isPosting}
      />
      <button
        onClick={() => mutate({ title: titleInput, content: contentInput })}
        disabled={isPosting}
      >
        Submit
      </button>
    </form>
  );
};

const Reviews: NextPage = () => {
  const { data, isLoading: reviewsLoading } = api.review.getAll.useQuery();
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  if (reviewsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  if (!userLoaded) return <div />;

  return (
    <Layout>
      <div>reviews</div>
      <div className="flex border-b border-slate-400 p-4">
        {!isSignedIn && (
          <div className="flex justify-center">
            <SignInButton />
          </div>
        )}
        {isSignedIn && <CreateReview />}
      </div>
      <div>
        {data?.map((fullReview) => (
          <ReviewView {...fullReview} key={fullReview.review.id} />
        ))}
      </div>
    </Layout>
  );
};

export default Reviews;
