import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuUpload } from "react-icons/lu";

const AddMaterial = ({ addContactHandler }) => {
  const history = useNavigate();
  const [state, setState] = useState({
    imageDescription: "",
    file: null,
    fileType: "", // New property to store file type (image, pdf, docx, etc.)
  });

    const handleFileChange = (e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setState({
            ...state,
            file: reader.result,
            fileType: file.type, // Set the file type
          });
        };

        reader.readAsDataURL(file);
      }
    };

  const handleImageChange = (e) => {
    setState({
      ...state,
      imageDescription: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setState({
          ...state,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.image === "" && state.imageDescription === "") {
      alert("Can't be blank");
      return;
    }

    // Call the handler with the state
    addContactHandler(state);

    // Reset state
    setState({
      imageDescription: "",
      image: "",
    });
    history("/all-materials");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md"
    >
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="file">
          Upload Files Here (Images, PDFs, DOCX, etc.)
        </label>
        <div className="relative">
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className="opacity-0 absolute z-0"
          />
          <label
            htmlFor="file"
            className="cursor-pointer flex items-center justify-center w-full h-10 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600"
          >
            <LuUpload className="mr-2" />
            Choose File
          </label>
          <span className="ml-2">{state.file && state.file.name}</span>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6 text-center">Upload a Material</h1>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="image">
          Upload Images Here (Past Questions, etc.)
        </label>
        <div className="relative">
          <input
            type="file"
            id="image"
            onChange={handleImage}
            className="opacity-0 absolute z-0"
          />
          <label
            htmlFor="image"
            className="cursor-pointer flex items-center justify-center w-full h-10 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600"
          >
            <LuUpload className="mr-2" />
            Choose File
          </label>
          <span className="ml-2">{state.image && state.image.name}</span>
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-semibold mb-2"
          htmlFor="imageDescription"
        >
          File Description
        </label>
        <input
          type="text"
          id="imageDescription"
          value={state.imageDescription}
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Upload Material
      </button>
    </form>
  );
};

export default AddMaterial;
