import styles from './cart-item-desc.module.scss';

type CartItemDescProps = {
  resetAskingHandler?: () => void;
  confirmation?: boolean;
  cartLine1: string;
  cartLine2: string;
  subscriptionPlan: { name: string };
};

const CartItemDesc = ({
  cartLine1,
  cartLine2,
  subscriptionPlan,
}: CartItemDescProps) => {
  return (
    <article className={styles.article}>
      <p>{cartLine2 || 'cartLine1'}</p>
      <p>{cartLine1 || 'cartLine2'}</p>
      <p>
        <span>{subscriptionPlan?.name || 'one-off purchase'}</span>
      </p>
    </article>
  );
};

export default CartItemDesc;
