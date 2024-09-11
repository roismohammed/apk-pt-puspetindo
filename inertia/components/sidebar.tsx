import { Link, usePage } from '@inertiajs/react';
import React, { Fragment, useState } from 'react';
import './sidebar.css';
import {
    IconDashboard,
    IconUsers,
    IconArrowBadgeLeft,
    IconBriefcase,
    IconBook2,
    IconSettings,
    IconUserSquare,
    IconUser,
    IconBook,
} from '@tabler/icons-react';
import MyImageComponent from '../img/logo-puspetindo.png';
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Sidebar({ isSidebarHidden, toggleSidebar }) {

    const { url } = usePage();
    const isActive = (path) => url === path;

    return (
        <Fragment>
            <div className={`hidden border-r bg-white md:block transition-all duration-300 ${isSidebarHidden ? 'w-16 ' : 'w-230 translate-x-1 ease-in-out duration-600'}`}>
                <div className="flex h-full shadow-right max-h-screen flex-col gap-2 transition-all duration-300 ">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 fixed">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <img src={MyImageComponent} alt="Logo" width={isSidebarHidden ? 0 : 150} />
                        </Link>

                        <Button
                            variant="outline"
                            size="icon" className={`ml-4 h-8 w-8 transition-all duration-300 ${isSidebarHidden ? 'ml-[-8px]' : 'mx-[6px]'}`}
                            onClick={toggleSidebar}>
                            <IconArrowBadgeLeft className={`h-4 w-4 transition-transform ${isSidebarHidden ? 'rotate-180' : ''}`} />
                            <div className="sr-only">Toggle sidebar</div>
                        </Button>


                    </div>
                    <div className={`${isSidebarHidden ? 'mt-16' : 'flex-1 mt-[70px]'}`}>
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            {/* Dashboard Section */}
                            <span className="flex text-xm flex-col   items-start gap-1 rounded-lg  py-3 text-muted-foreground transition-all">
                                <span className={`${isSidebarHidden ? 'hidden' : 'judul-sidebar'}`}>Dashboard</span>
                                <Link
                                    href='/'
                                    className={`flex pl-2 text-black rounded-sm mt-1 p-1 gap-2 text-md transition-all duration-200 ${isActive('/') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconDashboard size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded full">
                                            Beranda
                                        </span>
                                    ) : (
                                        <span>Beranda</span>
                                    )}
                                </Link>

                                <Link
                                    href='/karyawan'
                                    className={`flex pl-2 text-black rounded-sm p-1 gap-2 text-md transition-all duration-200 ${isActive('/karyawan') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconUsers size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Karyawan
                                        </span>
                                    ) : (
                                        <span>Karyawan</span>
                                    )}
                                </Link>

                                <Link
                                    href='/proyek'
                                    className={`flex pl-2 text-black rounded-sm p-1 gap-2 text-md transition-all duration-200 ${isActive('/proyek') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconBriefcase size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Proyek
                                        </span>
                                    ) : (
                                        <span>Proyek</span>
                                    )}
                                </Link>
                            </span>

                            <span className="flex text-xm flex-col items-start gap-1 rounded-lg text-muted-foreground transition-all">
                                <span className={`${isSidebarHidden ? 'hidden' : 'judul-sidebar'}`}>Users</span>
                                <Link
                                    href='/menuProfil'
                                    className={`flex pl-2 text-black rounded-sm mt-1 p-1 gap-2 text-md transition-all duration-200 ${isActive('/manhours/menuProfil') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconUser size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Profil
                                        </span>
                                    ) : (
                                        <span>Menu Profil</span>
                                    )}
                                </Link>

                                <Link
                                    href='/manhours'
                                    className={`flex pl-2 text-black rounded-sm p-1 gap-2 text-md transition-all duration-200 ${isActive('/manhours') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconBriefcase size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden  group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Man Hours
                                        </span>
                                    ) : (
                                        <span>Man Hours</span>
                                    )}
                                </Link>



                                <Link
                                    href='/ppwi'
                                    className={`flex pl-2 text-black rounded-sm p-1 gap-2 text-md transition-all duration-200 ${isActive('/ppwi') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconBook size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden  group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            PPWI
                                        </span>
                                    ) : (
                                        <span>PPWI</span>
                                    )}
                                </Link>

                            </span>

                            <span className="flex text-xm flex-col items-start gap-1 mt-3 rounded-lg text-muted-foreground transition-all">
                                <span className={`${isSidebarHidden ? 'hidden' : 'judul-sidebar'}`}>Management</span>
                                <Link
                                    href='/management/laporan'
                                    className={`flex pl-2 text-black rounded-sm p-1 gap-2 text-md transition-all duration-200 ${isActive('/management/laporan') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconBook2 size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden  group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Laporan
                                        </span>
                                    ) : (
                                        <span>Laporan</span>
                                    )}
                                </Link>
                            </span>

                            <span className="flex text-xm flex-col items-start gap-1 mt-3 rounded-lg  text-muted-foreground transition-all">
                                <span className={`${isSidebarHidden ? 'hidden' : 'judul-sidebar'}`}>Sistem</span>
                                <Link
                                    href='/pengguna'
                                    className={`flex pl-2 text-black rounded-sm mt-1 p-1 gap-2 text-md transition-all duration-200 ${isActive('/pengguna') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconUserSquare size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Pengguna
                                        </span>
                                    ) : (
                                        <span>Pengguna</span>
                                    )}
                                </Link>

                                <Link
                                    href='#'
                                    className={`flex pl-2 text-black rounded-sm p-1 gap-2 text-md transition-all duration-200 ${isActive('#') ? 'bg-blue-600 text-white' : 'hover:text-white hover:bg-blue-600'} ${isSidebarHidden ? 'w-18 justify-center p-2 relative group' : 'w-[190px]'}`}
                                >
                                    <IconSettings size={21} />
                                    {isSidebarHidden ? (
                                        <span className="hidden  group-hover:block absolute left-12 bg-gray-700 text-white px-2 py-1 rounded">
                                            Settings
                                        </span>
                                    ) : (
                                        <span>Settings</span>
                                    )}
                                </Link>
                            </span>
                        </nav>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}