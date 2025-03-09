"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import ScatulatorButton from "./scatulator-button/scatulator-button";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import styles from "./footer.module.scss";

const navLink = [
  [
    { url: "/", text: "home" },
    { url: "/shop", text: "shop" },
    { url: null, text: "scatulator" },
  ],
  [
    { url: "/faq", text: "FAQ" },
    { url: "/about", text: "about" },
    { url: "/contact", text: "contact" },
    { url: "privacy", text: "privacy policy" },
    { url: "/terms", text: "terms & conditions" },
  ],
];

const Footer = () => {
  const path = usePathname();
  const { user, userId, orderPlaced, order } = useCart();

  return (
    <footer
      className={styles.footer}
      style={
        (path === "/my-account" && !user) ||
          (path === "/login" && userId) ||
          (path === "/thank-you" && !orderPlaced) ||
          (path === "/thank-you" && order.submitState === "fail")
          ? { display: "none" }
          : {}
      }
    >
      <div className={`${styles["inner-container"]} container`}>
        <div>
          <h4>scatbags</h4>
          <article>
            <div>
              <ul className={styles["link-list"]}>
                {navLink[0].map(({ url, text }) => {
                  return (
                    <li key={url}>
                      {url ? (
                        <Link href={url}>{text}</Link>
                      ) : (
                        <ScatulatorButton>{text}</ScatulatorButton>
                      )}
                    </li>
                  );
                })}
              </ul>
              <ul className={styles["social-list"]}>
                <li>
                  <a href="https://www.instagram.com/scatbags" target="_blank">
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100064552494905"
                    target="_blank"
                  >
                    <FaFacebookF />
                  </a>
                </li>
              </ul>
            </div>
            <ul className={styles["link-list"]}>
              {navLink[1].map(({ url, text }) => {
                return (
                  <li key={url}>
                    {url ? (
                      <Link href={url}>{text}</Link>
                    ) : (
                      <ScatulatorButton>{text}</ScatulatorButton>
                    )}
                  </li>
                );
              })}
            </ul>
          </article>
        </div>
        <div className={styles["image-container"]}>
          <Image src={'/images/shared/scatbags-poo.svg'} alt="Scatbags Logo" />
          <p>
            &copy; 2024 <a href="https://scatbags.com.au">Scatbags</a>
          </p>
        </div>
        <div className={styles["company-list-box"]}>
          <h4>our brands</h4>
          <ul className={styles["company-list"]}>
            <li>
              <a href="https://barneybed.com.au" target="_blank">
                Barney Bed
                <span className={styles.hyphen}>-</span>
                <span className={styles["link-desc"]}>Luxury Dog Beds</span>
              </a>
            </li>
            <li>
              <a href="https://catst.com.au" target="_blank">
                Cat Street
                <span className={styles.hyphen}>-</span>
                <span className={styles["link-desc"]}>Luxury Cat Beds</span>
              </a>
            </li>
            <li>
              <a href="https://furfy.com.au" target="_blank">
                Furfy
                <span className={styles.hyphen}>-</span>
                <span className={styles["link-desc"]}>Pet Hair Remover</span>
              </a>
            </li>
            <li>
              <a href="https://pottyplant.com.au" target="_blank">
                Potty Plant
                <span className={styles.hyphen}>-</span>
                <span className={styles["link-desc"]}>
                  Real Grass Dog Toilet
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
