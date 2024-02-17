

import { Tab } from '@headlessui/react'
import ComplainForm from '../../components/complainform/page';
import OrganizationComplainForm from '../../components/organizationcomplainform/page';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TabSection() {
    return (
        <div className="w-full py-4" data-aos="fade-up" data-aos-duration="1000">
            <Tab.Group>
                <Tab.List className="container flex gap-x-2 gap-y-2 md:gap-y-0.5 md:gap-x-4 justify-center items-center flex-wrap mx-auto w-screen py-2">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'rounded-md tracking-wider px-2.5 py-2.5 text-sm font-semibold leading-5 font-[Poppins]',
                                ' focus:outline-none',
                                selected
                                    ? 'bg-white shadow-lg text-orange-600 border-2 border-orange-400'
                                    : 'text-gray-500 hover:bg-orange-400 hover:text-white transition-all duration-300 ease'
                            )
                        }
                    >
                        Register as an Individual
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                'rounded-md tracking-wider px-2.5 py-2.5 text-sm font-semibold leading-5 font-[Poppins]',
                                ' focus:outline-none',
                                selected
                                    ? 'bg-white shadow-lg text-orange-600 border-2 border-orange-400'
                                    : 'text-gray-500 hover:bg-orange-400 hover:text-white transition-all duration-300 ease'
                            )
                        }
                    >
                        Register as an Organization
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <ComplainForm />
                    </Tab.Panel>
                    <Tab.Panel>
                        <OrganizationComplainForm />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
