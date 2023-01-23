import React from "react";
import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  const [inputLink, setInputLink] = React.useState<string>("");
  const [imageqrCode, setImageqrCode] = React.useState<string>("");
  const [link_1, setLink_1] = React.useState<string>("");

  /*
   1. In the handleSubmit function to generate QR Code, I'm using axios to make a post request to the server.
   2. When the request is successful, i want to save the QRcode in the localstorage.
   3. When the page is refreshed, I want to get the QRcode from the localstorage and display it.
   4. Fetch the logo of the website and display it in the screen.
   5. Put it down left corner of the QR code.
  */

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:1000/qrcode", {
      mode: "no-cors",
      linkQR: inputLink,
      img: imageqrCode,
    });

    if (data.status === 200 || "OK") {
      const test: any = localStorage.setItem(
        "qrcode",
        JSON.stringify(data.img)
      );
      setImageqrCode(test);
      setLink_1(data.linkQR);
    }
  };

  const handleReset = (): void => {
    localStorage.removeItem("qrcode");
    window.location.reload();
  };

  React.useEffect(() => {
    const localData: string | null = localStorage.getItem("qrcode");
    if (localData) {
      setImageqrCode(JSON.parse(localData));
    }
  }, [imageqrCode]);

  console.log(imageqrCode);
  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <h2>Insert a link</h2>
          <p>To generate a QR code, insert a link in the field below.</p>
        </div>
        {localStorage.getItem("qrcode") ? (
          <div className="form-reset">
            <div>
              <button className="btn-reset" onClick={handleReset}>
                Reset to default
              </button>
            </div>
            <div>
              <img src={imageqrCode} alt="QR Code" />
            </div>
          </div>
        ) : (
          <div className="form-input">
            <form className="card-content" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Insert a link..."
                value={inputLink}
                onChange={(e) => setInputLink(e.target.value)}
              />
              <button type="submit">
                <span>Generate</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
