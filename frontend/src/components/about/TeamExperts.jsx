import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BASE_URL } from '../../lib/constant';

const TeamExperts = () => {
    const [readMore, setReadMore] = useState({});
    const [teamData, setteamData] = useState([]);

    const toggleReadMore = (index) => {
        setReadMore((prevState) => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };

    useEffect(() => {
        const getTeamOfExperts = async () => {
            const response = await fetch(
                `${BASE_URL}/api/teams?sortBy=desc(createdAt)`,
            );
            const { data } = await response.json();
            if (response.status === 200) {
                setteamData(data);
            }
        };
        getTeamOfExperts();
    }, []);

    return (
        <div className="mx-auto flex flex-col items-center">
            <div className="space-y-12">
                <div className="max-w-fit mx-auto">
                    <div className="space-y-5 sm:space-y-4 text-center">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight sm:text-4xl">
                            Meet Our Team Of Experts
                        </h2>
                        <p className="text-gray-500 -translate-y-4">
                            Meet the experts behind our success
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center">
                    {teamData.length > 0 ? (
                        teamData.map((expert, index) => (
                            <div
                                key={expert._id}
                                className="border rounded-md w-[400px] mb-4 mx-2"
                            >
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
                                        {readMore[index] ||
                                        expert.description.length <= 150
                                            ? expert.description
                                            : `${expert.description.substring(0, 150)}...`}
                                        {expert.description.length > 150 && (
                                            <button
                                                className="text-indigo-600 hover:text-indigo-900 ml-1"
                                                onClick={() =>
                                                    toggleReadMore(index)
                                                }
                                            >
                                                {readMore[index]
                                                    ? 'Show Less'
                                                    : 'Read More'}
                                            </button>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-3">
                            <h2 className="text-center font-semibold">
                                No Team of experts found
                            </h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamExperts;
