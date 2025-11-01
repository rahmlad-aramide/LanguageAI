"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdTranslate, MdFileCopy } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaSignOutAlt } from "react-icons/fa";

export default function ClientSidebar() {
  const pathname = usePathname();
  const t = useTranslations("Sidebar");
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}\b/, "");

  const navLinks = [
    { href: "/dashboard", label: t("Dashboard"), icon: LuLayoutDashboard },
    {
      href: "/translation-history",
      label: t("TranslationHistory"),
      icon: MdTranslate,
    },
    {
      href: "/translated-documents",
      label: t("TranslatedDocuments"),
      icon: MdFileCopy,
    },
    { href: "/settings", label: t("Settings"), icon: IoSettingsOutline },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <>
      {/* ✅ Mobile Toggle */}
      <button
        onClick={() => setSideBarOpen(!sideBarOpen)}
        className="fixed top-5 right-4 z-50 md:hidden text-gray-800"
      >
        ☰
      </button>

      {/* ✅ Overlay (mobile) */}
      {sideBarOpen && (
        <div
          onClick={() => setSideBarOpen(false)}
          className="md:hidden fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen overflow-y-auto w-[220px] md:w-[250px] bg-white border-r 
        text-gray-700 shadow-sm z-50 transform transition-transform duration-300 ease-in-out 
        ${sideBarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col justify-between`}
      >
        {/* Top Section */}
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

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-6 px-4 pb-6">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm md:text-base rounded-xl font-medium text-gray-700 hover:bg-primary/10 hover:text-primary"
          >
            <FaSignOutAlt size={18} />
            {t("Logout")}
          </button>
        </div>
      </aside>
    </>
  );
}
