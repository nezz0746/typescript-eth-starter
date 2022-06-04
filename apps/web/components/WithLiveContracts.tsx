import { useNetwork } from "wagmi";

export type WithLiveContractsProps = {
  chainId: number;
};

function withLiveContracts<T extends WithLiveContractsProps>(
  WrappedComponent: React.ComponentType<T>
) {
  const displayName = WrappedComponent.displayName || "Component";

  const ComponentWithLiveContracts = (
    props: Omit<T, keyof WithLiveContractsProps>
  ) => {
    const { activeChain } = useNetwork();

    if (activeChain?.unsupported) {
      return <p>Chain unsupported</p>;
    }

    if (!activeChain?.id) {
      return <p>Not active network</p>;
    }

    return <WrappedComponent {...(props as T)} chainId={activeChain.id} />;
  };

  ComponentWithLiveContracts.displayName = `withLiveContracts(${displayName})`;

  return ComponentWithLiveContracts;
}

export default withLiveContracts;
