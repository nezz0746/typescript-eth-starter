import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="border flex flex-col h-screen">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={"/"}>
            <div className="btn btn-ghost normal-case text-xl">Home</div>
          </Link>
        </div>
        <ConnectButton />
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
