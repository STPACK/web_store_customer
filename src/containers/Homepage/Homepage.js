import React from "react";
import Carousels from "../../components/Carousels/Carousels";
import SubBlog from './SubBlog/SubBlog';

const Homepage = () => {
  return (
    <>
      <Carousels />
      <div className="container">
      <SubBlog/>

      <div className="row">
          <div className="col-12 col-sm-6 col-md-3">
              <div className="card">
                  <img src={process.env.PUBLIC_URL + "/astrophytum.jpg"} alt=""/>
                  <div className="card-img-overlay d-flex justify-content-center  ">
                  <button className="btn btn-outline-light"><h5>Astro</h5></button>
                  </div>
              </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
              <div className="card">
              <img src={process.env.PUBLIC_URL + "/gymno.jpg"} alt=""/>
              <div className="card-img-overlay d-flex justify-content-center  ">
                  <button className="btn btn-outline-light"><h5>Gymno</h5></button>
                  </div>
              </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
              <div className="card">
              <img src={process.env.PUBLIC_URL + "/mammillaria.jpg"} alt=""/>
              <div className="card-img-overlay d-flex justify-content-center  ">
                  <button className="btn btn-outline-light"><h5>Mammillaria</h5></button>
                  </div>
              </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
              <div className="card">
              <img src={process.env.PUBLIC_URL + "/oldMan.jpg"} alt=""/>
                  <div className="card-img-overlay d-flex justify-content-center  ">
                      
                      <button className="btn btn-outline-light "><h5>oldMan</h5></button>

                     
                  </div>
              </div>
          </div>
      </div>
      </div>
    </>
  );
};

export default Homepage;
