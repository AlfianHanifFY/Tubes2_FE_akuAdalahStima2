import React from "react";
import Tree from "react-d3-tree";

const containerStyles = {
  width: "100%",
  height: "100vh", // Full viewport height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const nodeStyles = {
  // Tidak ada transformasi vertikal lagi
};

export const convertToTree = (data) => {
  const buildNode = (node) => {
    const treeNode = {
      name: node.Root.root, // Nama node utama
      children: [], // Siapkan children
    };

    // Cek dan bangun children dari data
    if (node.Children) {
      node.Children.forEach((child) => {
        const childNode = buildNode(child); // Rekursi untuk children
        treeNode.children.push(childNode);
      });
    }

    return treeNode;
  };

  // Mulai membangun tree dari root
  return buildNode(data);
};

const renderCustomNode = ({ nodeDatum }) => (
  <g style={nodeStyles}>
    <rect
      width="200" // Ukuran node yang lebih besar
      height="120"
      x="-100" // Menggeser posisi node
      y="-60" // Menggeser posisi node
      fill="#ffffff" // Warna putih
      rx="15" // Membulatkan sudut
    />
    <text
      fill="black"
      strokeWidth="1"
      x="0"
      y="10"
      textAnchor="middle"
      fontSize="16" // Ukuran font lebih besar
    >
      {nodeDatum.name}
    </text>
  </g>
);

// Komponen RecipeTree sekarang menerima props `data`
const RecipeTree = ({ data }) => {
  return (
    <div
      style={containerStyles}
      className="bg-black bg-opacity-0 rounded-xl h-screen"
    >
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={renderCustomNode}
        pathFunc="straight"
        zoomable={false}
        draggable={true}
        translate={{ x: 200, y: 40 }}
        scaleExtent={{ min: 0.5, max: 2 }}
        separation={{
          siblings: 2.3,
          nonSiblings: 2,
        }}
        pathClassFunc={() => "custom-path"} // Gunakan kelas CSS
      />
    </div>
  );
};

export default RecipeTree;
