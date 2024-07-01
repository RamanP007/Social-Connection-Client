import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetReq, PostReq, isUserLoggedIn } from "../helpers";
import { toast } from "react-toastify";
import { userSocket } from "../socket";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import { TermsAndConditionsPopup } from "../components/TermsAndCondtionspopup";

const Home = () => {
  const navigate = useNavigate();
  const [termsConditionPopup, setTermsConditionPopup] = useState(false);
  const [accept, setAccept] = useState(false);

  const handleLogout = async () => {
    const response = await PostReq("user/logout", {});
    if (!response.success) {
      toast.error(response.error);
    } else {
      navigate("/auth");
    }
  };

  const getProfile = async () => {
    const response = await GetReq("user/me");
    if (!response.success) {
      toast.error(response.error);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigate("/auth");
    }
  }, []);

  useEffect(() => {
    if (isUserLoggedIn()) {
      getProfile();
      userSocket.connect();
      userSocket.on("SESSION_ALREADY_EXIST", () => {
        handleLogout();
      });
    }
  }, []);
  return (
    <>
      {!termsConditionPopup ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center justify-center w-56 h-56 bg-gray-800 rounded-lg">
              <img src={avatar1} alt="Avatar 1" className="w-48 h-48" />
            </div>
            <div className="flex items-center justify-center w-56 h-56 bg-gray-800 rounded-lg">
              <img src={avatar2} alt="Avatar 2" className="w-48 h-48" />
            </div>
            <div className="flex items-center justify-center w-56 h-56 bg-gray-800 rounded-lg">
              <img src={avatar1} alt="Avatar 3" className="w-48 h-48" />
            </div>
            <div className="flex items-center justify-center w-56 h-56 bg-gray-800 rounded-lg">
              <img src={avatar1} alt="Avatar 4" className="w-48 h-48" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Social Connection</h1>
          <p className="text-lg mb-8">Meet strangers worldwide</p>
          <button
            onClick={() => setTermsConditionPopup(true)}
            className="w-64 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-black font-bold rounded-full hover:bg-gradient-to-l"
          >
            Start
          </button>
        </div>
      ) : (
        <TermsAndConditionsPopup
          setAccept={setAccept}
          setTermsConditionPopup={setTermsConditionPopup}
        />
      )}
      {/* <div>Home</div>
      <div onClick={() => handleLogout()}>Logout</div> */}
    </>
  );
};

export default Home;
