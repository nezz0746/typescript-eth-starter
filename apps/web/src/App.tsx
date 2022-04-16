import { useState } from "react";
import { useContract, useSigner } from "wagmi";
import "./App.css";
import Account from "./components/Account";
import { getDeployment } from "deployments";
import { Greeter } from "types";
import { useEffect } from "react";
import { useNetwork } from "wagmi";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";

export default function App() {
  const [{ data: networkData }] = useNetwork();
  const [{ data: signer }] = useSigner();
  const [greeting, setGreeting] = useState("");

  const contract = useContract<Greeter>({
    addressOrName: getDeployment(networkData.chain?.id ?? 0).contracts.Greeter
      .address,
    contractInterface: getDeployment(networkData.chain?.id ?? 0).contracts
      .Greeter.abi,
    signerOrProvider: signer,
  });

  useEffect(() => {
    getGreeting();
  }, [contract]);

  const getGreeting = async () => {
    if (contract.signer) {
      const gt = await contract.greet();

      setGreeting(gt);
    }
  };

  return (
    <div className="px-2 bg-gradient-to-br from-accent to-secondary py-2 flex flex-col h-screen">
      <div className="flex flex-row p-2 justify-end bg-neutral shadow-lg">
        <Account />
      </div>
      <div className="flex-grow py-2">
        <div className="flex flex-row justify-center items-center h-full">
          <Card className="w-1/2">
            <label
              htmlFor="text"
              className="block text-sm font-medium text-secondary"
            >
              Greeter
            </label>
            <div className="mt-1">
              <Input
                name="greeter"
                id="greeter"
                value={greeting}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setGreeting(e.target.value);
                }}
                placeholder="Say hello !"
              />
            </div>
            <div className="pt-5">
              <div className="flex justify-end">
                <Button
                  onClick={async () => {
                    await (await contract.setGreeting(greeting)).wait();
                  }}
                >
                  Set
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
