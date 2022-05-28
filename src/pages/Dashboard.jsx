import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";

import Layout from "../components/Layout";

export default function Home() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  // const data = useSelector((state) => state.data);

  const businessNameInputRef = useRef();
  const companyNameInputRef = useRef();

  async function createService() {
    var business = businessNameInputRef.current.value;
    var company_name = companyNameInputRef.current.value;

    console.log(business, company_name);

    const receipt = await blockchain.serviceNFTToken.methods
      .createNFT(business, company_name)
      .send({
        from: blockchain.account,
        value: blockchain.web3.utils.toWei("0.01", "ether"),
      });
    console.log(receipt);
  }

  useEffect(() => {
    console.log("account", blockchain.account);
    console.log("contract", blockchain.serviceNFTToken);
    if (blockchain.account !== "" && blockchain.serviceNFTToken !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain]);

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
          <h1 className="mb-4 text-white fw-bold">Dashboard</h1>
          <div className="d-flex justify-content-start align-items-start">
          </div>
        </div>

        <hr className="text-secondary" />

        <form>
          <h4 className="fw-bold text-white">Create your Business Listing</h4>
          <div className="form-group   my-4">
            <label htmlFor="inputName" className="text-secondary">
              Service
            </label>
            <input
              ref={businessNameInputRef}
              type="text"
              className="p-3 d-flex bg-dark w-100 text-white rounded focus-none"
              placeholder="Web Development"
            />
          </div>

          <div className="form-group   my-4">
            <label htmlFor="inputName" className="text-secondary">
              Company Name
            </label>
            <input
              ref={companyNameInputRef}
              type="text"
              className="p-3 d-flex bg-dark w-100 text-white  rounded focus-none"
              style={{ width: "100%" }}
              placeholder="Simera Web Solutions"
            />
          </div>

          <div
            onClick={() => createService()}
            className="mt-5 btn d-block btn-lg fw-bold btn-primary p-3"
          >
            Create Service & Proceed ✅
          </div>
        </form>
      </div>
    </Layout>
  );
}
