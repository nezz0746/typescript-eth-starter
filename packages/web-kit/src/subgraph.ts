import { createApi } from "@reduxjs/toolkit/query/react";
import request, { ClientError } from "graphql-request";

const subgraphUrls: Record<number, string> = {
  1337: "http://localhost:8000/subgraphs/name/local-graph",
  80001: "https://api.thegraph.com/subgraphs/name/nezz0746/starter-counter-mumbai",
  11155111: "https://api.thegraph.com/subgraphs/name/nezz0746/starter-counter-sepolia",
};

type SubgraphGraphQLBaseQueryParams = {
  document: string;
  variables: Record<string, any>;
  chainId: number;
};

export const subgraphQuery = <T>() => async ({
  document,
  variables,
  chainId,
}: SubgraphGraphQLBaseQueryParams): Promise<{ data: T } | { error: any }> => {
  try {
    const baseUrl = subgraphUrls[chainId];

    const result = await request(baseUrl, document, variables);

    return { data: result } as { data: T };
  } catch (error) {
    if (error instanceof ClientError) {
      return { error: { status: error.response.status, data: error } };
    }
    return { error: { status: 500, data: error } };
  }
};

export const subgraphAPI = createApi({
  reducerPath: "subgraphAPI",
  baseQuery: subgraphQuery(),
  endpoints: () => ({}),
});
