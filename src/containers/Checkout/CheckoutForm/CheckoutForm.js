import React, { useState,useEffect } from "react";

const CheckoutForm = (props) => {
  const { loading,addressSubmit ,authAddress } = props;

  useEffect(() => {
    if(authAddress!==null){
     setName(authAddress.name)
     setAddress(authAddress.address)
     setCity(authAddress.city)
     setDistrict(authAddress.district)
     setPostcode(authAddress.postcode)
     setPhone(authAddress.phone)
    }
    
  }, [authAddress])

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [phone, setPhone] = useState("");
 

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data ={
      name:name,
      address:address,
      district:district,
      city:city,
      postcode:postcode,
      phone:phone
    }
    addressSubmit(data)

  };

  return (
    <form className="row container " onSubmit={onSubmitHandler}>
      <div className="col-12 mb-2">
        <label htmlFor="Name" className="form-label">
          NAME
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          id="Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col-12 mb-2">
        <label htmlFor="Address" className="form-label">
          ADDRESS
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          id="Address"
          required
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mb-2">
        <label htmlFor="District" className="form-label">
          DISTRICT
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="District"
          id="District"
          required
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mb-2">
        <label htmlFor="City" className="form-label">
          CITY
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="City"
          id="City"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mb-2">
        <label htmlFor="Postcode" className="form-label">
          POSTCODE
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Postcode"
          id="Postcode"
          required
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
      </div>
      <div className="col-sm-12 col-md-6 mb-2">
        <label htmlFor="phone" className="form-label">
          PHONE NUMBER
        </label>
        <div className="input-group">
          <span className="input-group-text">+66</span>
          <input
            type="number"
            className="form-control"
            id="phone"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      {props.children}
      <div className="col-12 mt-3 mb-4 d-flex justify-content-end">
        <button
          className="btn btn-success w-50"
          type="submit"
          disabled={loading}
        >
          {!loading ? (
            "CONFIRM"
          ) : (
            <>
              loading ...
              <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden"></span>
              </div>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
