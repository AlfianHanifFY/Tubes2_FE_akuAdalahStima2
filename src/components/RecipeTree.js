import React from "react";
import Tree from "react-d3-tree";

const containerStyles = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const nodeStyles = {};

export const convertToTree = (data) => {
  const buildNode = (node) => {
    const treeNode = {
      name: node.Root.root,
      children: [],
    };

    if (node.Children) {
      node.Children.forEach((child) => {
        const childNode = buildNode(child);
        treeNode.children.push(childNode);
      });
    }

    return treeNode;
  };

  return buildNode(data);
};

const getNodeColor = (name) => {
  const normalized = name.trim().toLowerCase();
  switch (normalized) {
    case "fire":
      return "#FFB3B3";
    case "air":
      return "#B3E6B3";
    case "water":
      return "#99CCFF";
    case "earth":
      return "#D2B48C";
    case "time":
      return "#FFEB99";
    default:
      return "#FFFFFF";
  }
};

const renderCustomNode = ({ nodeDatum }) => (
  <g style={nodeStyles}>
    <rect
      width="120"
      height="80"
      x="-60"
      y="-40"
      fill={getNodeColor(nodeDatum.name)}
      rx="10"
    />
    <text
      fill="black"
      strokeWidth="1"
      x="0"
      y="10"
      textAnchor="middle"
      fontSize="15"
    >
      {nodeDatum.name}
    </text>
  </g>
);

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
        pathFunc="elbow"
        zoomable={true}
        draggable={true}
        translate={{ x: 600, y: 40 }}
        scaleExtent={{ min: 0.4, max: 1 }}
        separation={{
          siblings: 1.5,
          nonSiblings: 1.5,
        }}
        pathClassFunc={() => "custom-path"}
      />
    </div>
  );
};

export default RecipeTree;
