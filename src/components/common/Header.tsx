"use client";
import React, { useEffect, useRef, useState } from "react";
import Drawer from "@/components/common/Drawer";
import { useCart } from "@/contexts/CartContext";
import "@/styles/common/header.scss";
import Image from "next/image";
import Logo from "../../../public/icons/logo.svg";
import Link from "next/link";

const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement | null>,
  hamburgerRef: React.RefObject<HTMLDivElement | null>,
  dropRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */ const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        !hamburgerRef.current?.contains(event.target as Node) &&
        !dropRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const Header = () => {
  const { currentCart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to navigate and close menu
  const handleNavigation = () => {
    setMenuOpen(false);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(wrapperRef, hamburgerRef, dropRef, () =>
    setMenuOpen(false)
  );
  return (
    <div className="header-wrapper color-background-1 gradient">
      <header className="header header--middle-center header--mobile-center page-width drawer-menu header--has-menu header--has-localizations">
        <div>
          <div className="d-flex flex-column justify-content-center h-full">
            <div
              ref={hamburgerRef}
              className={menuOpen ? "open" : ""}
              id="hamburger"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(!menuOpen);
              }}
            >
              <div className="bars">
                <div className="bar" id="bar1"></div>
                <div className="bar" id="bar2"></div>
                <div className="bar" id="bar3"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center">
            <Link
              href="/"
              className="header__heading-link link link--text focus-inset"
            >
              <Image
                width={200}
                className="object-contain h-auto max-w-full"
                src={Logo}
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-end align-items-center w-full h-full">
            {/* For Desktop Only */}
            {/*    <div className="d-none d-md-block flag-select">
                <ReactFlagsSelect
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  searchable
                  fullWidth={true}
                  className="border-0"
                />
              </div> */}
            <div
              className="d-inline-block cursor-pointer position-relative"
              onClick={() => {
                setIsDrawerOpen(true);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 249.03 326.31"
                width={60}
                height={60}
              >
                <defs>
                  <style>
                    {`
          .cls-1, .cls-2 {
            fill: none;
            stroke-width: 15px;
          }
          .cls-1 {
            stroke: #231f20;
            stroke-linejoin: round;
          }
          .cls-2 {
            stroke: #010101;
            stroke-miterlimit: 10;
          }
        `}
                  </style>
                </defs>
                <polygon
                  className="cls-1"
                  points="29.23 249.27 219.8 249.27 205.69 92.05 43.35 92.05 29.23 249.27"
                />
                <path
                  className="cls-2"
                  d="M80.9,89.37C80.9,59.32,100.43,35,124.51,35s43.62,24.36,43.62,54.41"
                />
              </svg>

              {/* Show badge only if cart quantity exists */}
              {currentCart?.cartItems?.[0]?.qty ? (
                <div className="circle-badge">{currentCart?.cartItems?.[0].qty}</div>
              ) : null}
            </div>
          </div>
        </div>
        {/* For Mobile */}
        {/*  <Col xs={12}>
            <div className="d-block d-md-none my-3">
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => setSelected(code)}
                searchable
                fullWidth={true}
              />
            </div>
          </Col> */}
      </header>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Animated Menu */}
      <nav ref={wrapperRef} className={`main-menu ${menuOpen ? "open" : ""}`}>
        <ul className="menu-items">
          <li className="cursor-pointer" onClick={handleNavigation}>
            <Link href="/">Home</Link>
            <div className="link-underline" />
          </li>
          <li className="cursor-pointer" onClick={handleNavigation}>
            <Link href="/faq">FAQ</Link>
            <div className="link-underline" />
          </li>
          <li className="cursor-pointer" onClick={handleNavigation}>
            <Link href="/about">About</Link>
            <div className="link-underline" />
          </li>
          <li className="cursor-pointer" onClick={handleNavigation}>
            <Link href="/contact">Contact</Link>
            <div className="link-underline" />
          </li>
        </ul>
      </nav>
      <div
        ref={dropRef}
        id="drop-in-menu"
        className={`${menuOpen ? "open" : ""}`}
      ></div>
      {/* Background Overlay */}
      <div
        id="background-overlay"
        className={`${menuOpen || isDrawerOpen ? "background-overlay" : ""}`}
      ></div>
    </div>
  );
};

export default Header;
