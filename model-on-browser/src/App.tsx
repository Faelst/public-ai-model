import { ImageCaptioner } from "./ai-model";
import "./App.css";
import { useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHj0r68jZH4eo3fYSF4w2kuacrnLWu69OP644HsnhNkw&s=10",
  );
  const [caption, setCaption] = useState<string>("");
  const [translatedCaption, setTranslatedCaption] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleGenerate = async () => {
    setTranslatedCaption("");
    setCaption("");
    setError("");

    if (!imageUrl) {
      setError("Please enter an image URL");
      return;
    }
    setError("");

    setCaption("Generated caption for the image...");

    const generatedCaption = await new ImageCaptioner().generateCaption(
      imageUrl,
    );

    setCaption(generatedCaption);

    const translated = await new ImageCaptioner().translateText(
      generatedCaption,
    );

    setTranslatedCaption(translated);
  };

  return (
    <>
      <header>
        <h1>Capition Generator</h1>
      </header>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <input
          type="text"
          placeholder="Enter image URL"
          style={{ padding: "10px", fontSize: "16px", width: "300px" }}
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          style={{ padding: "10px 20px", fontSize: "16px" }}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={imageUrl}
          alt="Generated result"
          style={{ marginTop: "10px", maxWidth: "400px" }}
        />
        <p style={{ marginTop: "10px" }}>
          <strong>Original:</strong> {caption}
        </p>
        <p style={{ marginTop: "10px" }}>
          <strong>Translated for Portuguese:</strong> {translatedCaption}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <p>{error}</p>
      </div>
    </>
  );
}

export default App;
