import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderMobileDropdown from "../header-mobile-dropdown/header-mobile-dropdown";

export function Navbar() {

    return (
        <>
            <nav className="top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
                    <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
                        <HeaderMobileDropdown />
                    </ul>
                </div>
            </nav>
        </>
    )

}