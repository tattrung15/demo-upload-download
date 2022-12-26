import { useMemo } from "react";
import "./App.css";

function App() {
  const controller = useMemo(() => new AbortController(), []);

  const handleDownload = async () => {
    // axios
    //   .get("http://localhost:5000/download", {
    //     responseType: "blob",
    //     onDownloadProgress: (event) => {
    //       const progress = Math.round((100 * event.loaded) / event.total);
    //       console.log(progress);
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

  return (
    <div className="App">
      <div>
        <button>Upload</button>
      </div>
      <div>
        <button onClick={handleDownload}>Download</button>
      </div>
      <div>
        <button onClick={() => controller.abort()}>Cancel Download</button>
      </div>
    </div>
  );
}

export default App;
