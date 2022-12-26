import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const controller = useMemo(() => new AbortController(), []);

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [controller]);

  const handleDownload = async () => {
    // axios
    //   .get("http://localhost:5000/download", {
    //     responseType: "blob",
    //     onDownloadProgress: (event) => {
    //       const progress = Math.round((100 * event.loaded) / event.total);
    //     },
    //     signal: controller.signal,
    //   })
    //   .then((res) => {
    //     saveFile(res.data, getFileName(res.headers["content-disposition"]));
    //   });
    Object.assign(document.createElement("a"), {
      href: "http://localhost:5000/download",
    }).click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    axios
      .post("http://localhost:5000/upload", file, {
        headers: {
          "Content-Type": "application/octet-stream",
        },
        onUploadProgress: (event) => {
          const progress = Math.round((100 * event.loaded) / event.total);
          setProgress(progress);
        },
        signal: controller.signal,
      })
      .then((res) => {
        setProgress(null);
      });
  };

  return (
    <div className="App">
      <div>
        <input type="file" name="" id="" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      <div>
        <div>{progress && `${progress}%`}</div>
      </div>
      <div>
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
}

export default App;
