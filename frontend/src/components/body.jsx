import React from "react";
import img from "../assets/tshirt.webp";

const Body = () => {
  const data = [
    {
      image: img,
      tag: "Coldcase®",
      descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
      price: "499",
    },
    {
      image: img,
      tag: "Coldcase®",

      descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
      price: "499",
    },
    {
      image: img,
      tag: "Coldcase®",

      descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
      price: "499",
    },
    {
      image: img,
      tag: "Coldcase®", 

      descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
      price: "499",
    },
    {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },
      {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },  {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },  {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },  {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },  {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },  {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },  {
        image: img,
        tag: "Coldcase®",
        descrip: "Men's Black AOT Founding Titan Graphic Printed Vest",
        price: "499",
      },
    
  ];

  return (
    <div className="min-h-screen flex justify-center flex-wrap mt-8  gap-6">
      {data.map((item, index) => {
        return (
          <div className="w-[400px] min-h-[400px] flex flex-col   rounded-lg  "key={index}>
            <div className="img">
              <img src={item.image} alt="Merch img" className="w-full rounded-lg" />
            </div>
            <div className="dis text-start">
              <div className="flex gap-8">
                <div className="com">
                  {" "}
                  <h3 className="">{item.tag}</h3>
                  <h2 className="text-zinc-500 text-sm">
                    {item.descrip}
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
                  <span>₹</span>{item.price}
                </div>
                <div className="line-through text-zinc-500">₹999</div>
                <span className="sellingFastBox"></span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Body;
