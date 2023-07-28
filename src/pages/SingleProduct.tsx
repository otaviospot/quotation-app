import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactMarkdown from "react-markdown";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { apiGetSingleProduct } from "../services/apiService";

interface ISingleProduct {
  data: any;
  attributes: any;
  name: string;
  price: number;
  descritpion: string;
  promotionalPrice: number;
  productGallery: {
    data: {
      attributes: {
        formats: {
          large: {
            url: string;
          };
        };
      };
    };
  };
  id: any;
  sku: string;
  showPrice?: boolean;
  stock: number;
}

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState<ISingleProduct>({
    data: {},
    attributes: {},
    descritpion: "",
    name: "",
    price: 0,
    promotionalPrice: 0,
    productGallery: {
      data: {
        attributes: {
          formats: {
            large: {
              url: "",
            },
          },
        },
      },
    },
    id: "",
    sku: "",
    stock: 0,
    showPrice: true,
  });
  const { productId } = useParams();

  const { handleAddToCart } = useContext(MyContext);

  useEffect(() => {
    async function getSingleProduct() {
      try {
        const backEndSingleProduct = await apiGetSingleProduct(productId);
        setSingleProduct(backEndSingleProduct);
      } catch (error) {
        console.log(error);
      }
    }

    getSingleProduct();
  }, [productId]);

  const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const sliderRef: any = useRef();

  const RealBr = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <section className="flex flex-row">
      <div className="w-1/2 flex-grow-0 flex relative items-center pt-5">
        <button onClick={handlePrevSlide} className="absolute left-0 z-50">
          <AiOutlineLeft className="w-6 h-6 fill-red-600" />
        </button>
        <button onClick={handleNextSlide} className="absolute right-0 z-50">
          <AiOutlineRight className="w-6 h-6 fill-red-600" />
        </button>
        <div className="w-full">
          <Slider ref={sliderRef} {...slickSettings}>
            {singleProduct.data?.attributes?.productGallery?.data?.map(
              (image: any) => (
                <div
                  className="h-90v !flex justify-center center"
                  key={image.id}
                >
                  <img
                    src={`http://localhost:1337${image.attributes.url}`}
                    alt={image.attributes?.name}
                    className="w-auto h-auto max-h-full"
                  />
                </div>
              )
            )}
          </Slider>
        </div>
      </div>
      <div className="w-1/2 flex-grow flex flex-col border-solid border-l border-gray-400 p-5">
        <h1 className="text-3xl font-bold">
          {singleProduct.data?.attributes?.name}
        </h1>
        <span className="text-sm font-bold">
          sku: {singleProduct.data?.attributes?.sku}
        </span>
        {singleProduct.data?.attributes?.showPrice && (
          <div className="productPrice flex flex-row gap-3 items-center">
            <span className="price text-sm text-center text-gray-600 line-through">
              {RealBr.format(singleProduct.data?.attributes?.price)}
            </span>
            <span className="promotionPrice font-bold text-xl">
              {RealBr.format(singleProduct.data?.attributes?.promotionalPrice)}
            </span>
          </div>
        )}
        <button
          className="rounded-md bg-red-500 text-white p-3 mt-2 hover:bg-red-900"
          onClick={() => handleAddToCart(singleProduct.data?.id)}
        >
          Adicionar ao carrinho
        </button>
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-md font-semibold">Descrição:</h2>
          <ReactMarkdown>
            {singleProduct.data?.attributes?.description}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
