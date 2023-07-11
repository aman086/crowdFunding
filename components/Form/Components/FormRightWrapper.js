import styled from "styled-components";
import { FormState } from "../Form";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { create as IPFSHTTPClient } from "ipfs-http-client";
import FormLeftWrapper from "./FormLeftWrapper";
import axios from "axios";

// const pinataApiKey = process.env.PINATA_API_KEY;
// const pinataApiSecret = process.env.PINATA_API_SECRET;
// const pinataJwt = process.env.PINATA_JWT; // Assuming you have the JWT stored in an environment variable


const FormRightWrapper = () => {
  

  const Handler = useContext(FormState);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [file, setFile] = useState(null);

  const uploadFiles = async (e) => {
    e.preventDefault();
    setUploadLoading(true);

    if (Handler.form.story) {
      try {
       
        const formData = new FormData();
        formData.append("file", Handler.form.story);
       
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "cc079f575fd2ae3804a8",
            pinata_secret_api_key:
              "81bc834392e03829a5b751027cbee89e977b9c9965b19a2322ef0f1d4d6ba90e",
            "Content-Type": "multipart/form-data",
          },
        });
        // toast.error("yhi pr error aa gya");
        // const added = resFile.add(Handler.form.story);
        // const added = await resFile.add(Handler.form.story);
        // Handler.setStoryUrl(added.path)
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        Handler.setStoryUrl(ImgHash);
        toast.success("Story Uploaded Successfully");
      } catch (error) {
        toast.error("Error Uploading Story");
      }
    }

    if (Handler.image !== null) {
      try {
        const { data } = await pinata.add(Handler.image, {
          pinataMetadata: { name: "Image" },
        });
        Handler.setImageUrl(data.IpfsHash);
        toast.success("Image Uploaded Successfully");
      } catch (error) {
        toast.error("Error Uploading Image");
      }
    }

    setUploadLoading(false);
    setUploaded(true);
    Handler.setUploaded(true);
  };

  return (
    <FormRight>
      <FormInput>
        <FormRow>
          <RowFirstInput>
            <label>Required Amount</label>
            <Input
              onChange={Handler.FormHandler}
              value={Handler.form.requiredAmount}
              name="requiredAmount"
              type="number"
              placeholder="Required Amount"
            />
          </RowFirstInput>
          <RowSecondInput>
            <label>Choose Category</label>
            <Select
              onChange={Handler.FormHandler}
              value={Handler.form.category}
              name="category"
            >
              <option>Education</option>
              <option>Health</option>
              <option>Animal</option>
            </Select>
          </RowSecondInput>
        </FormRow>
      </FormInput>
      {/* Image */}
      <FormInput>
        <label>Select Image</label>
        <Image
          alt="dapp"
          onChange={Handler.ImageHandler}
          type="file"
          accept="image/*"
        />
      </FormInput>
      {uploadLoading === true ? (
        <Button>
          <TailSpin color="#fff" height={20} />
        </Button>
      ) : uploaded === false ? (
        <Button  onClick={uploadFiles}>
          Upload Files to IPFS
        </Button>
      ) : (
        <Button style={{ cursor: "no-drop" }}>
          Files uploaded Successfully
        </Button>
      )}
      <Button onClick={Handler.startCampaign}>Start Campaign</Button>
    </FormRight>
  );
};

const FormRight = styled.div`
  width: 45%;
`;

const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "poppins";
  margin-top: 10px;
`;

const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Input = styled.input`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const RowFirstInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const RowSecondInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

const Select = styled.select`
  padding: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;
`;

const Image = styled.input`
  background-color: ${(props) => props.theme.bgDiv};
  color: ${(props) => props.theme.color};
  margin-top: 4px;
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: large;
  width: 100%;

  &::-webkit-file-upload-button {
    padding: 15px;
    background-color: ${(props) => props.theme.bgSubDiv};
    color: ${(props) => props.theme.color};
    outline: none;
    border: none;
    font-weight: bold;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  color: white;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  margin-top: 30px;
  cursor: pointer;
  font-weight: bold;
  font-size: large;
`;

export default FormRightWrapper;
