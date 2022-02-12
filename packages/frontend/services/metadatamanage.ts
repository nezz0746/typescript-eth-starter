import axios from 'axios';

const WRAPPER_URL = process.env.NEXT_PUBLIC_WRAPPER_URL;

const metadataManager = axios.create({
  baseURL: WRAPPER_URL,
});

export const updateRegistry = ({ tokenID, streamID }: { tokenID: string; streamID: string }) => {
  return metadataManager.put('/registry', { tokenID, streamID });
};

export const getRegistry = (): Promise<Record<string, string>> => {
  return metadataManager.get('/registry').then((res) => res.data);
};
