import React, { useContext, useState, useEffect } from "react";
import { FiGrid } from "react-icons/fi";
import { TiThListOutline } from "react-icons/ti";
import { CiLocationOn } from "react-icons/ci";
import { BiBed } from "react-icons/bi";
import { MdOutlineBathtub } from "react-icons/md";
import { TfiRulerAlt2 } from "react-icons/tfi";
import Pagination from "../features/Pagination";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { GoFilter } from "react-icons/go";
import MobileFilter from "../components/listing/MobileFilter";
import ListingFilter from "../components/listing/ListingFilter";
import { AiOutlineClose } from "react-icons/ai";
import { AppContext } from "../App";
import { Link, useSearchParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Axios from "axios";
// import useFetchData from "../hooks/useFetchData";
import { BarLoader } from "react-spinners";
import FilteredData from "../components/listing/FilteredData";
// import {useSearchParams} from 'react-router-dom'

const RentalListing = () => {
  const propertyDetails = useContext(AppContext);

  // console.log(propertyDetails,"this is are the details")
  // const [properties, setProperties] = useState([]);
  // const [filteredData, setFilteredData] = useState(localStorage.getItem("cachedData") || null);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [PropertyPerPage] = useState(4);
  const [advanced, setAdvanced] = useState(false);
  const [liked, setLiked] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const initialSearchParams = new URLSearchParams();
  const initialBedroomParams = new URLSearchParams();
  const initialBathroomParams = new URLSearchParams();
  initialBedroomParams.set("br", 0);
  initialBathroomParams.set("bt", 0);
  initialSearchParams.set("property type", "Property Types");
  const [category, setCategory] = useSearchParams();
  const [value, setValue] = useSearchParams(initialSearchParams);
  const [bathroom, setBathroom] = useSearchParams(initialBathroomParams);
  const [bedroom, setBedroom] = useSearchParams(initialBedroomParams);
  const [checkedItems, setCheckedItems] = useState({}); // State to track checked items
  const [isLoading] = useState(false);
  const selectedProperty = value.get("property type");
  const selectedCategory = category.get("category");
  const selectedBathroom = bathroom.get("bt");
  const selectedBedroom = bedroom.get("br");
  console.log(selectedCategory, "selected category");

  // useEffect(() => {
  //   const cachedData = localStorage.getItem("cachedData");

  //   if (cachedData) {
  //     setProperties(JSON.parse(cachedData));
  //   } else {
  //     Axios.get(
  //       "https://kulproperties-73b1dd21a039.herokuapp.com/api/properties"
  //     )
  //       .then((response) => {
  //         const fetchedData = response.data;

  //         localStorage.setItem("cachedData", JSON.stringify(fetchedData));

  //         setProperties(fetchedData);
  //         // console.log(fetchedData,"fetched Data");
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }
  // }, []);
  // console.log(properties, "this are properties in the listing");
  const properties = propertyDetails[0].properties;

  // const navigate = useNavigate();

  // console.log(properties,"filteredData")
  // const filteredData = properties.filter((property)=>{
  //   return property.property_type == selectedProperty || property.bedrooms == selectedBedroom
  // })
  const filteredData = properties.filter((property) => {
    // Check if the property category is 'residential'
    if (
      property.category === selectedCategory &&
      selectedCategory === "residential"
    ) {
      // Check if the property matches the selected criteria
      const matchesPropertyType =
        selectedProperty === "Property Types" ||
        property.property_type === selectedProperty;

      const matchesBedroom =
        selectedBedroom === "Bedrooms" || property.bedrooms == selectedBedroom;

      const matchesBathroom =
        selectedBathroom === "Bathrooms" ||
        property.bathrooms == selectedBathroom;

      // Return true if the property matches all selected criteria
      return matchesPropertyType && matchesBedroom && matchesBathroom;
    } else {
      // For non-residential properties, return false to exclude them from the filtered results
      const matchesPropertyType =
        selectedProperty === "Property Types" ||
        property.property_type === selectedProperty;

      return matchesPropertyType;
    }
  });

  console.log(filteredData, "data after filtration");

  const handleLikeClick = (e, id) => {
    e.preventDefault();
    setLiked((prevLiked) => ({
      ...prevLiked,
      [id]: !prevLiked[id],
    }));
  };

  const setPage = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth',
  //   });}
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    console.log(selectedProperty, "selected property");
    if (selectedValue.length === 0) {
      value.delete("property type");
    } else {
      value.set("property type", selectedValue);
    }
    setValue(value, {
      replace: true,
    });
    setIsActive(selectedValue.length > 0);
    console.log(selectedValue);
  };

  // console.log(selectedBathrooms,"selected bathroom")
  const handleBathroom = (event) => {
    const selectedValue = event.target.value;

    if (!isNaN(selectedValue)) {
      value.delete("bt"); // Remove the 'bathroom' query parameter
      value.set("bt", selectedValue); // Set the 'bathroom' query parameter with the selected value
      setBathroom(value, {
        replace: true,
      });
    } else {
      value.delete("bt"); // Remove the 'bathroom' query parameter
      setBathroom(value, {
        replace: true,
      });
    }
  };

  const handleBedroom = (event) => {
    const selectedBathroom = event.target.value;

    if (!isNaN(selectedBathroom)) {
      bedroom.delete("br"); // Remove the 'bedroom' query parameter
      bedroom.set("br", selectedBathroom); // Set the 'bedroom' query parameter with the selected value
      setBedroom(bedroom, {
        replace: true,
      });
    } else {
      bedroom.delete("br"); // Remove the 'bedroom' query parameter
      setBedroom(bedroom, {
        replace: true,
      });
    }
  };

  const handleCheckboxChange = (event, itemName) => {
    const { checked } = event.target;

    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemName]: checked,
    }));

    if (checked) {
      console.log(`${itemName} is checked`);
    } else {
      console.log(`${itemName} is unchecked`);
    }
  };

  const handleFilter = (event) => {
    const newSearchValue = event.target.value.toLowerCase();
    setSearchValue(newSearchValue);
    setIsActive(newSearchValue.length > 0);

    console.log(filteredData, "filtered Data");
  };

  const handleAmenityChange = (event) => {
    const amenity = event.target.value;

    if (event.target.checked) {
      setSelectedAmenities((prevAmenities) => [...prevAmenities, amenity]);
    } else {
      setSelectedAmenities((prevAmenities) =>
        prevAmenities.filter((item) => item !== amenity)
      );
    }
  };

  useEffect(() => {
    console.log(selectedAmenities);
  }, [selectedAmenities]);

  useEffect(() => {
    console.log(searchValue);
    console.log(filteredData);
  }, [searchValue]);
  const commercialProperties = filteredData.filter(
    (property) => property.category === "commercial"
  );
  const residentialProperties = filteredData.filter(
    (property) => property.category === "residential"
  );

  console.log(commercialProperties, "this concreete");
  const indexOfLastProperty = currentPage * PropertyPerPage;
  const indexOfFirstProperty = indexOfLastProperty - PropertyPerPage;
  let currentProperty = [];
  let data =
    selectedCategory == "commercial"
      ? commercialProperties
      : residentialProperties;

  if (filteredData && filteredData.length > 0) {
    currentProperty = data.slice(indexOfFirstProperty, indexOfLastProperty);
  } else {
  }

  return (
    <div className="w-full h-[265vh]  md:h-[140vh] flex bg-other text-sm">
      <div className="flex md:max-w-6xl w-full h-[100%] m-auto rounded p-2 justify-center items-center">
        <div className=" w-full flex flex-col  h-[95%] mt-auto m-auto  justify-between">
          <div className="flex w-full h-[3%] md:h-[10%] p-2">
            <div className="flex w-full  justify-between mt-auto">
              <span className="text-3xl justify-center font-medium">
                Property List
              </span>
              <div className="flex justify-center m-2">
                <span className="mx-1">
                  <FiGrid size={25} />
                </span>
                <span className="mx-1">
                  <TiThListOutline size={25} />
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full h-[97%] md:h-[90%]  p-2">
            {selectedCategory === "residential" ? (
              <ListingFilter
                handleFilter={() => handleFilter(event)}
                handleChange={() => handleChange(event)}
                handleAmenityChange={() => handleAmenityChange(event)}
                selectedAmenities={selectedAmenities}
                handlebedroom={() => handleBedroom(event)}
                handlebathroom={() => handleBathroom(event)}
                value={selectedProperty}
                checkedItems={checkedItems}
                bathroom={selectedBathroom}
                bedroom={selectedBedroom}
              />
            ) : (
              <FilteredData
                handleFilter={() => handleFilter(event)}
                handleChange={() => handleChange(event)}
                handleAmenityChange={() => handleAmenityChange(event)}
                selectedAmenities={selectedAmenities}
                value={selectedProperty}
                checkedItems={checkedItems}
              />
            )}

            <div className="flex flex-col w-full md:w-[65%] h-full justify-between p-1 ">
              <div className="flex w-full  p-1 rouded h-[2.5%] md:h-[5%] my-1 justify-between bg-white rounded">
                <span className="items-center p-1 w-[40%] flex">
                  {data.length} results
                </span>
                <div className="justify-center items-center flex w-[60%] ">
                  <span
                    onClick={() => setAdvanced(!advanced)}
                    className="mx-2 w-[50%] justify-end items-center ms-auto flex md:hidden"
                  >
                    <GoFilter size={25} />
                    Filter
                  </span>
                  {advanced && (
                    <div className="w-full md:hidden fixed overflow-y-auto  md:relative top-0 left-0 z-50   h-full flex rounded bg-white">
                      <div className="h-[100%]  md:mt-0 md:h-[60%] ">
                        <div className="flex">
                          <span
                            onClick={() => setAdvanced(false)}
                            className="m-2  mx-auto p-1"
                          >
                            <AiOutlineClose size={25} />
                          </span>
                        </div>
                        <MobileFilter />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <section className="flex w-full flex-col h-[97%] md:h-[95%]">
                {isLoading ? (
                  <BarLoader />
                ) : filteredData.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[100%] md:grid-rows-2 grid-rows-4 md:gap-1 gap-5 py-2 md:p-2">
                    {currentProperty.map((details, index) =>
                      details.category == "commercial" ? (
                        <Link
                          to={`/kulproperties/propertydetails/${details.slug}`}
                          key={index}
                          className="flex flex-shrink w-[100%] md:w-[95%]  md:h-[90%]    rounded-md flex-col mx-auto md:mx-2"
                        >
                          <div
                            key={index}
                            className="flex w-full h-[60%]  rounded-t-md bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${details.cover_image})`,
                            }}
                          >
                            <div
                              className="flex flex-col p-2 w-full h-full justify-between"
                              style={{
                                background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(0,0,0,0.3))`,
                              }}
                            >
                              <div className="flex justify-between w-full">
                                <span className="rounded p-1 w-[23%] text-base justify-center bg-red-500 text-white flex">
                                  {details.status}
                                </span>
                                <span className="rounded p-1 w-[23%] text-xs items-center justify-center bg-primary text-white flex">
                                  {details.category}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white font-medium text-xl">
                                  $ {details.price}
                                </span>
                                <span
                                  onClick={(e) =>
                                    handleLikeClick(e, details.id)
                                  }
                                  className="flex w-[50%] items-center justify-end text-tertiary"
                                >
                                  {!liked[details.id] ? (
                                    <AiOutlineHeart size={29} />
                                  ) : (
                                    <FcLike size={29} />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col bg-white w-full rounded-b-md h-[50%] p-2 md:p-4">
                            <span className="items-center  flex justify-between text-base text-red-500">
                              {details.property_type}
                              <span className="text-sm">
                                {liked[details.id]
                                  ? details.likes + 1
                                  : details.likes}
                                {details.likes == 1 ? (
                                  <span>like</span>
                                ) : (
                                  <span>likes</span>
                                )}
                              </span>
                            </span>
                            <span className="items-center  flex text-base font-medium">
                              {details.title}
                            </span>
                            <div className="flex items-center">
                              <span>
                                <CiLocationOn size={20} />
                              </span>
                              <span className="ms-1">{details.location}</span>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 py-2">
                              <span className="flex items-center">
                                <TfiRulerAlt2 size={25} />
                                {details.area}Sq ft
                              </span>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <Link
                          to={`/kulproperties/propertydetails/${details.slug}`}
                          key={index}
                          className="flex flex-shrink w-[100%] md:w-[95%]  md:h-[90%]    rounded-md flex-col mx-auto md:mx-2"
                        >
                          <div
                            key={index}
                            className="flex w-full h-[60%]  rounded-t-md bg-cover bg-center bg-no-repeat"
                            style={{
                              backgroundImage: `url(${details.cover_image})`,
                            }}
                          >
                            <div
                              className="flex flex-col p-2 w-full h-full justify-between"
                              style={{
                                background: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(0,0,0,0.3))`,
                              }}
                            >
                              <div className="flex justify-between w-full">
                                <span className="rounded p-1 w-[23%] text-base justify-center bg-red-500 text-white flex">
                                  {details.status}
                                </span>
                                <span className="rounded p-1 w-[23%] text-xs items-center justify-center bg-primary text-white flex">
                                  {details.category}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white font-medium text-xl">
                                  $ {details.price}
                                </span>
                                <span
                                  onClick={(e) =>
                                    handleLikeClick(e, details.id)
                                  }
                                  className="flex w-[50%] items-center justify-end text-tertiary"
                                >
                                  {!liked[details.id] ? (
                                    <AiOutlineHeart size={29} />
                                  ) : (
                                    <FcLike size={29} />
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col bg-white w-full rounded-b-md h-[50%] p-2 md:p-4">
                            <span className="items-center  flex justify-between text-base text-red-500">
                              {details.property_type}
                              <span className="text-sm">
                                {liked[details.id]
                                  ? details.likes + 1
                                  : details.likes}
                                {details.likes == 1 ? (
                                  <span>like</span>
                                ) : (
                                  <span>likes</span>
                                )}
                              </span>
                            </span>
                            <span className="items-center  flex text-base font-medium">
                              {details.title}
                            </span>
                            <div className="flex items-center">
                              <span>
                                <CiLocationOn size={20} />
                              </span>
                              <span className="ms-1">{details.location}</span>
                            </div>
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 py-2">
                              <span className="flex items-center">
                                <BiBed size={25} />
                                {details.bedrooms}Bedrooms
                              </span>
                              <span className="flex items-center">
                                <MdOutlineBathtub size={25} />
                                {details.bathrooms}Bathrooms
                              </span>
                              <span className="flex items-center">
                                <TfiRulerAlt2 size={25} />
                                {details.area}Sq ft
                              </span>
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                ) : (
                  <div>
                    {selectedCategory == "residential" ? (
                      <span>
                        Sorry a {selectedCategory}{" "}
                        {selectedProperty === null
                          ? "Property Type"
                          : selectedProperty}{" "}
                        with {selectedBathroom === null ? 0 : selectedBathroom}{" "}
                        Bathrooms and{" "}
                        {selectedBedroom === null ? 0 : selectedBedroom}{" "}
                        Bedrooms is not available{" "}
                      </span>
                    ) : (
                      <span>not found</span>
                    )}
                  </div>
                )}
                <div className="w-full flex mx-auto mt-auto md:mt-0 container p-1 m-1">
                  <Pagination
                    PropertyPerPage={PropertyPerPage}
                    totalProperties={data.length}
                    currentPage={currentPage}
                    setPage={setPage}
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalListing;
