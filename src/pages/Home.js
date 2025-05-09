// src/pages/Home.js
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Tree from "../components/RecipeTree";
import { convertToTree } from "../components/RecipeTree";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [treeData, setTreeData] = useState(null);

  const handleTestClick = async () => {
    alert("Test button clicked");
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

  return (
    <div className="home min-h-screen">
      <header className="color-white"></header>
      <main>
        <section>
          {" "}
          <SearchBar onChange={setSearchTerm} />
          <div className="space-x-4 mt-6">
            <button
              type="button"
              onClick={() => alert("BFS clicked")}
              className="text-lg px-6 py-3 rounded-2xl shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
            >
              BFS
            </button>
            <button
              type="button"
              onClick={() => alert("DFS clicked")}
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
          </div>
        </section>

        <section className="mt-8">
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
