import React, { Fragment } from "react";
import Navbar from "../../../../components/navbar/page";

export default function layout({ children }) {
  return (
    <Fragment>
      <div className="min-h-screen">
        {" "}
        <Navbar />
        <div
          className="relative overflow-hidden rounded-sm bg-cover bg-no-repeat p-12 text-center"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dl5hosmxb/image/upload/v1690779742/Register_page/bg1_phs9it.webp)`,
            height: "250px",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed">
            <div className="flex h-full items-center justify-end flex-col">
              <h2
                className=" mb-4 md:mb-8 text-white text-3xl text-center md:text-5xl font-semibold"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                All Attachmennts
              </h2>
            </div>
          </div>
        </div>
        <main className="mx-5 my-5 md:mx-10 md:my-10">{children}</main>
      </div>
    </Fragment>
  );
}
