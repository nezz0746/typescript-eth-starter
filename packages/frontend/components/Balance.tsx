import { useEtherBalance, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import useCurrency from '../hooks/useCurrency';

const Balance = (): JSX.Element => {
  const currency = useCurrency();
  const { account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const finalBalance = etherBalance ? utils.formatEther(etherBalance) : '';

  return (
    <p className="font-light">
      {(+finalBalance).toFixed(4)} {currency}
    </p>
  );
};

export default Balance;
