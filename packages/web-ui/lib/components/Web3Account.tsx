import * as blockies from "blockies-ts";

export type Web3AccountProps = {
  address: string;
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function Web3Account({
  address,
}: React.HTMLAttributes<HTMLDivElement> & Web3AccountProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <img
        src={blockies.create({ seed: address?.toLowerCase() }).toDataURL()}
      />
      {truncateAddress(address)}
    </div>
  );
}
