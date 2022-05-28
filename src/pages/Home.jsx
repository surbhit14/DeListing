import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";

import Layout from "../components/Layout";

export default function Home() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);

  console.log(data);

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.serviceNFTToken !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain, dispatch]);

  return blockchain.account === "" || blockchain.serviceNFTToken === null ? (
    <Layout>
      <div
        style={{ height: "60vh" }}
        className="d-flex  justify-content-center align-items-center"
      >

        <hr className="text-primary" />
        {blockchain.errorMsg !== "" ? <div>{blockchain.errorMsg}</div> : null}
      </div>
    </Layout>
  ) : (
    <Layout>
      <div className="container mt-5 text-secondary">
        <div className="mt-3 text-start">
          <h1 className="mb-4 text-white fw-bold">Find Services</h1>
          <div className="d-flex justify-content-start align-items-start">
            {["Web Development", "Catering", "Plumbing"].map((item, key) => (
              <div
                key={key}
                className="card card-body bg-dark rounded me-md-3  p-4 pb-2"
              >
                <h3 className="text-white">{item}</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                  maiores molestiae quibusdam aliquid laborum at obcaecati
                  nihil? Expedita officiis voluptatem porro, molestias magnam
                  culpa at ratione, consectetur, nisi nihil nostrum.
                </p>

                <button className="btn text-success text-end">
                  {"Find Businesses >> "}
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr className="text-secondary" />

        <section>
          <div className="form-group my-4">
            <label htmlFor="inputName" className="text-secondary">
              Search
            </label>
            <input
              type="text"
              className="p-3 d-flex bg-dark w-100 text-white  rounded focus-none"
              id="inputName"
              placeholder="Catering, Plumbing, Web Development, etc"
            />
          </div>

          {data.loading ? (
            <div className="d-flex align-items-center">
              <strong>Loading...</strong>
              <div
                className="spinner-border ms-auto"
                role="status"
                ariaHidden="true"
              ></div>
            </div>
          ) : (
            data.allServiceNFTs.map((service) => (
              <div className="d-flex">
                <div>
                  <img src="/images/webdev.jpg" width="150px" alt="" />
                  <div className="btn btn-sm btn-success text-dark d-block fw-bold">
                    {service.rarity}
                  </div>
                </div>
                <a
                  href="/service"
                  className="list-group-item list-group-item-action bg-dark text-white"
                  aria-current="true"
                >
                  <div className="d-flex w-100 mt-4 justify-content-between">
                    <h5 className="mb-1 fw-bold">{service.company_name}</h5>
                    <small className="text-success">
                      Rank #{service.rarity}
                    </small>
                  </div>
                  <p className="mb-1 fw-normal text-secondary">
                    {service.business}
                  </p>
                  <small className="fw-normal">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Asperiores vel id deleniti possimus perspiciatis. Quisquam
                    fuga aut rerum, ipsam praesentium illum numquam dicta
                    tempora, est, sunt necessitatibus quaerat ipsum sit.
                  </small>
                </a>
              </div>
            ))
          )}
        </section>
      </div>
    </Layout>
  );
}
