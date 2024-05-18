import Link from "next/link";
import Image from "next/image";

const Home2 = () => {
  return (
    <>
      <div className="my-8 md:py-12">
        <h1
          className="text-gray-900 text-3xl md:text-6xl font-[Roboto] font-bold text-center bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          AREAS WE COVER
        </h1>
        <p
          className="text-gray-700 text-center font-medium text-md py-2  tracking-widest mx-auto px-8"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          At ICDRC, we're committed to safeguarding what matters most to you,
          providing reliable insurance solutions for a worry-free future.
        </p>

        <div className="grid gap-10 my-10 md:my-16  mx-auto px-4  grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784295/Home_page/Home2/1_qmm9t2.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Life Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="100"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784295/Home_page/Home2/2_u67069.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Health Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="300"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784295/Home_page/Home2/3_ylryzr.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Motor Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="500"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1716053720/travel_mstw1f.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Travel Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="700"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784295/Home_page/Home2/5_n9fvp9.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Crop Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="900"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1716053735/fire_x7i4ud.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Fire Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="1100"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784297/Home_page/Home2/7_qdf20m.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Marine Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="1300"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784296/Home_page/Home2/8_t092so.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Liability Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="1500"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784297/Home_page/Home2/9_thtox1.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Cyber Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="1700"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784297/Home_page/Home2/10_d7qssd.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Personal Accident Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="1900"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784297/Home_page/Home2/11_kj6i7t.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Property Insurance
            </p>
          </div>

          <div
            className="flex flex-col items-center"
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-delay="2100"
          >
            <Image
              className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
              src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1690784297/Home_page/Home2/12_tg3bm9.svg"
              alt="Person"
              width={80}
              height={80}
            />
            <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
              Event Insurance
            </p>
          </div>

        </div>
          <div className="flex items-center  justify-center">
            <div
              className="flex flex-col items-center"
              data-aos="zoom-in"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              <Image
                className="object-cover w-16 h-16 md:w-20 md:h-20 mb-2 rounded-sm drop-shadow-[2px_5px_10px_yellow]"
                src="https://res.cloudinary.com/dl5hosmxb/image/upload/v1716053749/professional_rbuzrx.svg"
                alt="Person"
                width={80}
                height={80}
              />
              <p className="text-gray-900 mt-2 text-center font-semibold text-sm md:text-md tracking-widest">
                Professional Indemnity Insurance
              </p>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home2;
