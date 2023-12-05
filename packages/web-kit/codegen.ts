import { CodegenConfig } from "@graphql-codegen/cli";

const url = "http://localhost:8000/subgraphs/name/local-graph";

const config: CodegenConfig = {
  overwrite: true,
  schema: [url],
  documents: ["operations.graphql"],
  generates: {
    "./src/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-rtk-query"],
      config: {
        importBaseApiFrom: "./subgraph",
        importBaseApiAlternateName: "subgraphAPI",
        exportHooks: true,
        defaultChainId: 1337,
      },
    },
  },
};

export default config;
