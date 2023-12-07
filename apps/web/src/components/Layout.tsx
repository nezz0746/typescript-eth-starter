import { Button } from "web-ui";
import ConnectButton from "./ConnectButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="navbar fixed bg-base-100 border-b z-20">
        <div className="flex-1">
          <Button className="btn btn-ghost text-lg">Home</Button>
        </div>
        <div className="flex flex-row gap-2">
          <ConnectButton />
        </div>
      </div>
      <main className="flex-1 mt-16">{children}</main>
    </div>
  );
};

export default Layout;
