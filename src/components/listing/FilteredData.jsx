import React, { useState, useContext, useEffect } from "react";
import FormInput from "../../login/form/FormInput";
// import FilterInput from "../../login/form/FilterInput";
// import FilterLocation from "../../login/form/FilterLocation";
import { AppContext } from "../../App";
import MinValue from "../../login/form/MInValue";
import MaxValue from "../../login/form/MaxValue";

const FilteredData = ({
  // handleFilter,
  handleChange,
  // handlebathroom,
  handleAmenityChange,
  // handlebedroom,
  value,
  // bathroom,
  // bedroom,
}) => {
  const propertyDetails = useContext(AppContext);
  const [filteredData, setFIlteredData] = useState(propertyDetails);
  const [isActive, setIsActive] = useState(false);
  const [year, setYear] = useState("year");
  const [searchValue, setSearchValue] = useState("");

  const handleyear = (event) => {
    setYear(event.target.value);
    setIsActive(event.target.value.length > 0);
  };

  const years = [1999, 2000, 2001, 2002, 2005, 2010, 2019];

  const propertyTypes = new Set();

  const bedrooms = new Set();
  const bathrooms = new Set();
  const amenities = new Set();
  const categories = new Set();
  const features = new Set();
  const prices = new Set();

  propertyDetails[0].properties.forEach((property) => {
    prices.add(property.price);
    if (property.unit && property.unit.price !== undefined) {
      prices.add(property.unit.price);
    }
  });
  propertyDetails[0].properties.map((property) => {
    property.features.map((feature) => {
      features.add(feature);
    });
  });

  propertyDetails[0].properties.forEach((property) => {
    property.amenities.forEach((amenity) => {
      amenities.add(amenity);
    });
  });
  propertyDetails[0].properties.forEach((property) => {
    if (property.property_type !== undefined && property.category == "commercial") {
      propertyTypes.add(property.property_type);
    }
  });
  propertyDetails[0].properties.forEach((property) => {
    if (property.categories !== undefined) {
      categories.add(property.categories);
    }
  });

  propertyDetails[0].properties.forEach((property) => {
    if (property.unit && property.unit.bedrooms !== undefined) {
      bedrooms.add(property.unit.bedrooms);
    }
  });

  propertyDetails[0].properties.forEach((property) => {
    if (property.unit && property.unit.bathrooms !== undefined) {
      bathrooms.add(property.unit.bathrooms);
    }
  });

  const uniquePropertyTypes = [...propertyTypes];
  const uniqueAmenities = [...amenities];
  const uniqueFeatures = [...features];

  const uniquePrices = [...prices].sort((a, b) => a - b);
  const lowestPrice = uniquePrices[0];

  useEffect(() => {
    console.log(searchValue);
  }, [searchValue]);

  return (
    <div className="hidden lg:flex flex-col w-full  md:w-[45%] lg:w-[32%] h-full ">
      <div className="flex w-full rounded p-2 h-full">
        <form action="" className="bg-white h-[90%] py-4 w-full rounded">
           
          <div className="flex w-full  justify-center">
            <select
              value={value}
              onChange={handleChange}
              className={`p-2 rounded m-1 md:mx-2 w-[85%] border ${
                value
                  ? "Property Types"
                  : value
                  ? "border-primary"
                  : "border-gray-300"
              } focus:outline-none focus:border-primary bg-transparent`}
            >
              <option
                className="items-center justify-center"
                value="Property Types"
              >
               {value==value? "Property Types" : value}
              </option>
              {uniquePropertyTypes.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

       

          <div className="flex w-full p-2  justify-center">
            <MinValue
              value={lowestPrice}
              disabled={true}
              placeholder={"Min Price"}
              type={"number"}
            />
            <MaxValue placeholder={"Max Price"} type={"number"} />
          </div>
          <div className="flex w-full p-2  justify-center">
            <FormInput placeholder={"Min Area"} type={"number"} />
            <FormInput placeholder={"Max Area"} type={"number"} />
          </div>
          <div className="flex w-full overflow-hidden justify-center">
            <div className="flex-col w-full md:w-[80%] p-2 md:p-0  justify-center items-center  flex">
              <div className=" w-full flex flex-col h-[100%] rounded  p-2 ">
              <div className="w-full flex">
  <span className="text-lg text-primary font-medium md:m-2 md:my-4">
    Features
  </span>
</div>

<div className="grid w-full h-[100%] grid-cols-2 grid-rows-6 gap-2 p-1">
  {uniqueFeatures.map((item, i) => (
    <div key={i} className="flex text-primary/50 items-center text-sm">
      <input
        className="w-5 h-5 mx-2"
        type="checkbox"
        value={item}
        onChange={handleAmenityChange}
      />
      <label htmlFor="">{item}</label>
    </div>
  ))}
</div>

<div className="w-full flex">
  <span className="text-lg text-primary font-medium md:m-2 md:my-4">
    Amenities
  </span>
</div>

<div className="grid w-full h-[100%] grid-cols-2 grid-rows-6 gap-2 p-1">
  {uniqueAmenities.map((item, i) => (
    <div key={i} className="flex text-primary/50 items-center text-sm">
      <input
        className="w-5 h-5 mx-2"
        type="checkbox"
        value={item}
        onChange={handleAmenityChange}
      />
      <label htmlFor="">{item}</label>
    </div>
  ))}
</div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilteredData;
