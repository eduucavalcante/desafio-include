import { useState } from "react";
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    Drawer,
    DrawerItems,
} from "flowbite-react";
import {
    HiMenu,
    HiX,
    HiChartPie,
    HiUserGroup,
    HiCollection,
    HiUsers,
    HiDocumentText,
    HiLockClosed,
    HiClock,
    HiCog,
    HiLogout,
} from "react-icons/hi";

import { useNavigate } from "react-router-dom"
import type { IconType } from "react-icons";

import "./Style.css"

interface MenuItem {
  label: string;
  icon: IconType;
  onClick: () => void;
}

function AdminNavbar() {

    const navigation = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const menuItems: MenuItem[] = [
        { label: "Dashboard", icon: HiChartPie, onClick: () => navigation("/HomeAdmin")},
        { label: "Contatos Institucionais", icon: HiDocumentText, onClick: () => navigation("/ContatosAdmin")},
        { label: "Portfolio", icon: HiCollection, onClick: () => navigation("/PortifolioAdmin") },
        { label: "Nosso Time", icon: HiUsers, onClick: () => navigation("/NossoTimeAdmin")},
        { label: "Conteúdo Institucional", icon: HiDocumentText, onClick: () => navigation("/ConteudoInstitucional")},
    ];

    return (
        <>
            <Navbar fluid rounded={false} className="h-25  border-none shadow-md colorNavbar">
                <div className="flex w-full items-center justify-between px-4">

                    <button
                        type="button"
                        className="p-3 rounded-lg bg-gray-200 flex items-center"
                        onClick={() => setIsDrawerOpen(true)}
                    >
                        <HiMenu className="h-7 w-7 text-gray-800" />
                    </button>

                    <div className="flex items-center">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            className="dropdow"
                            label={
                                <Avatar
                                    alt="User settings"
                                    img=""
                                    rounded
                                    size="lg"
                                    className="cursor-pointer"
                                />
                            }
                        >
                            <DropdownHeader>
                                <span className="block text-sm font-semibold text-gray-900">Administrador</span>
                                <span className="block truncate text-sm text-gray-600">admin@valejr.com</span>
                            </DropdownHeader>
                            <DropdownItem icon={HiCog} className="text-gray-700 hover:bg-gray-100">Configurações</DropdownItem>
                            <DropdownItem icon={HiUserGroup} className="text-gray-700 hover:bg-gray-100">Meu Perfil</DropdownItem>
                            <DropdownDivider />
                            <DropdownItem icon={HiLogout} onClick={()=> navigation("/")}className="text-red-600 hover:bg-red-50">Sair</DropdownItem>
                        </Dropdown>
                    </div>
                </div>
            </Navbar>

            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                position="left"
                className="w-80 drawerColor"
            >
                <div className="flex items-center justify-between p-4 text-white ">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-white rounded-lg flex items-center justify-center">
                            <span className=" font-bold text-xl colorTexv3">V</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-xl">Vale Jr</h1>
                            <p className="text-sm text-gray-200">Admin Painel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="p-2 rounded-lg hover:bg-[#2a4bac] text-white"
                    >
                        <HiX className="h-6 w-6" />
                    </button>
                </div>

                <DrawerItems>
                    <div className="px-3 py-4 bg-[#1C388D] h-full">
                        <h3 className="text-xs font-semibold text-gray-200 uppercase tracking-wider mb-3">
                            Dashboard
                        </h3>
                        <div className="space-y-1">
                            {menuItems.map((item) => (
                                <a
                                    key={item.label}
                                    className="flex items-center gap-3 px-3 py-3 text-white hover:bg-[#2a4bac] rounded-lg transition-colors duration-200 itemDrawer"
                                    onClick={() => {
                                        item.onClick();
                                        setIsDrawerOpen(false);
                                    }}
                                >
                                    <item.icon className="h-5 w-5 text-white" />
                                    <span>{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </DrawerItems>
            </Drawer>
        </>
    );
}

export default AdminNavbar;