import classNames from "classnames";
import { Web3Account, Web3AccountProps } from "./Web3Account";

type WalletButtonProps = Web3AccountProps;

export function WalletButton({
  className,
  address,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & WalletButtonProps) {
  return (
    <button {...rest} className={classNames("btn", className)}>
      <Web3Account address={address} />
    </button>
  );
}
