/* eslint-disable jsx-a11y/anchor-is-valid */
import { useNavigate } from "react-router-dom";
import { PostReq } from "../helpers";
import { toast } from "react-toastify";

export const TermsAndConditionsPopup = ({
  setAccept,
  setTermsConditionPopup,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to the Social Connection!
        </h2>
        <p className="mb-4">
          To use our site, you must be 18+ and read and accept our terms,
          conditions, acceptable use policy, and cookie policy.
        </p>
        <p className="mb-4">By clicking "Accept", you agree to:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Age Requirement: Confirm you are 18 years or older.</li>
          <li>
            Terms and Conditions: Adhere to Chatroulette's terms as per the{" "}
            <a href="#" className="text-blue-500">
              terms of service
            </a>{" "}
            document.
          </li>
          <li>
            Acceptable Use Policy: Follow Chatroulette's{" "}
            <a href="#" className="text-blue-500">
              acceptable use policy
            </a>
            .
          </li>
          <li>
            Privacy: Respect Chatroulette's privacy guidelines in the{" "}
            <a href="#" className="text-blue-500">
              privacy
            </a>{" "}
            document.
          </li>
          <li>
            Cookies: Consent to essential and non-essential cookies as per the{" "}
            <a href="#" className="text-blue-500">
              cookies policy
            </a>{" "}
            document.
          </li>
        </ul>
        <p className="mb-4">
          Failure to comply may result in termination of access. Click "Accept"
          to confirm your understanding and agreement.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            // onClick={setAccept(true)}
            className="px-4 py-2 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700"
          >
            Decline
          </button>
          <button
            onClick={() => {
              navigate("/permission");
              // handleAcceptTermsAndConditions();
            }}
            className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-full hover:bg-yellow-600"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
