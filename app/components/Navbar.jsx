"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navLinks = [
	{
		title: "Home",
		path: "/",
	},
	{
		title: "About",
		path: "#about",
	},
	{
		title: "Projects",
		path: "#projects",
	},
	{
		title: "Contact",
		path: "#contact",
	},
	{
		title: "Jogo da Senha",
		path: "/senha",
	},
];

const Navbar = () => {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const [catUrl, setCatUrl] = useState(null);

	useEffect(() => {
		fetch("https://api.thecatapi.com/v1/images/search")
			.then((res) => res.json())
			.then((data) => {
				if (data && data[0] && data[0].url) {
					setCatUrl(data[0].url);
				}
			});
	}, []);

	return (
		<nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-10 bg-[#121212] bg-opacity-100">
			<div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
				<Link
					href={"/"}
					className="flex items-center gap-2 text-2xl md:text-5xl text-white font-semibold"
				>
					{catUrl ? (
						<img
							src={catUrl}
							alt="Cat logo"
							className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-700 bg-[#222]"
						/>
					) : (
						<span className="text-slate-400">LOGO</span>
					)}
				</Link>
				<div className="mobile-menu block md:hidden">
					{!navbarOpen ? (
						<button
							onClick={() => setNavbarOpen(true)}
							className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
						>
							<Bars3Icon className="h-5 w-5" />
						</button>
					) : (
						<button
							onClick={() => setNavbarOpen(false)}
							className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white"
						>
							<XMarkIcon className="h-5 w-5" />
						</button>
					)}
				</div>
				<div className="menu hidden md:block md:w-auto" id="navbar">
					<ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
						{navLinks.map((link, index) => (
							<li key={index}>
								<NavLink href={link.path} title={link.title} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;