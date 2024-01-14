import { styles } from "../../styles";
import { AUTH } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";


const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { loading: loginLoading, data: userInfo }] = useMutation(
    AUTH,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ variables: { email: email, password: password } });

  }

  useEffect(() => {
    if (userInfo?.login?.token) {
      props.setIsEditModeEnabled(true);
      props.setShowLoginModal(false);
      props.setShowLogoutModal(true);
      localStorage.setItem('token', userInfo?.login?.token);
    }
    if (userInfo?.login?.token && !loginLoading) {
      props.setShowUserModal(false);
    }
  }, [props,userInfo, loginLoading])
  

  const handlePopUp = () => {
    props.setShowUserModal(false);
    if (props.isEditModeEnabled) {
      props.setShowLogoutModal(true);
      props.setShowLoginModal(false);
    } else {
      props.setShowLogoutModal(false);
      props.setShowLoginModal(true);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => handlePopUp() }
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex-[0.75] bg-black-100 p-8 rounded-md">
            <p className={styles.sectionSubText}>Login</p>

            <form className="mt-12 flex flex-col gap-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary"
              >
                {loginLoading ? "Logining..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginModal;
