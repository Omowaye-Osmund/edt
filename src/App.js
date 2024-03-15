import React, {useState, useEffect} from "react";
import {  Route, Routes } from "react-router-dom";
import AddMaterial from "./components/Pages/AddMaterial";
import About from "./components/Pages/About";
import Body from "./components/ui/Body";
import Layout from "./components/ui/Layout";
import MaterialDetails from "./components/Pages/MaterialDetails";
import MaterialList from "./components/Pages/MaterialList";
import NotFound from "./components/Pages/NotFound";
import { v4 as uuidv4 } from "uuid";

// ...

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //Retrieve Contacts
  const retrieveMaterials = async () => {
    try {
      const response = await fetch(
        "https://edts-project-6bae0-default-rtdb.firebaseio.com/materials.json",
        {
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if required
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const getAllMaterials = async () => {
      try {
        const allMaterials = await retrieveMaterials();
        if (allMaterials) {
          // Update state with the latest materials from Firebase
          setContacts(Object.values(allMaterials));
        }
      } catch (error) {
        // Handle error appropriately
        console.error("Error getting all materials:", error);
      }
    };

    getAllMaterials();
  }, []); // Empty dependency array to ensure it runs only once during mount

  // ...

  const removeMaterial = async (id) => {
    try {
      const response = await fetch(
        `https://edts-project-6bae0-default-rtdb.firebaseio.com/materials/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Firebase Delete Response:", response);

      if (!response.ok) {
        throw new Error("Failed to remove material");
      }

      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error("Error removing material:", error);
    }
  };

  const addMaterial = async (contact) => {
    try {
      // Generate a unique ID using uuid
      contact.id = uuidv4();

      const response = await fetch(
        "https://edts-project-6bae0-default-rtdb.firebaseio.com/materials.json",
        {
          method: "POST",
          body: JSON.stringify(contact),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add material");
      }

      const data = await response.json();

      // Update state with the new material
      setContacts((prevContacts) => [
        ...prevContacts,
        { id: data.name, ...contact },
      ]);
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newMaterialList = contacts.filter((contact) =>
        Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResult(newMaterialList);
    } else {
      setSearchResult(contacts);
    }
  };

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route
            path="/add-material"
            element={
              <AddMaterial
                addContactHandler={addMaterial}
                contacts={contacts}
              />
            }
          />
          <Route
            path="/all-materials"
            element={
              <MaterialList
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                term={searchTerm}
                searchKeyword={searchHandler}
                getContactId={removeMaterial}
              />
            }
          />
          <Route
            path="/all-materials/:id"
            element={<MaterialDetails contacts={contacts} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="*" element={ <NotFound />} /> {/*This will catch any unknown route */}
        </Routes>
      </Layout>
    </>
  );
}

export default App;
