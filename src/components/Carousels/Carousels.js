import React from "react";
import { useHistory } from "react-router-dom";

const Carousels = () => {
  const history = useHistory();
  return (
    <>
      <div
        className=" carousel carousel-dark  slide carousel-fade "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner mt-3">
          <div className="carousel-item active">
            <img
              src={process.env.PUBLIC_URL + "/cactusCover1.jpg"}
              className="d-block w-100"
              alt="cactus1"
            />
            <div className="carousel-caption ">
              <h3 className="text-dark d-none d-md-block">Making beautiful Cactus</h3>
              <h4 className="text-dark d-none d-md-block">a part of your life.</h4>
              <button
                className="btn btn-success"
                onClick={() => history.push("/products")}
              >
                {" "}
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={process.env.PUBLIC_URL + "/cactusCover2.jpg"}
              className="d-block w-100"
              alt="cactus2"
            />
            <div className="carousel-caption ">
             
            <h3 className="text-dark d-none d-md-block">Making beautiful Cactus</h3>
              <h4 className="text-dark d-none d-md-block">a part of your life.</h4>
              <button
                className="btn btn-success"
                onClick={() => history.push("/products")}
              >
                {" "}
                SHOP NOW
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousels;
