"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdTranslate } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

export default function ClientSidebar() {
  const pathname = usePathname();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}\b/, "");

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
    {
      href: "/translation-history",
      label: "Translation History",
      icon: MdTranslate,
    },
    { href: "/settings", label: "Settings", icon: IoSettingsOutline },
    { href: "/account", label: "Account Settings", icon: FaUser },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setSideBarOpen(!sideBarOpen)}
        className="fixed top-4 right-4 z-50 md:hidden text-black p-2"
      >
        ☰
      </button>

      {/* Overlay */}
      {sideBarOpen && (
        <div
          onClick={() => setSideBarOpen(false)}
          className="md:hidden fixed inset-0 bg-black opacity-40 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-screen max-h-screen overflow-y-auto sticky top-0 w-[200px] md:w-[250px] bg-white border-r 
        text-gray-700 shadow-sm z-50 transform transition-transform duration-300 ease-in-out 
        ${sideBarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col justify-between`}
      >
        <div className="flex flex-col gap-6 pt-6 pb-10 px-4">
          <Link
            href="/dashboard"
            className="text-2xl font-bold text-primary tracking-tight"
          >
            Language<span className="text-gray-900">AI</span>
          </Link>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-3">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive =
                pathWithoutLocale === href ||
                pathWithoutLocale.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSideBarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-200 
                  ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon size={20} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-gray-200 mt-6 px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm md:text-base rounded-xl font-medium text-gray-700"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
