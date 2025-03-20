"use client";

import { useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { GreyOverlay, CartAside, Scatulator } from "../index.shared";
import { PhoneVerificationContainer } from "@/components/Checkout/index.checkout";
import NavButton from "./nav-button/nav-button";
import SideNav from "./side-nav/side-nav";
import styles from "./nav.module.scss";

const popOverItems: { title: string; url?: string }[] = [
  { title: "My Account", url: "/my-account" },
  { title: "Logout" },
];

type NavProps = {
  logoImg: StaticImageData;
  altText: string;
};

const Nav = ({ logoImg, altText }: NavProps) => {
  const [showNav, setShowNav] = useState(false);
  const {
    showScatulator,
    currentCart,
    userId,
    user,
    globalError,
    setShowScatulator,
    setCurrentTab,
    logoutUser,
    setGlobalError,
    showCart,
    setShowCart,
    showPopOver,
    setShowPopOver,
  } = useApp();

  const path = usePathname();

  return (
    <>
      <h3 className={styles["promo-ad-heading"]}>
        free shipping <span>over $80</span>
      </h3>
      <header className={`container ${styles.header}`}>
        <nav className={styles.nav}>
          <div className={styles["nav-btn-box"]}>
            <NavButton currentState={showNav} onClick={setShowNav} />
            <span className={styles.indicator}>
              {path === "/"
                ? "home"
                : path.includes("my-account")
                  ? "my account"
                  : path.slice(1).replace(/-/g, " ")}
            </span>
          </div>
          <div className={styles["nav-logo-box"]}>
            <Link href="/">
              <Image
                src={logoImg}
                alt={altText}
                priority
                className={styles["logo-icon"]}
              />
            </Link>
            <h3>
              Changing the world
              <br />
              one poo at a time.
            </h3>
          </div>
          <div className={styles["btn-icon-container"]}>
            {userId ? (
              <button
                type="button"
                className={styles["profile-icon"]}
                onClick={() => setShowPopOver(!showPopOver)}
              >
                <Image src={'/images/login/logged-in.svg'} alt="LoggedIn Icon" />
                <span>{user ? user.firstName : ""}</span>
                {showPopOver && (
                  <ul>
                    {popOverItems.map((item) => {
                      return (
                        <li
                          key={item.title}
                          onClick={() => {
                            setShowPopOver(false);
                          }}
                        >
                          {item.url ? (
                            <Link
                              href={item.url}
                              onClick={() => {
                                setCurrentTab("dashboard");
                              }}
                            >
                              {item.title}
                            </Link>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                logoutUser();
                              }}
                            >
                              {item.title}
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </button>
            ) : (
              <Link href="/login">
                <Image src={'/images/login/logged-out.svg'} alt="LoggedOut Icon" />
              </Link>
            )}
            <button
              type="button"
              onClick={() => setShowCart(!showCart)}
              className={styles["cart-btn-box"]}
            >
              <Image
                src={'/images/shared/bag-empty.webp'}
                alt="Cart"
                className={styles["cart-icon"]}
              />
              {currentCart?.cartItems &&
                currentCart?.cartItems?.length >= 1 && (
                  <span className={styles["qty-icon"]}>
                    {currentCart?.cartItems?.length}
                  </span>
                )}
            </button>
          </div>
        </nav>
        <SideNav
          setShowScatulator={setShowScatulator}
          setShowNav={setShowNav}
          showNav={showNav}
          className={showNav ? "show" : ""}
        />
        <CartAside showCart={showCart} setShowCart={setShowCart} />
        {showNav && <GreyOverlay onClick={() => setShowNav(false)} />}
        {showCart && <GreyOverlay onClick={() => setShowCart(false)} />}
        {showScatulator && <Scatulator />}
      </header>
      {globalError && (
        <GreyOverlay
          onClick={() => {
            setGlobalError("");
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PhoneVerificationContainer
            alert={true}
            heading={"sorry about this"}
            paragraph={[" ", globalError]}
            setShowVerification={(value: boolean) => setGlobalError(value.toString())}
            btn1="ok"
            btn1Handler={() => {
              setGlobalError(null);
            }}
          />
        </GreyOverlay>
      )}
    </>
  );
};

export default Nav;
