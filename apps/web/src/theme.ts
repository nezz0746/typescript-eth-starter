import { env } from "./connectors/conf";

export type NetworkProperties = {
  style: {
    color: string;
    backgroundColor: string;
  };
};

export const networkProperties: Record<number, NetworkProperties> = {
  1: {
    style: {
      color: "#0377ba",
      backgroundColor: "#ebf4ee",
    },
  },
  31337: {
    style: {
      color: "#0377ba",
      backgroundColor: "#ebf4ee",
    },
  },
  80001: {
    style: {
      color: "#18618b",
      backgroundColor: "#f5ecf9",
    },
  },
};
