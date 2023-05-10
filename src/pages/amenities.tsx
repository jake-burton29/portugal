import React from "react";
import Layout from "../components/layout";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import type { NextPage } from "next";
import Image from "next/image";

type Amenity = RouterOutputs["amenity"]["getAll"][number];

const AmenitiesView = (props: Amenity) => {
  return (
    <div key={props.id} className="flex gap-3 border-b p-4">
      <Image
        src={props.imageUrl}
        className="h-12 w-12"
        alt="Profile Image"
        width={48}
        height={48}
      />
      <div className="flex flex-col">
        <div className="flex"></div>
        <h6>{props.title}</h6>
        {props.content}
      </div>
    </div>
  );
};

const amenities: NextPage = () => {
  const { data, isLoading } = api.amenity.getAll.useQuery();
  if (isLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;
  return (
    <Layout>
      <div>
        {data?.map((amenity) => (
          <AmenitiesView {...amenity} key={amenity.id} />
        ))}
      </div>
    </Layout>
  );
};

export default amenities;
