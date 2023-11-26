import React, { useEffect, useState } from 'react';
import "../css/addRestaurant.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '', city: '', area: '', location: '', contactNumber: '',
  averageCostForTwo: '', cuisine: [], types: [], offers: [],
  startTime: '', endTime: '', website: '',
  extraDiscount: [], amenities: [], images: [], menu: [],
};
const MAX_FILE_SIZE_MB = 5; // 5MB in bytes

const AddRestaurant = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ ...initialState });
  const [error, setError] = useState(null);
  const [imageFileNames, setImageFileNames] = useState([]);
  const [menuFileNames, setMenuFileNames] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [amenities, setAmenities] = useState({
    Wifi: false,
    Parking: false,
    AC: false,
    PetsAllowed: false,
    OutdoorSeating: false,
    CardsAccepted: false,
    WalletAccepted: false,
    HomeDelivery: false,
    ValetAvailable: false,
    RoofTop: false,
    FullBarAvailable: false,
    Lift: false,
    SmokingArea: false,
    LivePerformance: false,
    LiveScreening: false,
  });

  const handleAmenitiesChange = (e) => {
    const { name, checked } = e.target;
    setAmenities((prevAmenities) => ({
      ...prevAmenities,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const selectedAmenities = Object.entries(amenities)
      .filter(([_, isSelected]) => isSelected)
      .map(([amenity]) => amenity);
    setFormData((prevData) => ({
      ...prevData,
      amenities: selectedAmenities,
    }));
  }, [amenities]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedFiles = Array.from(files).filter((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024);

    if (selectedFiles.length === files.length) {
      setFormData({ ...formData, images: selectedFiles });
      setImageFileNames(selectedFiles.map((file) => ({ name: file.name })));
    } else {
      window.alert(`Some images exceed ${MAX_FILE_SIZE_MB}MB.`);
    }
  };

  const handleMenuChange = (e) => {
    const files = e.target.files;
    const selectedFiles = Array.from(files).filter((file) => file.size <= MAX_FILE_SIZE_MB * 1024 * 1024);

    if (selectedFiles.length === files.length) {
      setFormData({ ...formData, menu: selectedFiles });
      setMenuFileNames(selectedFiles.map((file) => ({ name: file.name })));
    } else {
      window.alert(`Some files exceed ${MAX_FILE_SIZE_MB}MB.`);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
    setImageFileNames(updatedImages.map((file) => ({ name: file.name })));
  };

  const handleMenuRemove = (index) => {
    const updatedMenu = [...formData.menu];
    updatedMenu.splice(index, 1);
    setFormData({ ...formData, menu: updatedMenu });
    setMenuFileNames(updatedMenu.map((file) => ({ name: file.name })));
  };

  function truncateFileName(fileName, maxLength = 15) {
    if (fileName.length <= maxLength) {
      return fileName;
    } else {
      return fileName.substring(0, maxLength - 3) + '...';
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'openingHours') {
          Object.entries(value).forEach(([timeKey, timeValue]) => {
            formDataToSend.append(`openingHours.${timeKey}`, timeValue);
          });
        } else if (key === 'amenities') {
          value.forEach((amenity) => {
            formDataToSend.append('amenities', amenity);
          });
        } else if (key === 'cuisine') {
          value.forEach((cuisine) => {
            formDataToSend.append('cuisine', cuisine);
          });
        }
        else if (key === 'types') {
          value.forEach((type) => {
            formDataToSend.append('types', type);
          });
        }
        else if (key === 'offers') {
          value.forEach((offer) => {
            formDataToSend.append('offers', offer);
          });
        } else if (key === 'images' || key === 'menu') {
          value.forEach((file) => {
            formDataToSend.append(key, file);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      const res = await fetch('/add-restaurant', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();
      if (res.status === 200) {
        window.alert("Restaurant Added Successfully.");
        setFormData({ ...initialState });
        navigate("/owner-home");
      } else if (res.status === 402 || !data) {
        window.alert("Marked Fields Are Mandatory");
      } else if (res.status === 403) {
        window.alert("Unauthorized Access.");
      } else {
        setError("Failed to add restaurant. Please try again.");
      }
    } catch (error) {
      setError("Failed to add restaurant.");
      console.error(error);
    }
  };

  return (
    <div className="main-content">

      <form onSubmit={handleFormSubmit}>
        <div className='infos'>
          <h2>Register Your Restaurant</h2>
        </div>
        <div className="info">
          {/* Basic Information */}
          <div className="contents">
            <div className='subHeading'>Basic Information<span><small>(mandatory)</small></span></div>
            <div className="resItem">
              <label>Name:</label>
              <input className='resInput' type="text" name="name" placeholder='Rahul Sharma' value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="resItem">
              <label>City:</label>
              <input className='resInput' type="text" name="city" placeholder='Kolkata,Delhi,Mumbai,Chennai,etc.' value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="resItem">
              <label>Area:</label>
              <input className='resInput' type="text" name="area" placeholder='North Kolkata,South Delhi,etc.' value={formData.area} onChange={handleInputChange} required />
            </div>
            <div className="resItem">
              <label>Location:</label>
              <input className='resInput' type="text" name="location" placeholder='Exact Location of the Restaurant.' value={formData.location} onChange={handleInputChange} required />
            </div>
            <div className="resItem">
              <label>Contact Number:</label>
              <input className='resInput' type="text" name="contactNumber" placeholder='+91 98x69x25x4' value={formData.contactNumber} onChange={handleInputChange} required />
            </div>
          </div>
        </div>

        {/* Restaurant Details */}

        <div className="info">
          <div className="contents">
            <div className='subHeading'>Restaurant Details<span><small>(not mandatory)</small></span></div>
            <div className="resItem">
              <div className="">
                <label>Open Hours:</label>
                <input className='resHours' type="text" name="startTime" value={formData.startTime} onChange={handleInputChange} placeholder="Opening Time e.g: 13:00" />
                <span className="separator"> -- </span>
                <input className='resHours' type="text" name="endTime" value={formData.endTime} onChange={handleInputChange} placeholder="Closing Time e.g: 24:00" />
              </div>
            </div>

            <div className="resItem">
              <label>Cuisine:</label>
              <input className='resInput' type="text" name="cuisine" placeholder='Separate by commas (e.g., Chinese, Italian, French,etc.)' value={formData.cuisine.join(',')} onChange={(e) => setFormData({ ...formData, cuisine: e.target.value.split(',') })} />
            </div>
            <div className="resItem">
              <label>Types:</label>
              <input className='resInput' type="text" name="types" placeholder='Separate by commas (e.g., Fine Dining, 5 Star,etc.)' value={formData.types.join(',')} onChange={(e) => setFormData({ ...formData, types: e.target.value.split(',') })} />
            </div>
            <div className="resItem">
              <label>Offers:</label>
              <input className='resInput' type="text" name="offers" placeholder='Separate by commas (e.g., 10% Off, Happy Hour,etc.)' value={formData.offers.join(',')} onChange={(e) => setFormData({ ...formData, offers: e.target.value.split(',') })} />
            </div>
          </div>
        </div>

        {/* Additional Details  */}

        <div className="info">
          <div className="contents">
            <div className='subHeading'>Additional Details<span><small>(not mandatory)</small></span></div>
            <div className="resItem">
              <label>Website:</label>
              <input className='resInput' type="text" name="website" placeholder='www.tasteandflavor.com' value={formData.website} onChange={handleInputChange} />
            </div>
            <div className="resItem">
              <label>Average Cost for Two:</label>
              <input className='resInput' type="number" name="averageCostForTwo" placeholder='1320 (Numbers Only)' value={formData.averageCostForTwo} onChange={handleInputChange} />
            </div>
            <div className="resItem">
              <label>Extra Discount:</label>
              <input className='resInput' type="text" name="extraDiscount" placeholder='Separate by commas (e.g., 20% Off on total bill,etc.)' value={formData.extraDiscount.join(',')} onChange={(e) => setFormData({ ...formData, extraDiscount: e.target.value.split(',') })} />
              <small></small>
            </div>
            <div className="resItem">
              <label>Amenities:</label>
              <div className="amenities-input">
                <input className='resCheck' type="checkbox" id="Wifi" name="Wifi" checked={amenities.Wifi} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="Wifi">Wifi</label>

                <input className='resCheck' type="checkbox" id="Parking" name="Parking" checked={amenities.Parking} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="Parking">Parking</label>

                <input className='resCheck' type="checkbox" id="AC" name="AC" checked={amenities.AC} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="AC">Air Conditioning</label>

                <input className='resCheck' type="checkbox" id="PetsAllowed" name="PetsAllowed" checked={amenities.PetsAllowed} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="PetsAllowed">Pets Allowed</label>

                <input className='resCheck' type="checkbox" id="OutdoorSeating" name="OutdoorSeating" checked={amenities.OutdoorSeating} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="OutdoorSeating">Outdoor Seating</label>
              </div>
              <div className="amenities-input">
                <input className='resCheck' type="checkbox" id="CardsAccepted" name="CardsAccepted" checked={amenities.CardsAccepted} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="CardsAccepted">Cards Accepted</label>

                <input className='resCheck' type="checkbox" id="WalletAccepted" name="WalletAccepted" checked={amenities.WalletAccepted} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="WalletAccepted">Wallet Accepted</label>

                <input className='resCheck' type="checkbox" id="HomeDelivery" name="HomeDelivery" checked={amenities.HomeDelivery} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="HomeDelivery">Home Delivery</label>

                <input className='resCheck' type="checkbox" id="ValetAvailable" name="ValetAvailable" checked={amenities.ValetAvailable} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="ValetAvailable">Valet Available</label>

                <input className='resCheck' type="checkbox" id="RoofTop" name="RoofTop" checked={amenities.RoofTop} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="RoofTop">Roof Top</label>
              </div>
              <div className="amenities-input">
                <input className='resCheck' type="checkbox" id="FullBarAvailable" name="FullBarAvailable" checked={amenities.FullBarAvailable} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="FullBarAvailable">Full Bar Available</label>

                <input className='resCheck' type="checkbox" id="Lift" name="Lift" checked={amenities.Lift} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="Lift">Lift</label>

                <input className='resCheck' type="checkbox" id="SmokingArea" name="SmokingArea" checked={amenities.SmokingArea} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="SmokingArea">Smoking Area</label>

                <input className='resCheck' type="checkbox" id="LivePerformance" name="LivePerformance" checked={amenities.LivePerformance} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="LivePerformance">Live Performance</label>

                <input className='resCheck' type="checkbox" id="LiveScreening" name="LiveScreening" checked={amenities.LiveScreening} onChange={handleAmenitiesChange} />
                <label className='resCheckElement' htmlFor="LiveScreening">Live Screening</label>
              </div>
            </div>
          </div>
        </div>

        {/* Images and Menu  */}

        <div className="info">
          <div className="contents">
            <div className='subHeading'>Images and Menu<span><small>(not mandatory)</small></span></div>
            <div className="resItem">
              <label>Images:</label>
              <input className='resFile' type="file" name="images" accept="image/*" onChange={handleImageChange} multiple />
              <div className='resImages'>
                {imageFileNames.map((item, index) => (
                  <div className='resImage' key={index}>
                    <p>{truncateFileName(item.name)}</p>
                    <div className='resImageRemove' onClick={() => handleImageRemove(index)}><RiDeleteBin6Line /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="resItem">
              <label>Menu:</label>
              <input className='resFile' type="file" name="menu" accept="image/*" onChange={handleMenuChange} multiple />
              <div className='resImages'>
                {menuFileNames.map((item, index) => (
                  <div className='resImage' key={index}>
                    <p>{truncateFileName(item.name)}</p>
                    <div className='resImageRemove' onClick={() => handleMenuRemove(index)}><RiDeleteBin6Line /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          {error && <div className="error-message">{error}</div>}
          <button className='resButton button' type="submit">Add Restaurant</button>
        </div>
      </form>
    </div>
  );


};

export default AddRestaurant;
