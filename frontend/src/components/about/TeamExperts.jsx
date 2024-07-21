import React, { useState } from 'react';
import Image from 'next/image'

const experts = [
    {
        name: 'NIRANJAN UPADHYAYA',
        bio: "U.N. Niranjan is a seasoned professional with 24 years of varied experience in the automotive, general insurance, testing, inspection, and certification industries. He has over 4 years of experience in the TIC (Testing, Inspection, and Certification) industry. Niranjan has successfully led large teams comprising more than a hundred members. Currently, he serves as the Principal Surveyor (Director) at M/S Spartans Insurance Surveyors and Loss Assessors.",
        image: '/images/team/niranjan1.jpg'
    },
    {
        name: 'PRAVEEN KUMAR CHHAJED',
        bio: "Former SR.VP & Head-Non Motor Claims, Bajaj Allianz Group, possessing over 25 years of comprehensive experience and verifiable accomplishments in claims management in the insurance sector; career underscored with a series of progressive roles in the insurance sector across the Middle East and India.",
        image: '/images/team/praveen.jpeg'
    },
    {
        name: 'NUPUR NADDA',
        bio: "General Manager at National Insurance Company Ltd and a seasoned insurance relationship manager with 25 years of expertise.",
        image: '/images/team/nupur.jpg'
    }
];

const TeamExperts = () => {
    const [readMore, setReadMore] = useState({});

    const toggleReadMore = (index) => {
        setReadMore((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className="mx-auto flex flex-col items-center">
            <div className="space-y-12">
                <div className="max-w-fit mx-auto">
                    <div className="space-y-5 sm:space-y-4 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight sm:text-4xl">Meet Our Team Of Experts</h2>
                        <p className="text-gray-500 -translate-y-4">Meet the experts behind our success</p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {experts.map((expert, index) => (
                        <div key={index} className="border rounded-md w-[400px] mb-4 mx-2">
                            <div className="relative w-full h-[400px]">
                                <Image
                                    src={expert.image}
                                    alt={expert.name}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-t-md"
                                />
                            </div>
                            <div className="space-y-2 px-5 pt-5 pb-2">
                                <div className="text-lg leading-6 font-medium">
                                    <h3>{expert.name}</h3>
                                </div>
                                <p className="text-gray-500 text-justify">
                                    {readMore[index] || expert.bio.length <= 150 ? expert.bio : `${expert.bio.substring(0, 150)}...`}
                                    {expert.bio.length > 150 && (
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 ml-1"
                                            onClick={() => toggleReadMore(index)}
                                        >
                                            {readMore[index] ? 'Show Less' : 'Read More'}
                                        </button>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>);
};

export default TeamExperts;

