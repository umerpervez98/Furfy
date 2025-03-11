"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Container, Row, Col } from "react-bootstrap";
import Drawer from "@/components/common/Drawer";
import { useCart } from "@/contexts/CartContext";
import "@/styles/common/header.css";
import Image from "next/image";
import Logo from "../../../public/icons/logo.svg";
import Link from "next/link";


const useOutsideAlerter = (
  ref: React.RefObject<HTMLDivElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */ const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
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
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter(); // Initialize router

  // Function to navigate and close menu
  const handleNavigation = (path: string) => {
    router.push(path);
    setMenuOpen(false);
  };

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(wrapperRef, () => setMenuOpen(false));

  return (
    <>
      <Container className="py-5">
        <Row>
          <Col xs={4} sm={5}>
            <div className="d-flex flex-column justify-content-center h-full">
              {!menuOpen && (
                <div id="hamburger1" onClick={() => setMenuOpen(!menuOpen)}>
                  <div className="bars">
                    <div className="bar" id="bar1"></div>
                    <div className="bar" id="bar2"></div>
                    <div className="bar" id="bar3"></div>
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col xs={4} sm={2}>
            <div className="text-center">
              <Link href="/">
                <Image
                  width={200}
                  className="w-full h-full object-contain"
                  src={Logo}
                  alt="Logo"
                />
              </Link>
            </div>
          </Col>
          <Col xs={4} sm={5}>
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
                onClick={
                  cartItems?.[0]?.qty
                    ? (e) => {
                      e.preventDefault();
                      setIsDrawerOpen(true);
                    }
                    : undefined
                }
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
                {cartItems?.[0]?.qty ? (
                  <div className="circle-badge">{cartItems?.[0].qty}</div>
                ) : null}
              </div>
            </div>
          </Col>
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
        </Row>
      </Container>

      {/* Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      {menuOpen && (
        <div
          id="hamburger2"
          className={menuOpen ? "open drawer-hamburger" : ""}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="bars">
            <div className="bar" id="bar1"></div>
            <div className="bar" id="bar2"></div>
            <div className="bar" id="bar3"></div>
          </div>
        </div>
      )}
      {/* Animated Menu */}
      <nav ref={wrapperRef} className={`main-menu ${menuOpen ? "open" : ""}`}>
        <ul className="menu-items">
          <li className="cursor-pointer" onClick={() => handleNavigation("/")}>
            HOME
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleNavigation("/faq")}
          >
            FAQ
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleNavigation("/about")}
          >
            ABOUT
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleNavigation("/contact")}
          >
            CONTACT
          </li>
        </ul>
      </nav>
      <div id="drop-in-menu" className={`${menuOpen ? "open" : ""}`}></div>
      {/* Background Overlay */}
      <div
        id="background-overlay"
        className={`${menuOpen ? "background-overlay" : ""}`}
      ></div>
    </>
  );
};

export default Header;
