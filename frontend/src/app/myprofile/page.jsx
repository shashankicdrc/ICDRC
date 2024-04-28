import React, { Fragment } from "react";
import Link from "next/link";
import Footer from "../../components/footer/page";
import SocialIcons from "../../components/SocialIcons/page";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/ErrorFallback";
import dynamic from "next/dynamic";
import ProfileSkeleton from "../../components/Skeleton/ProfileSkeleton";

const Profile = dynamic(() => import("./profile"), {
  ssr: false,
  loading: () => <ProfileSkeleton />,
});
const UploadDoc = dynamic(() => import("../../components/uploaddoc/page"), {
  ssr: false,
});

const myprofile = async () => {
  return (
    <Fragment>
      <main className="mx-5 md:mx-10 lg:mx-15 mt-32 mb-5 z-10">
        <div className="my-5">
          <div className="mb-5">
            <h1 className="text-5xl font-extrabold">
              Welcome Back, Hayat ilyas
            </h1>
            <p className="text-gray-500 py-2">
              See your profile status and complaints{" "}
            </p>
          </div>

          <Link
            href={"/register"}
            className="rounded-full py-2  font-medium px-5 bg-orange-500 text-white
                        hover:bg-orange-600"
          >
            Register complaints
          </Link>
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Profile />
        </ErrorBoundary>

        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UploadDoc />
        </ErrorBoundary>
      </main>
      <Footer />
      <SocialIcons />
    </Fragment>
  );
};

export default myprofile;
