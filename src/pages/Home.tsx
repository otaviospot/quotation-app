import { useContext } from "react";

import MainProductList from "../components/MainProductList";
import Product from "../components/Product";
import { MyContext } from "../MyContext";
import CartSection from "../components/CartSection";

export default function Home() {
  const { allProducts, handleAddToCart } = useContext(MyContext);

  return (
    <section className="flex flex-row">
      <MainProductList>
        {allProducts.data?.map((product: any) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.attributes.name}
            price={product.attributes.price}
            promotionalPrice={product.attributes.promotionalPrice}
            image={
              product.attributes.defaultImage.data.attributes.formats.thumbnail
                .url
            }
            showPrice={product.attributes.showPrice}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </MainProductList>
      <CartSection />
    </section>
  );
}
