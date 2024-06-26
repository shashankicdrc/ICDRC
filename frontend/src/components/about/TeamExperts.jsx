
import React, { useState } from 'react';
import Image from 'next/image'

const TeamExperts = () => {
    const [readMore, setReadMore] = useState({});
    const experts = [
        {
            name: 'NIRANJAN UPADHYAYA',
            role: 'Licenced Surveyor',
            bio: "Niranjan is a IRDAI licenced surveyor based at Bengaluru, Karnataka and is currently Partner at Spartan Surveyors & Loss Assessors for the last 4 years. He started his career at an automobile repair & service centre and then moved on to General Insurance company assessing motor claims growing from a Claims Executive to the Zonal Claims Manager at leading general insurance companies spanning overall 16 years.During his last stint, he also managed the role of Zonal Underwriting Manager for an Insurance Company. Niranjan is an Automobile Engineer by education from Karnataka University and a qualified Chartered Engineer.He is also an Associate member of Indian Institute of Insurance Surveyors and Loss Assessors & a Fellow of Insurance Institute of India.",
            image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
        },
        {
            name: 'Praveen Kumar Chhajed',
            role: 'Insurance Claims Consultant',
            bio: 'Jane is a talented designer with a keen eye for detail. She has worked on numerous high-profile projects and is adept at creating user-friendly interfaces...',
            image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
        },
        // Add more experts as needed
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
                <div className="space-y-5 sm:space-y-4 text-center bo">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight sm:text-4xl">Meet Our Team Experts</h2>
                    <p className="text-gray-500 -translate-y-4">Meet the experts behind our success</p>
                </div>
                <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
                    {experts.map((expert, index) => (
                        <li key={index} className="bg-white border border-gray-200 rounded-lg shadow">
                            <Image
                                src={expert.image}
                                alt={expert.name}
                                width={400}
                                height={100}
                                className="rounded-t-lg"
                            />
                            <div className="space-y-2 px-5 pt-5 pb-2">
                                <div className="text-lg leading-6 font-medium space-y-1">
                                    <h3>{expert.name}</h3>
                                    <p className="text-orange-600">{expert.role}</p>
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

