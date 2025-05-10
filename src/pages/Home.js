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
    <div className="home min-h-screen">
      <header className="color-white"></header>
      <main>
        <h1 className="text-7xl m-8">akuAdalahStima2</h1>
        <section className="m-8">
          <SearchBar onChange={setSearchTerm} />
          <div className="space-x-4 mt-6">
            <button
              type="button"
              onClick={handleBFSClick} // Use the new handler
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              BFS
            </button>
            <button
              type="button"
              onClick={handleDFSClick} // Use the new handler
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              DFS
            </button>
            <button
              type="button"
              onClick={handleTestClick}
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
              Test
            </button>

            <button
              type="button"
              onClick={handleScrap}
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-green-600 text-white hover:bg-green-700 transition duration-200"
            >
              Scrap
            </button>
          </div>
        </section>

        {/* New buttons */}
        <section className="m-8">
          <div className="space-x-4 mt-6">
            <button
              type="button"
              onClick={handleMultipleRecipeClick}
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-yellow-600 text-white hover:bg-yellow-700 transition duration-200"
            >
              Multiple Recipe
            </button>
            <button
              type="button"
              onClick={handleShortestPathClick}
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-orange-600 text-white hover:bg-orange-700 transition duration-200"
            >
              Shortest Path
            </button>
          </div>
        </section>

        <section className="m-8">
          <div>
            <label htmlFor="integerInput" className="block mb-2 text-lg">
              Multiple Recipe Count:
            </label>
            <input
              id="integerInput"
              type="text"
              value={integerInput}
              onChange={handleIntegerChange}
              className="border rounded-lg p-2 text-lg w-32"
              placeholder="Only integers"
            />
          </div>
          <div className="mt-4">
            <p className="text-lg">Current method: {methodType || "None"}</p>{" "}
            {/* Display current method */}
          </div>
          {treeData ? (
            <>
              <Tree data={treeData} />
              <div className="mt-4 bg-gray-100 p-4 rounded-lg text-sm text-gray-800 max-h-[400px] overflow-auto">
                <h2 className="font-bold mb-2">Debug: Converted Tree Data</h2>
              </div>
            </>
          ) : (
            <p className="text-gray-500">No tree data loaded</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
