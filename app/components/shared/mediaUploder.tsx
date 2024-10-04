'use client'
import { useToast } from "@/hooks/use-toast";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { getImageSize } from "next/dist/server/image-optimizer";
import Image from "next/image";
const MediaUploder = ({ onValueChange, setImage, image, publicId, type }) => {
  const { toast } = useToast();

  function onUploadSuccessHandler(result) {
    setImage((prevState) => ({
      ...prevState,
      publicId: result.info.public_id,
      width: result.info?.width,
      height: result.info?.height,
      secureURL: result?.info.secureURL,
    }));

    onValueChange(result?.info?.public_id);
    toast({
      title: "Image upload successfully",
      description: "1 credit was decuted from your account",
      duration: 5000,
      className: "success-toast",
    });
  }

  function onUploadErrorHandler() {
    toast({
      title: "Error",
      description: "An error occured while uploading",
      duration: 5000,
      className: "error-toast",
    });
  }

  return (
    <CldUploadWidget
      uploadPreset="fahad_imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">Original</h3>
          {publicId ? (
            <>
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  src={publicId}
                  width="1000"
                  height="500"
                  crop={{
                    type: "auto",
                    source: true,
                  }}
                  alt={""}
                  className="media-uploader-image_cldImage"
                />
              </div>
              Here is the Image
            </>
          ) : (
            <div className="media-uploader_cta" onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
              <p className="p-14-medium">Click Here to upload image</p>
              Here is the No Image
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default MediaUploder;
