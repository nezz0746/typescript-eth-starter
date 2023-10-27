import Link from "next/link";
import { ReactElement } from "react";
import useAnvil from "../hooks/useAnvil";
import ConnectButton from "./ConnectButton";
import useChain from "../hooks/useChain";

const Layout = ({ children }: { children: ReactElement }) => {
  const { selfFund } = useAnvil();
  const { isLocal } = useChain();

  return (
    <div className="border flex flex-col h-screen">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"}>
            <div className="btn btn-ghost normal-case text-xl">Home</div>
          </Link>
        </div>
        <div className="flex flex-row gap-2">
          {isLocal && (
            <button
              className="btn btn-outline"
              onClick={() => {
                selfFund();
              }}
            >
              Get ETH
            </button>
          )}
          <ConnectButton />
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
