import { Exact, InputMaybe, Scalars } from "web-kit";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { QueryDefinition } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";
import useChain from "./useChain";
import { PrepareWriteContractResult } from "wagmi/actions";

const useIndexedTransaction = <SubgraphQuery>(
  config: PrepareWriteContractResult,
  useQuery: UseQuery<
    QueryDefinition<
      {
        variables: Exact<{
          where?: InputMaybe<{
            transactionHash?: InputMaybe<Scalars["Bytes"]["input"]>;
          }>;
        }>;
        chainId?: number | undefined;
      },
      any,
      never,
      SubgraphQuery,
      "subgraphAPI"
    >
  >,
  selectFromResult: (
    result: SubgraphQuery
  ) => {
    indexed: boolean;
  },
  onSuccessfulIndexing?: () => void
) => {
  const { chainId } = useChain();
  const [polling, setPolling] = useState(false);

  const { data, writeAsync, isLoading: confirmationPending } = useContractWrite(
    config
  );

  const {
    isSuccess: transactionSucess,
    isLoading: transactionPending,
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const { indexed } = useQuery(
    { variables: { where: { transactionHash: data?.hash } }, chainId },
    {
      pollingInterval: polling ? 2000 : 0,
      skip: !polling || !Boolean(data?.hash),
      selectFromResult: (result) => {
        if (!result.data) {
          return { indexed: false };
        }
        const { indexed } = selectFromResult(result.data);
        return {
          indexed,
        };
      },
    }
  );

  useEffect(() => {
    if (transactionSucess) {
      setPolling(true);
    }
  }, [transactionSucess]);

  useEffect(() => {
    if (indexed) {
      onSuccessfulIndexing?.();
      setPolling(false);
    }
  }, [indexed]);

  return {
    loading: confirmationPending || transactionPending || polling,
    execute: () => {
      return writeAsync && writeAsync();
    },
  };
};

export default useIndexedTransaction;
