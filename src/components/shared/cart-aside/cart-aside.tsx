import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import {
  Button,
  ButtonClose,
} from "@/components/Checkout/index.checkout";
import { CartContainer } from "../index.shared";
import styles from "./cart-aside.module.scss";

type CartAsideProps = {
  showCart: boolean;
  setShowCart: (bool: boolean) => void;
};

const CartAside = ({ showCart, setShowCart }: CartAsideProps) => {
  const { currentCart } = useCart();

  return (
    <aside
      className={showCart ? `${styles.show} ${styles.aside}` : styles.aside}
    >
      <ButtonClose
        onClick={() => setShowCart(false)}
        style={{ fontSize: "5rem" }}
      />
      <CartContainer
        visible={false}
        processingPayment={false}
        evaluatePayVisible={false}
        style={{
          border: "none",
          padding: "0",
          marginBottom: "2rem",
        }}
      />
      <Link href="/checkout">
        <Button
          disabled={
            currentCart && currentCart.cartItems
              ? currentCart?.cartItems?.length <= 0
              : true
          }
          onClick={() => setShowCart(false)}
          extraStyles={{
            width: "100%",
            padding: "1.5rem 0",
            marginBottom: "10rem",
            position: "sticky",
            bottom: "15px",
          }}
        >
          checkout now
        </Button>
      </Link>
    </aside>
  );
};

export default CartAside;
