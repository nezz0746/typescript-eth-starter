import axios from 'axios';

const WRAPPER_URL = process.env.NEXT_PUBLIC_WRAPPER_URL;

const metadataManager = axios.create({
  baseURL: WRAPPER_URL,
});

export const makeNewWordImage = async ({ word }: { word: string }): Promise<{ path: string }> => {
  return metadataManager.post('/word', { word }).then((res) => res.data);
};
