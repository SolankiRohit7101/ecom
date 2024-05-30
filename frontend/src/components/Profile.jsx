import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import { signupSuccess } from "../Redux/user/UserSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Profile = () => {
  const fileref = useRef();
  const [imageFile, setImageFile] = useState(null);
  const [editState, setEditState] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [editProfile, setEditProfile] = useState({
    username: currentUser.username,
    bio: currentUser.bio,
  });
  const navigate = useNavigate();

  const [imageFileUrl, setimageFileUrl] = useState(currentUser.avatar.url);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    formdata.append("avatar", imageFile);
    const data = Object.fromEntries(formdata);
    await axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}api/v1/profile`,
        { ...data },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(({ data }) => {
        dispatch(signupSuccess(data.decode));
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
      });
  };
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setimageFileUrl(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="w-full h-[60vh] mx-auto my-4 md:my-10">
      <form
        onSubmit={handleSubmit}
        method="POST"
        encType="multipart/form-data"
        className="w-full m-w-md mx-auto text-center gap-3 flex justify-center items-center flex-col  pt-5 md:pt-10  text-lg text-blue-500"
      >
        <div
          className=" mx-auto "
          onClick={
            editState
              ? () => fileref.current.click()
              : () => console.log("tsting")
          }
        >
          <img
            src={imageFileUrl || ""}
            alt="profile"
            className="w-32 h-32 rounded-full border mx-auto"
          />
          <input
            onChange={handleImageChange}
            ref={fileref}
            type="file"
            name="avatar"
            id="avatar"
            hidden
          />
        </div>
        {editState ? (
          <input
            type="text"
            name="username"
            className="text-2xl font-bold "
            value={editProfile.username}
            onChange={handleChange}
          />
        ) : (
          <p className="  mx-auto flex gap-5 justify-center items-center cursor-pointer my-3 w-md md:max-w-md">
            <FaRegUser /> {currentUser.username}
          </p>
        )}
        {editState ? (
          <input
            type="text"
            value={editProfile.bio}
            name="bio"
            className={`text-2xl font-bold`}
            onChange={handleChange}
          />
        ) : (
          <p className=" mx-auto flex justify-center gap-5 items-center cursor-pointer my-3 w-md md:max-w-md">
            <MdAlternateEmail />
            {currentUser?.bio ? currentUser?.bio : "Edit your bio"}
          </p>
        )}
        <div className="flex justify-center items-center gap-3 ">
          {!editState ? (
            <span
              className="border mt-3 border-blue-700 rounded-lg px-3 "
              onClick={() => setEditState(true)}
            >
              EditProfile
            </span>
          ) : (
            <button
              className="border mt-3 border-blue-700 rounded-lg px-3 "
              type="submit"
            >
              save
            </button>
          )}

          {editState && (
            <button
              className="border mt-3 border-blue-700 rounded-lg px-3 "
              onClick={() => setEditState(false)}
            >
              exit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Profile;
