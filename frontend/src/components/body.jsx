import { useEffect } from "react";
import axios from "axios";
import {
  getProductsStart,
  getProductsFail,
  getProductsSuccess,
} from "../Redux/Product/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product.product);
  const { myProduct } = useSelector((state) => state.product.product);

  const getProducts = async () => {
    getProductsStart();
    const res = await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/products`)
      .then(({ data }) => dispatch(getProductsSuccess(data.products)))
      .catch((error) => {
        console.log(error.res);
        dispatch(getProductsFail(error.response?.data));
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    /* my code */

    <div className="w-full h-full ">
      <div className="mx-2 sm:mx-6 md:mx-14  ">
        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4  gap-5 md:gap-10  sm:my-3 md:my-7 ">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>

    /*    <div className="h-full flex justify-center flex-wrap mt-8    gap-6">
      {!products ? (
        <div> Loading Please wait</div>
      ) : (
        products?.map((item, index) => {
          return (
            <div
              className="w-[400px] min-h-[300px] object-scale-down flex flex-col  border border-black  rounded-lg  "
              key={index}
              onClick={() => navigate(`/product/${item._id}`)}
            >
              <div className="">
                <img
                  src={item.ProductImages[0]}
                  alt="Merch img"
                  className="w-full min-w-full  min-h-full rounded-lg"
                />
              </div>
              <div className="dis text-start">
                <div className="flex gap-8">
                  <div className="com">
                    {" "}
                    <h3 className="">{item.ProductName}</h3>
                    <h2 className="text-zinc-500 text-sm">
                      {item.ProductDescrition}
                    </h2>
                  </div>

                  <div className="wishListProduct-v2 ">
                    <img
                      src="https://images.bewakoof.com/web/Wishlist.svg"
                      alt="wishlist"
                      className="wishlist-icon-animate "
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="  ">
                    <span>₹</span>
                    {item.ProductPrice}
                  </div>
                  <div className="line-through text-zinc-500">₹999</div>
                  <span className="sellingFastBox"></span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div> */
  );
};

export default Body;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-[420px]   p-2 md:p-5   border shadow-xl rounded-t-xl  "
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <img
        src={product?.ProductImages[0]}
        alt=""
        className="w-full h-[300px] rounded-lg bg-white"
      />
      <div className="text  grid grid-cols-2  p-4">
        <h1 className="text-lg  truncate col-span-2 ">{product.ProductName}</h1>
        <h1 className="text-lg"> Price : {product.ProductPrice}</h1>
        <h1 className="text-lg"> Stock : {product.stock}</h1>
      </div>
    </div>
  );
};
