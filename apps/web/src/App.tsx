import { useState } from "react";
import useChain from "./hooks/useChain";
import useIndexedTransaction from "./hooks/useIndexed";
import { counterAddress, usePrepareCounterSetNumber } from "wagmi-config";
import { useNumberQuery, useNumberSetsQuery } from "web-kit";
import { Button, Card } from "web-ui";

function App() {
  const { chainId } = useChain();

  const [number, setNumber] = useState<bigint>(BigInt(0));

  const { data: currentNumber, refetch: refetchCurrentNumber } = useNumberQuery(
    {
      variables: { id: counterAddress[chainId as keyof typeof counterAddress] },
      chainId,
    }
  );

  const {
    data: numberSets,
    refetch: refetchNumberUpdates,
  } = useNumberSetsQuery(
    { variables: {}, chainId },
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
      <section className="flex w-full flex-col md:flex-row gap-4 md:gap-6 mx-auto p-4 md:p-6">
        <div className="w-full md:w-1/2 lg:w-1/3 ">
          <Card>
            <div className="p-6 flex flex-col gap-4">
              <p className="text-sm font-medium leading-none">Current number</p>
              <p>{currentNumber?.number?.value}</p>
            </div>
            <div className="p-6">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="number-input"
              >
                Number Input
              </label>
              <div className="flex gap-4 mt-2">
                <input
                  className="input input-primary"
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
          </Card>
        </div>
        <div className="w-full md:w-1/2 lg:w-2/3">
          <Card>
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Number Updates History
              </h3>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {numberSets?.map((numberSet, _index) => {
                  return (
                    <li className="py-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Update {_index + 1} at block {numberSet?.blockNumber}
                      </div>
                      <div className="text-lg">{numberSet.newValue}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default App;