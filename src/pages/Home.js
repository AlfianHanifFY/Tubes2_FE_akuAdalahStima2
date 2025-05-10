import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import Tree from "../components/RecipeTree";
import { convertToTree } from "../components/RecipeTree";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [fullTreeData, setFullTreeData] = useState("");
  const [integerInput, setIntegerInput] = useState("");
  const [methodType, setMethodType] = useState("");
  const [countTree, setCountTree] = useState("");
  const [currentTree, setCurrentTree] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      alert("data scrapped");
      try {
        const res = await fetch(`http://localhost:8080/Scrap`);
        if (!res.ok) throw new Error("Request failed");
        console.debug("Fetch status:", res.status);
      } catch (err) {
        console.error("Error fetching tree data:", err);
      }
    };

    fetchData();
  }, []);

  const handleIntegerChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setIntegerInput(value);
    }
  };

  const handleTermChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  // Set method type to "bfs" when BFS button is clicked
  const handleBFSClick = async () => {
    setMethodType("BFS");
    try {
      const res = await fetch(
        `http://localhost:8080/BFS?element=${encodeURIComponent(
          searchTerm
        )}&count=${encodeURIComponent(integerInput)}`
      );
      if (!res.ok) throw new Error("Request failed");
      console.debug("Fetch status:", res.status);

      const data = await res.json();
      setCountTree(data.length);
      setFullTreeData(data);

      const tree = convertToTree(data[0]);
      console.debug("Converted tree data:", tree); // <-- Debug log
      setTreeData(tree);
    } catch (err) {
      console.error("Error fetching tree data:", err);
    }
  };

  // Set method type to "dfs" when DFS button is clicked
  const handleDFSClick = async () => {
    setMethodType("DFS");
    try {
      const res = await fetch(
        `http://localhost:8080/DFS?element=${encodeURIComponent(
          searchTerm
        )}&count=${encodeURIComponent(integerInput)}`
      );
      if (!res.ok) throw new Error("Request failed");
      console.debug("Fetch status:", res.status);

      const data = await res.json();
      console.debug("Raw response data:", data);
      setCountTree(data.length);
      setFullTreeData(data);

      const tree = convertToTree(data[0]);
      console.debug("Converted tree data:", tree); // <-- Debug log
      setTreeData(tree);
    } catch (err) {
      console.error("Error fetching tree data:", err);
    }
  };

  const handleRightArrow = () => {
    setCurrentTree((prev) => (prev + 1) % countTree);
  };

  const handleLeftArrow = () => {
    setCurrentTree((prev) => (prev - 1 + countTree) % countTree);
  };

  useEffect(() => {
    if (methodType && countTree > 0) {
      try {
        const tree = convertToTree(fullTreeData[currentTree]);
        setTreeData(tree);
      } catch (error) {
        console.error("Error fetching tree data:", err);
      }
    }
  }, [currentTree]);

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar (1/6 lebar layar) */}
      <aside className="w-1/5 bg-black bg-opacity-90 p-4 ">
        <div className="m-1">
          <h2 className="text-5xl font-bold my-2 text-green-500">C A R I -</h2>
          <h2 className="text-5xl font-bold my-2 text-green-500">R E S E P</h2>

          <div className="mb-4 ">
            <label
              htmlFor="integerInput"
              className="block mt-6 mb-2 text-lg text-white"
            >
              Element :
            </label>
            <input
              id="elementInput"
              type="text"
              value={searchTerm}
              onChange={handleTermChange}
              className="w-full border rounded-lg p-2 text-lg"
              placeholder="Search Element"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="integerInput"
              className="block mb-2 text-lg text-white"
            >
              Multiple Recipe Count:
            </label>
            <input
              id="integerInput"
              type="text"
              value={integerInput}
              onChange={handleIntegerChange}
              className="w-full border rounded-lg p-2 text-lg"
              placeholder="Only integers"
            />
          </div>

          <div className="space-y-3 mb-4">
            <label
              htmlFor="integerInput"
              className="block mb-2 text-lg text-white"
            >
              Search Method:
            </label>
            <button
              type="button"
              onClick={handleBFSClick}
              className="w-full text-lg px-4 py-2 rounded-md shadow bg-zinc-800  text-white hover:bg-green-600 transition"
            >
              <span className="text-white text-xl">BFS</span>
            </button>
            <button
              type="button"
              onClick={handleDFSClick}
              className="w-full text-lg px-4 py-2 rounded-md shadow bg-zinc-800  text-white hover:bg-green-600 transition"
            >
              <span className="text-white text-xl">DFS</span>
            </button>
            {/* <button
              type="button"
              onClick={handleScrap}
              className="w-full text-lg px-4 py-2 rounded-xl shadow bg-red-600 text-white hover:bg-red-700 transition"
            >
              Scrap
            </button> */}
          </div>

          <div className="mb-4">
            <p className="text-lg text-white">
              Current Method: {methodType || " - "}
            </p>
            <p className="text-lg text-white">Time Execution:</p>
            <p className="text-lg text-white">
              Tree Count: {countTree || " - "}
            </p>
            <p className="text-lg text-white">Total Node:</p>
            <p className="text-lg text-white">
              Current Tree: {currentTree + 1} / {countTree}
            </p>
          </div>
          <div className="flex row-auto gap-1">
            <button
              type="button"
              onClick={handleLeftArrow}
              className="w-full text-lg px-4 py-2 rounded-md shadow bg-zinc-800  text-white hover:bg-orange-600 transition"
            >
              <span className="text-white text-xl">←</span>
            </button>
            <button
              type="button"
              onClick={handleRightArrow}
              className="w-full text-lg px-4 py-2 rounded-md shadow bg-zinc-800  text-white hover:bg-orange-600 transition"
            >
              <span className="text-white text-xl">→</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Screen (5/6 lebar layar) */}
      <main className="w-5/6  bg-black bg-opacity-85">
        <div className="p-4">
          {" "}
          {treeData ? (
            <>
              <Tree data={treeData} />
            </>
          ) : (
            <p className="text-gray-500">No tree data loaded</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
