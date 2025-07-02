import React from "react";
import { Flex } from "../../../src/components";

export default {
  title: "Components/Flex",
  component: Flex,
  parameters: {
    layout: 'padded',
  },
};

const Box = ({ children, ...props }) => (
  <div 
    style={{ 
      padding: "1rem", 
      background: "#e0e0ff", 
      borderRadius: "4px",
      textAlign: "center",
      minWidth: "80px",
      ...props.style
    }} 
    {...props}
  >
    {children}
  </div>
);

export const Row = () => (
  <Flex gap="1rem">
    <Box>Item 1</Box>
    <Box>Item 2</Box>
    <Box>Item 3</Box>
  </Flex>
);

export const Column = () => (
  <Flex direction="column" gap="1rem">
    <Box>Item 1</Box>
    <Box>Item 2</Box>
    <Box>Item 3</Box>
  </Flex>
);

export const JustifyContent = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
    <div>
      <h3>justify="flex-start" (padrão)</h3>
      <Flex justify="flex-start" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>justify="center"</h3>
      <Flex justify="center" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>justify="flex-end"</h3>
      <Flex justify="flex-end" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>justify="space-between"</h3>
      <Flex justify="space-between" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>justify="space-around"</h3>
      <Flex justify="space-around" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
  </div>
);

export const AlignItems = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
    <div>
      <h3>align="stretch" (padrão)</h3>
      <Flex align="stretch" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem", height: "150px" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>align="flex-start"</h3>
      <Flex align="flex-start" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem", height: "150px" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>align="center"</h3>
      <Flex align="center" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem", height: "150px" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
    
    <div>
      <h3>align="flex-end"</h3>
      <Flex align="flex-end" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem", height: "150px" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </Flex>
    </div>
  </div>
);

export const Wrap = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
    <div>
      <h3>wrap="nowrap" (padrão)</h3>
      <Flex wrap="nowrap" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem", width: "300px" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
      </Flex>
    </div>
    
    <div>
      <h3>wrap="wrap"</h3>
      <Flex wrap="wrap" gap="1rem" style={{ border: "1px dashed #ccc", padding: "1rem", width: "300px" }}>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
      </Flex>
    </div>
  </div>
);

export const InlineFlex = () => (
  <div>
    <p>Texto antes do flex inline</p>
    <Flex inline gap="1rem">
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
    <p>Texto depois do flex inline</p>
  </div>
);
