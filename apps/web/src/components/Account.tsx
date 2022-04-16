import React, { useState } from "react";
import blockies from "blockies-ts";
import { useAccount, useConnect, useNetwork } from "wagmi";
import Balance from "./Balance";
import classNames from "classnames";
import { useTheme } from "../hooks/useTheme";
import Button from "./Button";

export function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(6, length), "...");
}

const Account = (): JSX.Element => {
  const [openSwitchNetwork, setOpenSwitchNework] = useState(false);
  const [{ data: connection }, connect] = useConnect();
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();
  const { style, networkProps } = useTheme();

  let blockieImageSrc: string;

  if (typeof window !== "undefined") {
    blockieImageSrc = blockies
      .create({ seed: accountData?.address as string | undefined })
      .toDataURL();
  }

  return (
    <div className="">
      {accountData ? (
        <div>
          <div className="flex flex-row">
            <div className="bg-accent group w-full py-3 px-2 flex items-center justify-between mr-2 border-gray-300 shadow-sm space-x-3 text-left">
              <div className="min-w-0 flex-1 flex flex-row items-center h-6 space-x-3">
                <span className="flex flex-col justify-center items-center rounded-lg">
                  <img
                    style={{ height: 30, width: 30 }}
                    // @ts-ignore
                    src={accountData?.ens?.avatar || blockieImageSrc}
                    className="rounded-full shadow-xl"
                    alt="blockie"
                  />
                </span>
                <span className="block min-w-0 flex-1">
                  <span className="block text-sm font-bold tracking-tighter text-secondary truncate">
                    {accountData?.ens?.name ||
                      truncateHash(accountData?.address)}
                  </span>
                  <span className="block text-sm font-medium text-secondary truncate">
                    <Balance />
                  </span>
                </span>
              </div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();

                setOpenSwitchNework(!openSwitchNetwork);
              }}
              className="bg-accent py-2 px-7 flex flex-row items-center cursor-pointer"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: style.color,
                }}
              />
              <p className="text-secondary text-sm ml-2">
                {networkData.chain?.name}
                {networkData.chain?.unsupported && "(unsupported)"}
              </p>
            </div>
          </div>
          {openSwitchNetwork && (
            <div className="flex absolute right-2 flex-col items-start rounded-md p-2 ">
              {switchNetwork &&
                networkData.chains.map((x, chainIndex) => {
                  return x.id === networkData.chain?.id ? null : (
                    <button
                      key={x.id}
                      onClick={() =>
                        switchNetwork(x.id).then(() => {
                          setOpenSwitchNework(false);
                        })
                      }
                      className={classNames({
                        "bg-accent py-2 px-7 flex flex-row items-center cursor-pointer":
                          true,
                        "mt-1": networkData.chains.length !== chainIndex,
                      })}
                    >
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{
                          backgroundColor: networkProps[x.id].style.color,
                        }}
                      />
                      <p className="text-sm">Switch to {x.name}</p>
                    </button>
                  );
                })}
              {switchNetworkError && <p>{switchNetworkError.message}</p>}
            </div>
          )}
        </div>
      ) : (
        <Button
          onClick={() => {
            connect(connection.connectors[0]);
          }}
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
};

export default Account;
