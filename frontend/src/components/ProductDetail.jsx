import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product.product);
  const product = products.filter((p) => p._id === id);
  const [bigPreviewImage, setBigPreviewImage] = useState(
    product[0].ProductImages[0]
  );

  console.log(product[0].ProductName);

  return (
    <div>
      <main className="w-full ">
        <div className="mx-3 sm:mx-8 md:10   ">
          <div className=" grid grid-cols-3 gap-5 md:gap-8  h-full  w-full p-5 sm:p-5 md:p-8 place-items-center  ">
            <div className="col-span-2  flex min-h-full w-full max-h-full  flex-col gap-4 ">
              <div className="col-span-2 w-full  shadow-md ">
                <img
                  src={bigPreviewImage}
                  alt=""
                  className="w-full h-[350px] rounded-lg  "
                />
              </div>
              <div className="flex   h-[28vh] row-span-1 col-span-2  overflow-scroll  shadow-md object-scale-down gap-8  rounded-lg scroll-smooth ">
                <div className="flex justify-start w-full  flex-row  gap-5 p-5">
                  {product[0].ProductImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      id={index}
                      className=" min-w-[250px] h-[170px] rounded-md  border border-r object-cover self-center "
                      onClick={() => setBigPreviewImage(img)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="product-data w-md start">
              <h1 className="text-xl ">{product[0].ProductName}</h1>
              <h1 className="text-lg ">{product[0].ProductPrice}</h1>
              <h1 className="text-lg  text-ellipsis">
                {product[0].ProductDescription}
              </h1>
              <h1 className="text-3xl "> Stock : {product[0].stock}</h1>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
