import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useSelector((state) => state.product.product);
  const product = products.filter((p) => p._id === id);
  const [bigPreviewImage, setBigPreviewImage] = useState(
    product[0].ProductImages[0]
  );
  return (
    <div>
      <main className="w-full ">
        <div className="mx-3 sm:mx-8 md:10   ">
          <div className=" grid  grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 w-full p-5 sm:p-5 md:p-8 place-items-center  ">
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
              <p className="  text-pretty">{product[0].ProductDescription}</p>
              <h1 className="text-3xl "> Stock : {product[0].stock}</h1>
            </div>
          </div>
        </div>
      </main>
      <ProductReviews id={id} />
    </div>
  );
};

export default ProductDetail;

const ProductReviews = ({ id }) => {
  const [allReview, setAllReview] = useState([]);
  const [addReview, setAddReview] = useState({});
  const [ratingId, setRatingId] = useState(0);
  const reviewsFetch = async () => {
    await axios
      .getVITE_(`${import.meta.env.VITE_BACKEND_URL}/api/v1/${id}`)
      .then(({ data }) => {
        setAllReview(data.pr);
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
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.message, {
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
  useEffect(() => {
    reviewsFetch();
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/comment/${id}`,
        {
          ...addReview,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => reviewsFetch())
      .catch((err) => {
        toast.error(err.response.data?.message, {
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

  const HandleOnChange = (e) => {
    const { value, name } = e.target;
    setAddReview({
      ...addReview,
      [name]: value,
    });
  };
  const handleStarChange = (star) => {
    setRatingId(star);
    setAddReview((prev) => ({ ...prev, rating: star }));
  };
  return (
    <div className="w-sm md:lg:w-full  sm:mt-5 md:mt10  ">
      <div className="  md:grid md:grid-cols-2  py-5    ">
        <div className="input_Box_for_review  md:col-span-2 text-lg bg-white py-2">
          <div className=" md:px-20 px-4 flex justify-between space-y-4  items-center flex-col md:flex-row w-full h-full">
            <input
              type="text"
              name="comment"
              id="comment"
              placeholder="Write you optinion so other can decide to buy it or not"
              className="outline-none text-blue-700  md:min-w-lg flex-1 p-2 "
              onChange={HandleOnChange}
            />
            <div>
              {[1, 2, 3, 4, 5].map((star, key) => {
                return (
                  <span
                    key={key}
                    className="start"
                    style={{
                      cursor: "pointer",
                      color: ratingId >= star ? "gold" : "gray",
                      fontSize: `35px`,
                    }}
                    onClick={() => handleStarChange(star)}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <button
              onClick={handleReviewSubmit}
              className="bg-red-700 text-white   text-xl  p-2 rounded-lg w-[200px]"
            >
              Submit review
            </button>
          </div>
        </div>
        <div className="w-full mx-auto col-span-2 space-y-3 my-5   ">
          {!allReview.length && (
            <p className="text-xl gray-400 text-center">
              {" "}
              Be the first one to comment
            </p>
          )}
          {allReview.map((review) => (
            <ReviewComponents review={review} key={review?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};
const ReviewComponents = ({ review }) => {
  return (
    <div
      className="w-full  max-w-md shadow-md flex justify-center items-center flex-col mx-auto  "
      key={review?.id}
    >
      <p>{review?.user}</p>
      <p>{review?.message}</p>
      <h3>Rating: {review?.rating}</h3>
    </div>
  );
};
