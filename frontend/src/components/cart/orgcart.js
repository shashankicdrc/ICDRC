// PricingCards.js file
import React from "react";

const OrgCards = () => {
  const cardData = [
    {
      image: "https://i.imgur.com/Ql4jRdB.png",
      title: "Organization Complain",
      price: "5000 ₹",
      features: ["Contact support", "Suggestion support", "Case study consultant"],
    }
,
//     {
//       image: "https://i.imgur.com/pJNFEHR.png",
//       title: "Double User",
//       price: "$149",
//       features: ["500 GB Storage", "1 Granted User", "Send up to 2 GB"],
//     },
//     {
//       image: "https://i.imgur.com/Hg0sUJP.png",
//       title: "Triple User",
//       price: "$149",
//       features: ["500 GB Storage", "1 Granted User", "Send up to 2 GB"],
//     },
  ];
  return (
    <div className="w-full py-10 px-4 ">
      <div className="max-w-96 mx-auto  ">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300`}
          >
            <img
              className="w-20 mx-auto mt-[-3rem] bg-white"
              src={card.image}
              alt="/"
            />
            <h2 className="text-2xl font-bold text-center py-8">
              {card.title}
            </h2>
            <p className="text-center text-4xl font-bold">{card.price}</p>
            <div className="text-center font-medium">
              {card.features.map((feature, index) => (
                <p
                  key={index}
                  className={`py-2 border-b mx-8 ${index === 0 ? "mt-8" : ""}`}
                >
                  {feature}
                </p>
              ))}
            </div>
            <button
              className={`bg-orange-600 text-white hover:text-white hover:bg-orange-400 duration-150 w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3`}
            >
              Register
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgCards;