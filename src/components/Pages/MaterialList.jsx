import MaterialCard from "./MaterialCard";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

const MaterialList = ({ contacts, getContactId, term, searchKeyword }) => {
  let inputEL = useRef();

  const deleteMaterialHandler = (id) => {
    getContactId(id);
  };

  let contactData = contacts.map((contact) => (
    <MaterialCard
      material={contact}
      key={contact.id}
      clickHandler={() => deleteMaterialHandler(contact.id)}
    />
  ));

  const getSearchTerm = () => {
    searchKeyword(inputEL.current.value);
  };

  return (
    <div className="container mx-auto p-4">
      <Link to="/" className="mb-4 inline-block">
        <button className="flex items-center">
          <IoIosArrowBack className="mr-2" /> Back
        </button>
      </Link>
      <div className="mb-4 relative">
        <CiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search materials by caption"
          value={term}
          onChange={getSearchTerm}
          ref={inputEL}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500 flex-grow"
        />
      </div>
      <h2 className="text-2xl font-bold mb-4">Uploaded Materials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {contactData}
      </div>
    </div>
  );
};

export default MaterialList;
