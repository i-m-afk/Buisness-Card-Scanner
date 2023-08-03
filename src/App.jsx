import "./App.css";
import "./selectStyles.css";
import Tesseract from "tesseract.js";
import { useState, useEffect } from "react";
import Select from "react-select/creatable";
import { returnFileSize, validFiles } from "./utils/ImgTypes";
function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState([]);
  const [options, setOptions] = useState([{}]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setOptions(
      result.map((item) => {
        return {
          value: item,
          label: item,
        };
      })
    );
  }, [result, firstName, lastName, company, title, phone, email]);

  const scanImage = (e) => {
    e.preventDefault();
    setFile(e.target.card.files[0]);
    if (!file) return alert("Please select an image");

    // if (!validFiles(file)) {
    //   return alert("Please select a valid image type");
    // }

    if (returnFileSize(file.size) > 5) {
      return alert("File size is too big");
    }

    Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        setResult(
          text
            .split("\n")
            .filter((item) => item !== "")
            .map((item) =>
              item
                .trim()
                .replace(/[^a-zA-Z0-9 ]/g, "")
                .replace(/ +(?= )/g, "")
                .toLowerCase()
                .split(" ")
                .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
                .join(" ")
            )
        );
      }
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, company, title, phone, email });
    // make a post request to the backend
  };

  return (
    <>
      <h1>Business Card Scanner</h1>
      <h2>Upload an image of a business card</h2>
      <form onSubmit={scanImage}>
        <input type="file" id="card" name="card" />
        <button>Scan</button>
      </form>
      <img src={file ? URL.createObjectURL(file) : null} alt="business card" />
      <div id="result">
        <h2>We figured this out:</h2>
        <p>{result}</p>
      </div>

      <div className="data">
        <h3>First Name:</h3>
        {result.length > 0 ? (
          <Select
            options={options}
            isClearable
            onChange={(e) => {
              setFirstName(e.value);
            }}
          />
        ) : null}
        <input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <h3>Last Name:</h3>
        {result.length > 0 ? (
          <Select
            options={options}
            isClearable
            onChange={(e) => {
              setLastName(e.value);
            }}
          />
        ) : null}
        <input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <h3>Company:</h3>
        {result.length > 0 ? (
          <Select
            options={options}
            isClearable
            onChange={(e) => {
              setCompany(e.value);
            }}
          />
        ) : null}
        <input
          type="text"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />
        <h3>Title:</h3>
        {result.length > 0 ? (
          <Select
            options={options}
            isClearable
            onChange={(e) => {
              setTitle(e.value);
            }}
          />
        ) : null}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h3>Phone:</h3>
        {result.length > 0 ? (
          <Select
            options={options}
            isClearable
            onChange={(e) => {
              setPhone(e.value);
            }}
            contentEditable="true"
          />
        ) : null}
        <input
          type="text"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <h3>Email:</h3>
        {result.length > 0 ? (
          <Select
            options={options}
            isClearable
            onChange={(e) => {
              setEmail(e.value);
            }}
            contentEditable="true"
          />
        ) : null}
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>Save</button>
      </div>
    </>
  );
}
export default App;
