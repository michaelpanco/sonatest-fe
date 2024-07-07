import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function AuthCallback() {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const code = params.get("code");
  // check if the user already requested the auth-callback to server to prevent multi request
  const [requested, setRequested] = useState(false);
  const [invalidRequest, setInvalidRequest] = useState(false);
  // we need to user cookie to store our accessToken from HS
  const [cookies, setCookie] = useCookies(["hubspot-ui"]);

  useEffect(() => {
    if (code && !requested) {
      const validateCallbackCode = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/auth-callback.php",
            {
              method: "POST",
              body: JSON.stringify({ code: code }),
            }
          );

          // Check if the request is successfull otherwise tell the user that it fails
          if (!response.ok) {
            setInvalidRequest(true);
          }

          const data = await response.json();

          // set the accessToken to our cookie
          setCookie("accessToken", data.access_token, { path: "/" });

          setRequested(true);
          // redirect the user to contacts page
          window.location.href = "/contacts";
        } catch (error) {
          console.log(error, "error");
        }
      };
      validateCallbackCode();
    }
  }, [code, requested]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        {invalidRequest && (
          <div className="font-bold">
            Invalid request, please try again. {":("}
          </div>
        )}
        {!requested && (
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthCallback;
