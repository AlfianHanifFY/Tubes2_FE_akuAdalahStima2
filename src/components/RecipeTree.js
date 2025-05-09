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
      width="120" // Ukuran node yang lebih kecil
      height="80" // Ukuran node yang lebih kecil
      x="-60" // Menggeser posisi node
      y="-40" // Menggeser posisi node
      fill="#ffffff" // Warna putih
      rx="10" // Membulatkan sudut
    />
    <text
      fill="black"
      strokeWidth="1"
      x="0"
      y="10"
      textAnchor="middle"
      fontSize="15" // Ukuran font lebih kecil
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
        zoomable={true} // Aktifkan zoom untuk memudahkan melihat tree
        draggable={true}
        translate={{ x: 200, y: 40 }} // Posisi tree lebih terpusat
        scaleExtent={{ min: 0.4, max: 1 }} // Zoom out lebih jauh
        separation={{
          siblings: 1.5, // Jarak antar node pada level yang sama lebih rapat
          nonSiblings: 1.5, // Jarak antar node pada level berbeda lebih rapat
        }}
        pathClassFunc={() => "custom-path"} // Gunakan kelas CSS
      />
    </div>
  );
};

export default RecipeTree;
