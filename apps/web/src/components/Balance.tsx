import { useAccount, useBalance } from "wagmi";

const Balance = (): JSX.Element => {
  const [{ data: accountData }] = useAccount();
  const [{ data }] = useBalance({
    addressOrName: accountData?.address,
  });

  return (
    <div>
      <p>
        {data?.formatted} {data?.symbol}
      </p>
    </div>
  );
};

export default Balance;
