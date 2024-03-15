import React from "react";
import { useLocation, useParams } from "react-router-dom";

const MaterialDetails = ({ contacts }) => {
  const { id } = useParams();
  const location = useLocation();
  const materialId = id;
  const material = contacts.find((contact) => contact.id === materialId);

  if (!material) {
    // Handle the case where material is not found
    return <div className="container mx-auto p-4">Material not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        {material.fileType.startsWith("image/") ? (
          <img
            src={material.file}
            alt="Uploaded Material"
            className="w-[100vh] h-auto object-full rounded-md shadow-lg"
          />
        ) : (
          <div className="bg-gray-200 p-4 rounded-md">
            {/* Display a placeholder or icon for non-image files */}
            <span>File Preview</span>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{material.imageDescription}</h1>
        {/* Add other details as needed */}
        <div className="bg-gray-100 p-4 rounded-md shadow-lg">
          {/* Additional details go here */}
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
