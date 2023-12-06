import ConnectButton from "./ConnectButton";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="btn btn-ghost normal-case text-xl">Home</div>
        </div>
        <div className="flex flex-row gap-2">
          <ConnectButton />
        </div>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
