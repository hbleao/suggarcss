import React, { useState, useEffect } from "react";
import { ProgressBar } from "../../../src/components";

export default {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: 'padded',
  },
};

export const Default = () => <ProgressBar value={50} />;

export const WithCustomColor = () => <ProgressBar value={75} color="#8A2BE2" />;

export const WithInitialValue = () => <ProgressBar initialValue={25} value={75} />;

export const FullProgress = () => <ProgressBar value={100} />;

export const NoProgress = () => <ProgressBar value={0} />;

export const AnimatedProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        return oldProgress + 10;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  return (
    <div>
      <p>Progresso: {progress}%</p>
      <ProgressBar value={progress} />
    </div>
  );
};

export const CustomStyling = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <ProgressBar 
      value={60} 
      color="#FF5733" 
      style={{ height: "8px", borderRadius: "4px" }} 
    />
    <ProgressBar 
      value={40} 
      color="#33FF57" 
      style={{ height: "12px", borderRadius: "6px" }} 
    />
    <ProgressBar 
      value={80} 
      color="#3357FF" 
      style={{ height: "16px", borderRadius: "8px" }} 
    />
  </div>
);

export const MultipleProgressBars = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
    <div>
      <p>Etapa 1: Completa</p>
      <ProgressBar value={100} color="#4CAF50" />
    </div>
    <div>
      <p>Etapa 2: Em andamento</p>
      <ProgressBar value={60} color="#2196F3" />
    </div>
    <div>
      <p>Etapa 3: Não iniciada</p>
      <ProgressBar value={0} color="#9E9E9E" />
    </div>
  </div>
);
