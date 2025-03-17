"use client";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "@/styles/common/drawer.css";
import { useCart } from "@/contexts/CartContext";
import FurfyAustralia from "../../../public/images/furfy_australia.webp";
import { CartItem, GreyOverlay, PriceContainer } from "../shared/index.shared";
import CloseIcon from "../../../public/icons/icon-close.svg";
import styles from "./Drawer.module.scss";
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void; // Function that takes no arguments and returns void
}

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

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { currentCart } = useCart();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState(false);
  useOutsideAlerter(wrapperRef, onClose);

  return (
    <aside className={isOpen ? `${styles.show} ${styles.aside}` : styles.aside}>
      <div className="drawer-overlay" ref={wrapperRef}>
        <div className="drawer">
          <div className="drawer-content">
            {/* Cart Header */}
            <div className="d-flex justify-content-between align-items-center">
              <h3 className={`font-bold uppercase ${styles.drawerTitle}`}>Your Items</h3>
              <Image
                src={CloseIcon}
                className="cursor-pointer"
                width={50}
                alt="Close"
                onClick={onClose}
              />
            </div>
            <ul className="px-0 my-0">
              {currentCart?.cartItems && currentCart?.cartItems?.length > 0 ? (
                currentCart?.cartItems?.map((product) => {
                  return (
                    <Fragment key={`cart-item-${product?.id}`}>
                      <CartItem {...product} setOverlay={setOverlay} imgUrl={FurfyAustralia} />
                    </Fragment>
                  );
                })
              ) : (
                <li className="cart-empty" key="cart-item-empty">
                  your cart is empty
                </li>
              )}

              <PriceContainer />
              {overlay && (
                <GreyOverlay
                  style={{
                    position: 'absolute',
                    zIndex: '1',
                  }}
                />
              )}
            </ul>
            <div className="pt-4">
              <button
                disabled={!currentCart?.cartItems?.[0]?.qty}
                onClick={() => router.push("/checkout")}
                className="primary-button w-full checkout-button"
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Drawer;
