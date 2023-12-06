import classNames from "classnames";
import * as blockies from "blockies-ts";

type WalletButtonProps = {
  address: string;
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function WalletButton({
  className,
  address,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & WalletButtonProps) {
  return (
    <button {...rest} className={classNames("btn", className)}>
      <img src={blockies.create({ seed: address }).toDataURL()} />
      {truncateAddress(address)}
    </button>
  );
}
