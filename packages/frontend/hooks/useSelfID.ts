import { useConnection } from '@self.id/framework';

const useSelfID = () => {
  const [connection, connect, disconnect] = useConnection();

  const login = async () => {
    await connect();
  };

  const logout = () => {
    disconnect();
  };

  return {
    login,
    logout,
    self: connection.status === 'connected' ? connection.selfID : null,
    authenticated: connection.status === 'connected',
    ceramic: connection.status === 'connected' && connection.selfID.client.ceramic,
  };
};

export default useSelfID;
