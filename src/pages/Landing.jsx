import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import { useHistory } from "react-router-dom";

export default function Landing() {
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <section>
      <div
        className="container d-flex align-items-center justify-content-center flex-column"
        style={{ minHeight: "85vh" }}
      >
        <h1
          style={{ fontSize: "5rem" }}
          className="text-black bg-success container text-center p-5 "
        >
          <strong className="ms-3">DeListing</strong>&trade;
        </h1>
        <p className="bg-primary text-white no-select shadow container text-center px-3 py-2">
          A web3 <strong> business directory</strong> with NFT based business
          ranking.
        </p>

        <p
          style={{ fontSize: "2rem" }}
          className="text-white container text-center p-2 mt-5"
        >
          Hello there! Sign in below to get started.
        </p>
        <button
          className="h1 text-white p-3 rounded-3 btn btn-dark mt-3 fw-bold shadow"
          onClick={(e) => {
            e.preventDefault();
            dispatch(connect());
            history.push('/dashboard');
          }}
        >
          CONNECT WITH METAMASK{" "}
          <img
            src="/images/metamask.png"
            className="ps-3"
            height="50px"
            alt=""
            srcset=""
          />
        </button>
      </div>

      <hr className="text-secondary" />
      <p
        style={{ fontSize: "0.9rem" }}
        className="text-secondary text-center p-2 mb-3"
      >
        Developed by{" "}
        {/* <a
          href="""
          className="font-weight-bold text-success text-decoration-none"
        >
          Star Labs
        </a> */}
      </p>
    </section>
  );
}
