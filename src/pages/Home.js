import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Tree from "../components/RecipeTree";
import { convertToTree } from "../components/RecipeTree";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [treeData, setTreeData] = useState(null);
  const [integerInput, setIntegerInput] = useState("");
  const [methodType, setMethodType] = useState(""); // New state for method type

  const handleTestClick = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/TestTree?element=${encodeURIComponent(
          searchTerm
        )}`
      );
      if (!res.ok) throw new Error("Request failed");
      console.debug("Fetch status:", res.status);

      const data = await res.json();
      const tree = convertToTree(data);
      console.debug("Converted tree data:", tree); // <-- Debug log
      setTreeData(tree);
    } catch (err) {
      console.error("Error fetching tree data:", err);
    }
  };

  const handleScrap = async () => {
    alert("data scrapped");
    try {
      const res = await fetch(`http://localhost:8080/scrap`);
      if (!res.ok) throw new Error("Request failed");
      console.debug("Fetch status:", res.status);
    } catch (err) {
      console.error("Error fetching tree data:", err);
    }
  };

  const handleIntegerChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setIntegerInput(value);
    }
  };

  // Set method type to "bfs" when BFS button is clicked
  const handleBFSClick = () => {
    setMethodType("bfs");
  };

  // Set method type to "dfs" when DFS button is clicked
  const handleDFSClick = () => {
    setMethodType("dfs");
  };

  // Handle MultipleRecipe button click
const handleMultipleRecipeClick = async () => {
    const endpoint =
      methodType === "bfs" ? "MultipleRecipeBFS" : "MultipleRecipe";

    try {
      const res = await fetch(
        `http://localhost:8080/${endpoint}?element=${encodeURIComponent(
          searchTerm
        )}&count=${encodeURIComponent(integerInput)}`
      );
      if (!res.ok) throw new Error("Request failed");
      console.debug(`Fetch status (${methodType.toUpperCase()}):`, res.status);

      const data = await res.json();
      const tree = convertToTree(data[0]);
      console.debug(`Converted tree data (${methodType.toUpperCase()}):`, tree);
      setTreeData(tree);
    } catch (err) {
      console.error(`Error fetching tree data (${methodType.toUpperCase()}):`, err);
    }
  };

  // Handle ShortestPath button click
  const handleShortestPathClick = () => {
    alert("Shortest Path clicked");
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar (1/6 lebar layar) */}
      <aside className="w-1/6 bg-black bg-opacity-90 p-4 ">
        <div className="m-3">
          <h2 className="text-5xl font-bold my-8 text-white">
            C A R I - R E S E P
          </h2>

          <div className="mb-4 ">
            <label
              htmlFor="integerInput"
              className="block mb-2 text-lg text-white"
            >
              Element :
            </label>
            <SearchBar onChange={setSearchTerm} />
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
            <button
              type="button"
              onClick={handleBFSClick}
              className="w-full text-lg px-4 py-2 rounded-xl shadow bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              BFS
            </button>
            <button
              type="button"
              onClick={handleDFSClick}
              className="w-full text-lg px-4 py-2 rounded-xl shadow bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              DFS
            </button>
            <button
              type="button"
              onClick={handleScrap}
              className="w-full text-lg px-4 py-2 rounded-xl shadow bg-green-600 text-white hover:bg-green-700 transition"
            >
              Scrap
            </button>
            <button
              type="button"
              onClick={handleTestClick}
              className="w-full text-lg px-4 py-2 rounded-xl shadow bg-green-600 text-white hover:bg-green-700 transition"
            >
              Test
            </button>
            <button
              className="w-full text-left hover:bg-zinc-800 p-2 rounded flex items-center"
              onclick="uploadFile('humming-audio')"
            >
              <span className="text-white text-3xl">test</span>
            </button>
          </div>

          <div className="space-x-4 mb-6">
            <button
              type="button"
              onClick={handleMultipleRecipeClick}
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200"
            >
              Multiple Recipe
            </button>
          </div>

          <div className="mb-4">
            <p className="text-lg">Current method: {methodType || "None"}</p>
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
