  import React, { useState, useContext, useEffect } from "react";
import { Crowdfundingcontext } from "../Context/Crowdfunding";
import "./Hero.css";
import apist from "../Config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
const Hero = () => {
  const { createCampaign, getCampaign } = useContext(Crowdfundingcontext);
  var title = "";
  const [campaign, setCampaign] = useState({
    title: "",
    description: "",
    amount: "",
    deadline: "",
    imageurl: "",
  });
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const imagelistref = ref(apist, "images/");

  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      console.log("image setted");
      setImage(e.target.files[0]);
      document.getElementById("containerform").style.height = `${38}rem`;
    }
  };
  const uploadhandle = async (e) => {
    e.preventDefault();
    if (image == null) return;
    const imageref = ref(apist, `images/${image.name + v4()}`);
    await uploadBytes(imageref, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrl(() => [url]);
        console.log("image uploaded successfully:", url);
        setCampaign((prevCampaign) => ({
          ...prevCampaign,
          imageurl: url,
        }));
      });
    });
  };

  const createNewCampaign = async () => {
    try {
      console.log(campaign.title);
      console.log(campaign.description);
      console.log(campaign.amount);
      console.log(campaign.deadline);
      console.log(campaign.imageurl);

      const date = await createCampaign(campaign);
    } catch (error) {
      console.log("The error occurs in Hero", error);
    }
  };

  useEffect(() => {
    if (campaign.imageurl) {
      createNewCampaign();
    }
  }, [campaign.imageurl]);

  return (
    <div className="containerhero">
      <div className="message">
        <h2 className="h">
          Catalyze Change with AKS
          <br className="" />
          Explore, Donate, Create!
        </h2>
        <p className="">
          Empower Change with AKS! 🚀 Join the decentralized revolution and make
          a difference. Explore ongoing campaigns or create your own to shape
          the future. Your contributions matter. Together, let's build a
          community that thrives on support, innovation, and positive impact.
          Donate to existing campaigns or launch yours today! Every AKS token
          counts towards a brighter tomorrow. Be a catalyst for change. <br />
          #CryptoForGood #AKSCommunity{" "}
        </p>
      </div>
      <div className="containerform" id="containerform">
        <h3 className="">Campaign</h3>
        <form>
          <div className="inputdev">
            <label htmlFor="firstName" className="">
              Title
            </label>
            <input
              onChange={(e) => {
                console.log("E wali value: ", e.target.value);
                setCampaign((preCampaign) => ({
                  ...preCampaign,
                  title: e.target.value,
                }));
                console.log("Updated wali value: ", campaign.title);
              }}
              placeholder="title"
              required
              type="text"
              className="clss"
              name="firstName "
            />
          </div>
          {/* */}
          <div className="inputdev">
            <label htmlFor="lastName" className="">
              Description
            </label>
            <input
              onChange={(e) =>
                setCampaign({
                  ...campaign,
                  description: e.target.value,
                })
              }
              placeholder="description"
              required
              type="text"
              className="clss"
              id="lastName"
              name="lastName"
            />
          </div>
          {/** */}
          <div className="inputdev">
            <label htmlFor="email" style={{ fontSize: "14px !important" }}>
              {" "}
              Target Amount:
            </label>
            <input
              onChange={(e) =>
                setCampaign({
                  ...campaign,
                  amount: e.target.value,
                })
              }
              placeholder="amount"
              required
              type="text"
              className="clss"
              id="email"
              name="email"
            />
          </div>
          {/** */}
          <div className="inputdev ">
            <label htmlFor="firstName" className="">
              Date
            </label>
            <input
              onChange={(e) => {
                console.log(e.target.value);
                setCampaign((preCampaign) => ({
                  ...preCampaign,
                  deadline: e.target.value,
                }));
              }}
              placeholder="Date"
              required
              type="date"
              className="clss"
              id="email"
              name="email "
            />
          </div>
          <div className="inputdev">
            <label htmlFor="Image" className="">
              Picture
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="imagesty"
            />

            {image && (
              <div>
                <p>Selected Image:</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginBottom: "1rem",
                  }}
                />
              </div>
            )}
          </div>
          <div className="buttondev">
            <button
              onClick={(e) => {
                uploadhandle(e);
              }}
              type="submit"
              className=""
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Hero;
