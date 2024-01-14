import { styles } from "../../styles";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE_CARD, EDIT_SERVICE_CARD } from "../../graphql/mutations";

const ServiceCardModal = (props) => {
  const [title, setTitle] = useState("");
    const [file, setFile] = useState<File | string>();
    const [editFlow, setEditFlow] = useState<boolean>(false);
  const [createServiceCard, { loading: loginLoading, data: serviceInfo }] =
    useMutation(CREATE_SERVICE_CARD, {
      context: {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      },
    });

    const [editServiceCard, { loading: editLoginLoading, data: editServiceInfo }] =
    useMutation(EDIT_SERVICE_CARD, {
      context: {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      },
    });


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, file);
    if (file) {
        await uploadImage(file);
        if (editFlow) {
            await editServiceCard({
                variables: {
            id: identity,
          input: { title: title, icon: `/upload/${file.name}`, order: 1 },
        },
      });
        }
      await createServiceCard({
        variables: {
          input: { title: title, icon: `/upload/${file.name}`, order: 1 },
        },
      });
    }
  };

  useEffect(() => {
    if (props.serviceCardTitle) {
      setTitle(props.serviceCardTitle);
        setFile(props.serviceCardFile);
        setEditFlow(true);
    }
  }, [props]);

  const uploadImage = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    await axios.post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const onChange = (event: React.FormEvent) => {
    const files = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => props.setShowServiceCardModal(false)}
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
          <div className=" bg-black-100 p-8 rounded-md">
            <p className={styles.sectionSubText}>Edit Service Card</p>

            <form className="mt-12 flex flex-col gap-8">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="title"
                  name="title"
                  id="title"
                  placeholder="Write a title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>

              {file ? (
                <div
                  href="#"
                  class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    class="object-cover w-full rounded-t-lg h-40 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={typeof file === 'string' ? file :URL.createObjectURL(file)}
                    alt=""
                  />
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <p class="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {file.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFile()}
                      className="bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary"
                    >
                      {" "}
                      Delete
                      {/* {editLoading ? "Editing..." : "Edit"} */}
                    </button>
                  </div>
                </div>
              ) : (
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        aria-hidden="true"
                        class="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">Click to upload</span> or
                        drag and drop
                      </p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      onChange={onChange}
                    />
                  </label>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary"
              >
                {"Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardModal;
