import React from "react";
import { Button } from "react-bootstrap";

export default function ImageUploader({ uploadPreset, uploadImageUrl }) {
  const myCropWidget = async () => {
    const uploadWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpqo0wy4o",
        uploadPreset: "upload",
        cropping: true,
      },

      (error, result) => {
        console.log(error, result);

        if (result.event === "success") {
          uploadImageUrl(result.info.url);
        }
      }
    );
    uploadWidget.open();
  };

  return (
    <div>
      <Button onClick={myCropWidget}>
        Upload picture
      </Button>
    </div>
  );
}