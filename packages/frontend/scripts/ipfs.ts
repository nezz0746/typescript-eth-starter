/* eslint-disable */
import ipfsAPI from 'ipfs-http-client';
import chalk from 'chalk';
import { clearLine } from 'readline';
import { IPFSHTTPClient } from 'ipfs-http-client/dist/src/types';
import { AddResult } from 'ipfs-core-types/src/root';
import { ImportCandidate } from 'ipfs-core-types/src/utils';

const { globSource, create } = ipfsAPI;

// run your own ipfs daemon: https://docs.ipfs.io/how-to/command-line-quick-start/#install-ipfs
// const localhost = { host: "localhost", port: "5001", protocol: "http" };

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const ipfsGateway = 'https://ipfs.io/ipfs/';
const ipnsGateway = 'https://ipfs.io/ipns/';

const addOptions = {
  pin: true,
};

const pushDirectoryToIPFS = async (path: string): Promise<AddResult | undefined> => {
  try {
    const response = await ipfs.add(
      globSource(path, { recursive: true }) as ImportCandidate,
      addOptions,
    );
    return response;
  } catch (e) {
    return undefined;
  }
};

const publishHashToIPNS = async (
  ipfsHash: string,
): Promise<{ name: string; value: string } | undefined> => {
  try {
    const response = await ipfs.name.publish(`/ipfs/${ipfsHash}`);
    return response;
  } catch (e) {
    return undefined;
  }
};

const nodeMayAllowPublish = (ipfsClient: IPFSHTTPClient) => {
  // You must have your own IPFS node in order to publish an IPNS name
  // This contains a blacklist of known nodes which do not allow users to publish IPNS names.
  const nonPublishingNodes = ['ipfs.infura.io'];
  const { host } = ipfsClient.getEndpointConfig();
  return !nonPublishingNodes.some((nodeUrl) => host.includes(nodeUrl));
};

const deploy = async () => {
  console.log('🛰  Sending to IPFS...');
  const pushedDir = await pushDirectoryToIPFS('./out');
  if (!pushedDir) {
    console.log(`📡 App deployment failed`);
    return false;
  }

  // cid: Content Identifier
  const { cid } = pushedDir;
  console.log(`📡 App deployed to IPFS with hash: ${chalk.cyan(cid.toString())}`);

  let ipnsName: string | undefined;
  if (nodeMayAllowPublish(ipfs)) {
    console.log(`✍️  Publishing /ipfs/${cid.toString()} to IPNS...`);
    process.stdout.write('   Publishing to IPNS can take up to roughly two minutes.\r');
    ipnsName = (await publishHashToIPNS(cid.toString()))?.name;
    if (!ipnsName) {
      console.log('   Publishing IPNS name on node failed.');
    }
    clearLine(process.stdout, 0);
    console.log(`🔖 App published to IPNS with name: ${chalk.cyan(ipnsName ?? '[next-dapp]')}`);
    console.log();
  }

  console.log('🚀 Deployment to IPFS complete!');
  console.log();

  console.log(`Use the link${ipnsName && 's'} below to access your app:`);
  console.log(`   IPFS: ${chalk.cyan(`${ipfsGateway}${cid.toString()}`)}`);
  if (ipnsName) {
    console.log(`   IPNS: ${chalk.cyan(`${ipnsGateway}${ipnsName}`)}`);
    console.log();
    console.log(
      'Each new deployment will have a unique IPFS hash while the IPNS name will always point at the most recent deployment.',
    );
    console.log(
      'It is recommended that you share the IPNS link so that people always see the newest version of your app.',
    );
  }
  console.log();
  return true;
};

deploy();
