import React from "react";
import * as Skeleton from "../../../src/components/Skeleton";

export default {
  title: "Components/Skeleton",
  component: Skeleton.Root,
  parameters: {
    layout: 'padded',
  },
};

export const BasicBlock = () => (
  <Skeleton.Block width="200px" height="20px" />
);

export const RoundedBlock = () => (
  <Skeleton.Block width="100px" height="100px" borderRadius="50%" />
);

export const TextSkeleton = () => (
  <Skeleton.Root display="flex" flexDirection="column" gap="8px">
    <Skeleton.Block width="80%" height="20px" />
    <Skeleton.Block width="90%" height="20px" />
    <Skeleton.Block width="70%" height="20px" />
    <Skeleton.Block width="85%" height="20px" />
  </Skeleton.Root>
);

export const AvatarWithText = () => (
  <Skeleton.Root display="flex" flexDirection="row" gap="16px" alignItems="center">
    <Skeleton.Block width="50px" height="50px" borderRadius="50%" />
    <Skeleton.Root display="flex" flexDirection="column" gap="8px">
      <Skeleton.Block width="150px" height="20px" />
      <Skeleton.Block width="100px" height="16px" />
    </Skeleton.Root>
  </Skeleton.Root>
);

export const CardSkeleton = () => (
  <Skeleton.Root 
    width="300px" 
    height="400px" 
    borderRadius="8px" 
    display="flex" 
    flexDirection="column"
    bgColor="light"
    style={{ padding: "16px" }}
  >
    <Skeleton.Block width="100%" height="200px" borderRadius="4px" />
    <Skeleton.Block width="80%" height="24px" marginTop="16px" />
    <Skeleton.Block width="60%" height="16px" marginTop="8px" />
    <Skeleton.Root display="flex" flexDirection="row" gap="8px" marginTop="auto">
      <Skeleton.Block width="80px" height="32px" borderRadius="4px" />
      <Skeleton.Block width="80px" height="32px" borderRadius="4px" />
    </Skeleton.Root>
  </Skeleton.Root>
);

export const TableSkeleton = () => (
  <Skeleton.Root display="flex" flexDirection="column" gap="16px" width="100%">
    <Skeleton.Root display="flex" flexDirection="row" gap="16px" width="100%">
      <Skeleton.Block width="25%" height="24px" />
      <Skeleton.Block width="25%" height="24px" />
      <Skeleton.Block width="25%" height="24px" />
      <Skeleton.Block width="25%" height="24px" />
    </Skeleton.Root>
    {[...Array(5)].map((_, index) => (
      <Skeleton.Root key={`table-row-${index}`} display="flex" flexDirection="row" gap="16px" width="100%">
        <Skeleton.Block width="25%" height="16px" />
        <Skeleton.Block width="25%" height="16px" />
        <Skeleton.Block width="25%" height="16px" />
        <Skeleton.Block width="25%" height="16px" />
      </Skeleton.Root>
    ))}
  </Skeleton.Root>
);

export const FormSkeleton = () => (
  <Skeleton.Root display="flex" flexDirection="column" gap="24px" width="100%" maxWidth="500px">
    <Skeleton.Root display="flex" flexDirection="column" gap="8px">
      <Skeleton.Block width="80px" height="16px" />
      <Skeleton.Block width="100%" height="40px" borderRadius="4px" />
    </Skeleton.Root>
    <Skeleton.Root display="flex" flexDirection="column" gap="8px">
      <Skeleton.Block width="120px" height="16px" />
      <Skeleton.Block width="100%" height="40px" borderRadius="4px" />
    </Skeleton.Root>
    <Skeleton.Root display="flex" flexDirection="column" gap="8px">
      <Skeleton.Block width="100px" height="16px" />
      <Skeleton.Block width="100%" height="100px" borderRadius="4px" />
    </Skeleton.Root>
    <Skeleton.Block width="120px" height="40px" borderRadius="4px" marginTop="16px" />
  </Skeleton.Root>
);
