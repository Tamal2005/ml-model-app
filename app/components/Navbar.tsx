import React from 'react'
import { Link, Outlet } from 'react-router';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, Squares2X2Icon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid'
import { useRef } from 'react';
import { HomeIcon, CpuChipIcon, InformationCircleIcon, EnvelopeIcon, NewspaperIcon, LinkIcon, MicrophoneIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { useSidebar } from './SidebarContext';

export default function Navbar() {
    const sideMenuRef = useRef(null);
    const { isSidebarOpen, toggleSidebar } = useSidebar();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <button onClick={toggleSidebar} type="button" aria-label="Show navigation" className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 start-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <ChevronDoubleRightIcon className="w-5 h-5" />
            </button>

            <div ref={sideMenuRef} className={`fixed top-0 left-0 z-50 w-74 h-screen p-4 overflow-y-auto transition-transform bg-gray-200 dark:bg-gray-800 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-labelledby="drawer-navigation-label">
                <button onClick={toggleSidebar} type="button" aria-label="Close menu" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <ChevronDoubleLeftIcon className="w-5 h-5" />
                </button>
                <div className="py-4 px-4 rounded-lg overflow-y-auto bg-white mt-20">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 group">
                                <HomeIcon className='w-6' />
                                <span className="ms-3">Home</span>
                            </Link>
                        </li>
                        <li>
                            <button onClick={toggleDropdown} className="flex w-full items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 group">
                                <CpuChipIcon className='w-6' />
                                <span className="ms-3">ML Models</span>
                                {isDropdownOpen ? (
                                    <ChevronUpIcon className='w-4 ms-auto' />
                                ) : (
                                    <ChevronDownIcon className='w-4 ms-auto' />
                                )}
                            </button>
                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <ul className="mt-2 space-y-2 ps-3 border-l border-gray-300">
                                    <li>
                                        <Link to="/spam-mail" className="flex items-center p-2 text-sm text-gray-900 rounded-lg dark:text-white hover:bg-red-400 hover:text-white dark:hover:bg-gray-600">
                                            <EnvelopeIcon className='w-4 h-4 me-2' /> Spam Mail Detection
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/phishing-url" className="flex items-center p-2 text-sm text-gray-900 rounded-lg dark:text-white hover:bg-red-400 hover:text-white dark:hover:bg-gray-600">
                                            <LinkIcon className='w-4 h-4 me-2' /> Phishing URL Detection
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/face-mask" className="flex items-center p-2 text-sm text-gray-900 rounded-lg dark:text-white hover:bg-red-400 hover:text-white dark:hover:bg-gray-600">
                                            <IdentificationIcon className='w-4 h-4 me-2' /> Face Mask Detection
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/deepfake-voice" className="flex items-center p-2 text-sm text-gray-900 rounded-lg dark:text-white hover:bg-red-400 hover:text-white dark:hover:bg-gray-600">
                                            <MicrophoneIcon className='w-4 h-4 me-2' /> Deepfake Voice Detection
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/overview" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 group">
                                <Squares2X2Icon className='w-6' />
                                <span>Overview</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-red-500 hover:text-white dark:hover:bg-gray-700 group">
                                <InformationCircleIcon className='w-6' />
                                <span>About</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}