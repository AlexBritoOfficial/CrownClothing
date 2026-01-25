import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";
import { ProductCardContainer, ProductCardImage, Footer, Name, Price, ProductButton } from "./product-card.styles";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => {
    addItemToCart(product);
  };

  return (
    <ProductCardContainer>
      <ProductCardImage
        src={imageUrl}
        alt={name}
      />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <ProductButton
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}>
        Add to Cart
      </ProductButton>
    </ProductCardContainer>
  );
};

export default ProductCard;
