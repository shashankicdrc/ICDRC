
import React, { useState } from 'react';
import Image from 'next/image'

const TeamExperts = () => {
    const [readMore, setReadMore] = useState({});
    const experts = [
        {
            name: 'NIRANJAN UPADHYAYA',
            bio: "Niranjan is a IRDAI licenced surveyor based at Bengaluru, Karnataka and is currently Partner at Spartan Surveyors & Loss Assessors for the last 4 years. He started his career at an automobile repair & service centre and then moved on to General Insurance company assessing motor claims growing from a Claims Executive to the Zonal Claims Manager at leading general insurance companies spanning overall 16 years.During his last stint, he also managed the role of Zonal Underwriting Manager for an Insurance Company. Niranjan is an Automobile Engineer by education from Karnataka University and a qualified Chartered Engineer.He is also an Associate member of Indian Institute of Insurance Surveyors and Loss Assessors & a Fellow of Insurance Institute of India.",
            image: '/images/team/niranjan.jpeg'
        }, {
            name: 'NIRANJAN UPADHYAYA',
            bio: "Niranjan is a IRDAI licenced surveyor based at Bengaluru, Karnataka and is currently Partner at Spartan Surveyors & Loss Assessors for the last 4 years. He started his career at an automobile repair & service centre and then moved on to General Insurance company assessing motor claims growing from a Claims Executive to the Zonal Claims Manager at leading general insurance companies spanning overall 16 years.During his last stint, he also managed the role of Zonal Underwriting Manager for an Insurance Company. Niranjan is an Automobile Engineer by education from Karnataka University and a qualified Chartered Engineer.He is also an Associate member of Indian Institute of Insurance Surveyors and Loss Assessors & a Fellow of Insurance Institute of India.",
            image: '/images/team/niranjan.jpeg'
        },
        {
            name: 'NIRANJAN UPADHYAYA',
            bio: "Niranjan is a IRDAI licenced surveyor based at Bengaluru, Karnataka and is currently Partner at Spartan Surveyors & Loss Assessors for the last 4 years. He started his career at an automobile repair & service centre and then moved on to General Insurance company assessing motor claims growing from a Claims Executive to the Zonal Claims Manager at leading general insurance companies spanning overall 16 years.During his last stint, he also managed the role of Zonal Underwriting Manager for an Insurance Company. Niranjan is an Automobile Engineer by education from Karnataka University and a qualified Chartered Engineer.He is also an Associate member of Indian Institute of Insurance Surveyors and Loss Assessors & a Fellow of Insurance Institute of India.",
            image: '/images/team/niranjan.jpeg'
        },
    ];

    const toggleReadMore = (index) => {
        setReadMore((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    return (
        <div className="max-w-7xl mx-5 md:mx-10">
            <div className="space-y-12">
                <div className="mx-auto max-w-fit">
                    <div className="space-y-5 sm:space-y-4 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight sm:text-4xl">Meet Our Team Of Experts</h2>
                        <p className="text-gray-500 -translate-y-4">Meet the experts behind our success</p>
                    </div>
                </div>

                <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                    {experts.map((expert, index) => (
                        <li key={index} className="bg-white border border-gray-200 rounded-lg shadow">
                            <Image
                                src={expert.image}
                                alt={expert.name}
                                width={400}
                                height={400}
                                className="rounded-t-lg"
                            />
                            <div className="space-y-2 px-5 pt-5 pb-2">
                                <div className="text-lg leading-6 font-medium space-y-1">
                                    <h3>{expert.name}</h3>
                                </div>
                                <p className="text-gray-500 text-justify">
                                    {readMore[index] ? expert.bio : `${expert.bio.substring(0, 200)}...`}
                                    <button
                                        className="text-indigo-600 hover:text-indigo-900"
                                        onClick={() => toggleReadMore(index)}
                                    >
                                        {readMore[index] ? ' Show Less' : ' Read More'}
                                    </button>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>);
};

export default TeamExperts;

