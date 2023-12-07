import { useState } from "react";
import useChain from "./hooks/useChain";
import useIndexedTransaction from "./hooks/useIndexed";
import { counterAddress, usePrepareCounterSetNumber } from "wagmi-config";
import {
  NumberSet,
  NumberSet_OrderBy,
  OrderDirection,
  useNumberQuery,
  useNumberSetsQuery,
} from "web-kit";
import { Button, Card, Table, Web3Account } from "web-ui";
import dayjs from "dayjs";

function App() {
  const { chainId, explorer, isLocal } = useChain();

  const [number, setNumber] = useState<bigint>(BigInt(0));

  const { data: currentNumber, refetch: refetchCurrentNumber } = useNumberQuery(
    {
      variables: {
        id: counterAddress[
          chainId as keyof typeof counterAddress
        ].toLowerCase(),
      },
      chainId,
    }
  );

  const {
    data: numberSets,
    refetch: refetchNumberUpdates,
  } = useNumberSetsQuery(
    {
      variables: {
        orderBy: NumberSet_OrderBy.BlockTimestamp,
        orderDirection: OrderDirection.Desc,
      },
      chainId,
    },
    {
      selectFromResult: ({ data, ...rest }) => {
        return { data: data?.numberSets, ...rest };
      },
    }
  );

  const { config } = usePrepareCounterSetNumber({
    args: [number],
  });

  const { execute, loading } = useIndexedTransaction(
    config,
    useNumberSetsQuery,
    ({ numberSets }) => {
      return { indexed: Boolean(numberSets?.length) };
    },
    () => {
      refetchNumberUpdates();
      refetchCurrentNumber();
    }
  );

  return (
    <div className="h-full w-full">
      <section className="flex w-full flex-col md:flex-row gap-3 mx-auto p-2">
        <div className="w-full md:w-1/2 lg:w-1/3 ">
          <Card>
            <div className="flex bg-white flex-col space-y-1.5 p-4 border-b border-gray-300">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Update Counter
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-4 flex flex-row justify-between items-center w-full gap-4">
                <p className="text-sm font-medium leading-none">
                  Current value
                </p>
                <p>{currentNumber?.number?.value}</p>
              </div>
              <div className="p-4 w-full">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="number-input"
                >
                  New Input
                </label>
                <div className="flex gap-4 mt-2 w-full">
                  <input
                    className="input input-primary w-full"
                    id="number-input"
                    type="number"
                    placeholder="Enter a number"
                    value={Number(number)}
                    onChange={(e) => setNumber(BigInt(e.target.value))}
                  />
                  <Button
                    loading={loading}
                    type="submit"
                    onClick={() => execute()}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3 h-full">
          <Card>
            <div className="flex flex-col space-y-1.5 p-4 border-b border-gray-300">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Counter Updates History
              </h3>
            </div>
            <div className="">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <Table<NumberSet>
                  head={[
                    {
                      label: "Account",
                      render: (row) => {
                        return <Web3Account address={row.owner.id} />;
                      },
                    },
                    {
                      label: "Number",
                      key: "newValue",
                    },
                    {
                      label: "Block",
                      key: "blockNumber",
                    },
                    {
                      label: "Time",
                      render: (row) => {
                        return dayjs(
                          parseInt(row.blockTimestamp) * 1000
                        ).format("YYYY-MM-DD HH:mm:ss");
                      },
                    },
                    {
                      label: "Transaction",
                      render: (row) => {
                        return (
                          !isLocal && (
                            <a
                              className="link"
                              href={explorer + "/tx/" + row.transactionHash}
                              target="_blank"
                            >
                              transaction
                            </a>
                          )
                        );
                      },
                    },
                  ]}
                  data={numberSets ?? []}
                />
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default App;
