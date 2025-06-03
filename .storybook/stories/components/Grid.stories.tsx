import React from "react";
import { Grid, Column } from "../../../src/components";

export default {
  title: "Components/Grid",
  component: Grid,
  parameters: {
    layout: 'padded',
  },
};

export const BasicGrid = () => (
  <Grid gap="1rem">
    <Column mobile={[1, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna de largura total
      </div>
    </Column>
    <Column mobile={[1, 6]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 1
      </div>
    </Column>
    <Column mobile={[7, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 2
      </div>
    </Column>
  </Grid>
);

export const ThreeColumnGrid = () => (
  <Grid gap="1rem">
    <Column mobile={[1, 4]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 1
      </div>
    </Column>
    <Column mobile={[5, 8]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 2
      </div>
    </Column>
    <Column mobile={[9, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 3
      </div>
    </Column>
  </Grid>
);

export const GridWithBackground = () => (
  <Grid gap="1rem" background="#f5f5f5" style={{ padding: "1rem" }}>
    <Column mobile={[1, 6]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 1
      </div>
    </Column>
    <Column mobile={[7, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 2
      </div>
    </Column>
  </Grid>
);

export const GridWithCustomGap = () => (
  <Grid gap="2rem">
    <Column mobile={[1, 4]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 1
      </div>
    </Column>
    <Column mobile={[5, 8]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 2
      </div>
    </Column>
    <Column mobile={[9, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Coluna 3
      </div>
    </Column>
  </Grid>
);

export const NestedGrids = () => (
  <Grid gap="1rem">
    <Column mobile={[1, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
        Cabeçalho
      </div>
    </Column>
    <Column mobile={[1, 8]}>
      <Grid gap="1rem">
        <Column mobile={[1, 12]}>
          <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
            Conteúdo Principal
          </div>
        </Column>
        <Column mobile={[1, 6]}>
          <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
            Subseção 1
          </div>
        </Column>
        <Column mobile={[7, 12]}>
          <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center" }}>
            Subseção 2
          </div>
        </Column>
      </Grid>
    </Column>
    <Column mobile={[9, 12]}>
      <div style={{ background: "#e0e0ff", padding: "1rem", textAlign: "center", height: "100%" }}>
        Barra Lateral
      </div>
    </Column>
  </Grid>
);
