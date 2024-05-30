import { useState } from "react";
import axios from "axios";
import NoImage from "../assets/images/nopic.png";
import { useSelector, useDispatch } from "react-redux";
import {
  addProductFail,
  addProductStart,
  addProductSuccess,
} from "../Redux/Product/ProductSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate();
  const [bigPreviewImage, setBigPreviewImage] = useState(NoImage);
  const [productData, setProductData] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductImages: [],
  });
  const [ProductImages, setProductImages] = useState([]);
  const [ProductImagesUrl, setProductImagesUrl] = useState([]);
  const { error, loading } = useSelector((state) => state.product);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.id;
    const value = e.target.value;
    setProductData({ ...productData, [name]: value });
  };
  const hanldeChangeImage = (e) => {
    setProductImages(e.target.files);

    const imgUrl = Array.from(e.target.files);
    let imgs = [];
    imgUrl.map((img) => imgs.push(URL.createObjectURL(img)));
    setBigPreviewImage(imgs[0]);
    setProductImagesUrl(imgs);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addProductStart());
    const res = await axios
      .post(
        "/api/v1/products/add",
        { ...productData, ProductImages },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        dispatch(addProductSuccess(data?.product));
        toast.success(data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
      })
      .catch((er) => {
        console.log(er);
        dispatch(addProductFail(er.response?.data));
        toast.error(er.response?.data?.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <main className="w-full ">
      <div className="mx-3 sm:mx-8 md:10   ">
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8  h-full  w-full p-5 sm:p-5 md:p-8 place-items-center  ">
          <div className="col-span-2  flex min-h-full w-full max-h-full  flex-col gap-4 ">
            <div className="col-span-2 w-full  shadow-md ">
              <img
                src={bigPreviewImage}
                alt=""
                className="w-full h-[350px] rounded-lg  "
              />
            </div>
            <div className="flex   h-[28vh] row-span-1 col-span-2  overflow-scroll  shadow-md object-scale-down gap-8  rounded-lg scroll-smooth ">
              <div className="flex justify-start w-full   flex-row  gap-5 p-5 ">
                {ProductImagesUrl.length === 0 ? (
                  <img
                    src={NoImage}
                    alt=""
                    className=" w-[250px] h-[170px] rounded-md border  opacity-55 py-2 self-center overflow-hidden"
                    disabled
                  />
                ) : (
                  ProductImagesUrl.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt=""
                      id={index}
                      className=" min-w-[250px] h-[170px] rounded-md  border py-2 self-center "
                      onClick={() => setBigPreviewImage(img)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="form">
            <div className="sm:w-sm md:max-w-md mx-auto">
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="flex justify-between flex-col gap-5 items-center"
              >
                <input
                  type="file"
                  name="ProductImages[]"
                  id="ProductImages"
                  onChange={hanldeChangeImage}
                  multiple
                  className="self-center w-full px-5"
                />
                <input
                  type="text"
                  name="ProductName"
                  id="ProductName"
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <input
                  type="number"
                  name="ProductPrice"
                  id="ProductPrice"
                  onChange={handleChange}
                  placeholder="Product Price"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <input
                  type="text"
                  name="ProductDescription"
                  id="ProductDescription"
                  onChange={handleChange}
                  placeholder="Product Feature"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  onChange={handleChange}
                  placeholder="Stock"
                  className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800  disabled:opacity-40  focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
                >
                  {loading ? (
                    <p className="text[10px]">
                      Please wait Uploading Of image Takes time
                    </p>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProduct;

/* TODO :working code for add product 
  <div className="w-md max-w-md mx-auto">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="ProductImages[]"
          id="ProductImages"
          onChange={hanldeChangeImage}
          multiple
        />
        <input
          type="text"
          name="ProductName"
          id="ProductName"
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          type="number"
          name="ProductPrice"
          id="ProductPrice"
          onChange={handleChange}
          placeholder="Product Price"
        />
        <input
          type="text"
          name="ProductDescription"
          id="ProductDescription"
          onChange={handleChange}
          placeholder="Product Feature"
        />
        <input
          type="number"
          name="stock"
          id="stock"
          onChange={handleChange}
          placeholder="Stock"
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
*/
