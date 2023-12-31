import React, { useContext, useState,useEffect } from "react";
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
import { Link } from "react-router-dom";
import Error from "./Error";
import { useParams } from 'react-router-dom';
import  {useNavigate} from 'react-router-dom'
import FilteredData from "../components/listing/FilteredData";


const FilteredSearch = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [PropertyPerPage] = useState(4);
  const [advanced, setAdvanced] = useState(false);
  const [liked, setLiked] = useState({});
  const { property_type } = useParams();
  const propertyDetails = useContext(AppContext);
  const [filteredData,setFilteredData] = useState(propertyDetails[0].properties.filter((property) => property.property_type == property_type));
  const [searchValue, setSearchValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState("Property Types");
  const [bathroom, setBathroom] = useState("bathroom");
  const [bedroom, setBedroom] = useState("bedroom");
  const navigate = useNavigate();


  const handleLikeClick = (e, id) => {
    e.preventDefault();
    setLiked((prevLiked) => ({
      ...prevLiked,
      [id]: !prevLiked[id],
    }));
  };

  const indexOfLastProperty = currentPage * PropertyPerPage;
  const indexOfFirstProperty = indexOfLastProperty - PropertyPerPage;
  const currentProperty = filteredData.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

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
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });}
        const property_types = new Set();

 
propertyDetails[0].properties.forEach((property) => {
  property_types.add(property.property_type);
});

  const validproperty_types =   [...property_types]
        const property_typeIsValid = (property_type) => {
            
            return validproperty_types.includes(property_type);
          };
        const isValidproperty_type = property_typeIsValid(property_type);
      
        if (!isValidproperty_type) {
          return <Error />;
        }

        const handleBathroom = (event) => {
          const selectedValue = event.target.value;
          setBathroom(selectedValue);
        
          // Filter the elements within propertyDetails[0].properties
          const filteredProperties = propertyDetails[0].properties.filter((property) => {
            // Check if the property category is not "commercial"
            if (property.category !== 'commercial') {
              // Check if the property has both the selected bedrooms and bathrooms
              const matchesSearch =
                property.unit.bathrooms == selectedValue &&
                (bedroom === 'bedroom' || property.unit.bedrooms == bedroom)&&(property.property_type == property_type); // Only match bathrooms if it's not empty
              return matchesSearch;
            } else {
              // Exclude commercial properties
              return false;
            }
          });
        
          setFilteredData(filteredProperties);
        };
        const handleBedroom = (event) => {
          const selectedValue = event.target.value;
          setBedroom(selectedValue);
        
          // Filter the elements within propertyDetails[0].properties
          const filteredProperties = propertyDetails[0].properties.filter((property) => {
            // Check if the property category is not "commercial"
            if (property.category !== 'commercial') {
              // Check if the property has both the selected bedrooms and bathrooms
              const matchesSearch =
                property.unit.bedrooms == selectedValue &&
                (bathroom === 'bathroom' || property.unit.bathrooms == bathroom) && (property.property_type == property_type); 
              return matchesSearch;
            } else {
              // Exclude commercial properties
              return false;
            }
          });
        
          setFilteredData(filteredProperties);
        };
        

        
        const handleFilter = (event) => {
          const newSearchValue = event.target.value.toLowerCase();
          setSearchValue(newSearchValue);
          setIsActive(newSearchValue.length > 0);
        
          filterProperties(newSearchValue);
        
          console.log(filteredData, "filtered Data");
        };
        
        const filterProperties = (newSearchValue) => {
          const filteredProperties = propertyDetails[0].properties.filter((property) => {
            const matchesSearch =
              property.title.toLowerCase().includes(newSearchValue) ||
              property.location.toLowerCase().includes(newSearchValue) ||
              property.category.toLowerCase().includes(newSearchValue) ||
              property.status.toLowerCase().includes(newSearchValue);
        
            return matchesSearch;
          });
        
          setFilteredData(filteredProperties);
        };
  return (
    <div className="w-full h-[275vh]  md:h-[140vh] flex bg-other text-sm">
      <div className="flex lg:max-w-6xl w-full h-[100%] m-auto rounded p-2 justify-center items-center">
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
          <div className="flex w-full h-[97%] justify-between md:h-[90%]  p-2">
          <FilteredData handleFilter={()=>handleFilter(event)}  handlebedroom={()=>handleBedroom(event)} handlebathroom={()=>handleBathroom(event)} value={value}  bathroom={bathroom} bedroom={bedroom} />
            <div className="flex flex-col w-full md:w-[100%] lg:w-[65%] h-full justify-between p-1 ">
              <div className="flex w-full  p-1 rouded h-[2.5%] md:h-[5%] my-1 justify-between bg-white rounded">
                <span className="items-center p-1 w-[40%] flex">
                  {filteredData.length} results
                </span>
                <div className="justify-center items-center flex w-[60%] ">
                
                  <span
                    onClick={() => setAdvanced(!advanced)}
                    className="mx-2 w-[50%] justify-end items-center ms-auto flex lg:hidden"
                  >
                    <GoFilter size={25} />
                    Filter
                  </span>
                  {advanced && (
                    <div className="w-full  lg:hidden fixed overflow-y-auto  lg:relative top-0 left-0 z-50   h-full flex rounded bg-white">
                      <div className="h-[100%]  lg:mt-0 lg:h-[60%] md:w-[50%] flex flex-col mx-auto ">
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
              <div className="flex w-full flex-col h-[97%] md:h-[95%]">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full h-[100%] md:grid-rows-2 grid-rows-4 lg:gap-1 gap-5 py-2 md:p-2">
                  {currentProperty.map((details, index) => (
                    details.property_type == 'commercial' ?
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
                            {details.property_type}
                          </span>
                            </div>
                           
                          <div className="flex justify-between">
                            <span className="text-white font-medium text-xl">
                             $ {details.price}
                            </span>
                            <span
                              onClick={(e) => handleLikeClick(e, details.id)}
                              className="flex p-1 rounded items-center justify-end  text-xs bg-black/50 text-tertiary"
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
                          <span className="text-sm ms-auto">
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
                    :
                    <Link
                      to={`/kulproperties/propertydetails/${details.slug}`}
                      key={index}
                      className="flex flex-shrink w-[100%] md:w-[95%]  md:h-[90%] h-full   rounded-md flex-col mx-auto md:mx-2"
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
                            {details.property_type}
                          </span>
                            </div>
                          <div className="flex justify-between">
                            <span className="text-white font-medium text-xl">
                             $ {details.unit.price}
                            </span>
                            <span
                              onClick={(e) => handleLikeClick(e, details.id)}
                              className="flex p-1 rounded items-center justify-end  text-xs bg-black/50 text-tertiary"
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
                            {details.unit.bedrooms}Bedrooms
                          </span>
                          <span className="flex items-center">
                            <MdOutlineBathtub size={25} />
                            {details.unit.bathrooms}Bathrooms
                          </span>
                          <span className="flex items-center">
                            <TfiRulerAlt2 size={25} />
                            {details.unit.area}Sq ft
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="w-full flex mx-auto mt-auto md:mt-0 container p-1 m-1">
                  <Pagination
                    PropertyPerPage={PropertyPerPage}
                    totalProperties={filteredData.length}
                    currentPage={currentPage}
                    setPage={setPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilteredSearch;
