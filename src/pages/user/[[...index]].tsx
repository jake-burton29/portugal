import { UserProfile } from "@clerk/nextjs";
import type { NextPage } from "next";
import Layout from "~/components/layout";
const UserProfilePage: NextPage = () => (
  <Layout>
    <UserProfile path="/user" routing="path" />
  </Layout>
);

export default UserProfilePage;
