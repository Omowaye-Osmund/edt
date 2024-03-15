import React from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const MaterialCard = ({ material, clickHandler }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = material.file;
    link.download = "downloaded_file";
    link.click();
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-4">
      <h1 className="text-xl font-bold mb-2">{material.imageDescription}</h1>
      <div className="relative">
        <Link to={`/all-materials/${material.id}`}>
          {material.fileType.startsWith("image/") ? (
            <img
              src={material.file}
              alt="Uploaded Material"
              className="w-full h-40 object-cover mb-2"
            />
          ) : (
            <div className="bg-gray-200 p-4 rounded-md">
              {/* Display a placeholder or icon for non-image files */}
              <span>File Preview</span>
            </div>
          )}
        </Link>
        <button
          onClick={handleDownload}
          className="absolute top-0 right-0 m-2 p-2 bg-blue-500 text-white rounded-full cursor-pointer"
        >
          Download
        </button>
      </div>
      <div className="flex justify-between items-center">
        <Link
          to={`/all-materials/${material.id}`}
          className="text-blue-500 hover:underline"
        >
          View Details
        </Link>
        <MdDelete
          onClick={clickHandler}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MaterialCard;
