import {openUploadWidget} from "../../utils/CloudinaryService";
import {cloudinary_upload_preset} from "../../config"

const CloudinaryUpload = ({setUrl,setName}) => {
    const uploadImageWidget = () => {
        let myUploadWidget = openUploadWidget(
            {
                cloudName: "dsdpnz2xz",
                uploadPreset: cloudinary_upload_preset,
                sources: ["local"],
            },
            function (error, result) {
                if (!error && result.event === "success") {
                  console.log(result)
                 console.log(result.info.original_filename)
                 setUrl(result.info.secure_url)
                 setName(result.info.original_filename)
                } else {
                    if (error) {
                        console.log("error occured",error);
                    }
                }
            }
        );
        myUploadWidget.open();
    };

    return (
        <>
        {/* <button
            className="bg-white text-black  rounded-full p-4 font-semibold"
            onClick={uploadImageWidget}
        >
            Select Track
        </button> */}
        <button
        onClick={uploadImageWidget}
        class="brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-blue-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-600"
      >
        <div
          class="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-lg font-bold w-full h-full"
        >
          <div
            class="group-hover:scale-100 flex group-hover:text-blue-500 text-blue-600 gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.8"
              class="w-6 h-6 stroke-blue-600 group-hover:stroke-blue-500 group-hover:stroke-{1.99}"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
              ></path>
            </svg>
           Select Track
          </div>
        </div>
      </button>
      </>
    );
};

export default CloudinaryUpload;