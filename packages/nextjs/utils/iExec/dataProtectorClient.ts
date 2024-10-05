import { useUserStore } from './user.store';
import {
  IExecDataProtector,
  IExecDataProtectorCore,
  IExecDataProtectorSharing,
} from '@iexec/dataprotector';
import { Eip1193Provider } from 'ethers';
import { type Connector } from 'wagmi';

let dataProtector: IExecDataProtectorCore | null = null;
let dataProtectorSharing: IExecDataProtectorSharing | null = null;

export function cleanDataProtectorSDK() {
  dataProtector = null;
}

export async function initDataProtectorSDK({
  connector,
}: {
  connector?: Connector;
}) {
  const provider = (await connector?.getProvider()) as Eip1193Provider;
  if (!provider) {
    cleanDataProtectorSDK();
    return;
  }

  const dataProtectorParent = new IExecDataProtector(provider);

  dataProtector = dataProtectorParent.core;
  dataProtectorSharing = dataProtectorParent.sharing;
}

export async function getDataProtectorClient(): Promise<{
  dataProtector: IExecDataProtectorCore;
  dataProtectorSharing: IExecDataProtectorSharing;
}> {
  if (!dataProtector) {
    const connector = useUserStore.getState().connector;
    await initDataProtectorSDK({ connector });
  }
  if (!dataProtector || !dataProtectorSharing) {
    throw new Error('iExecDataProtector is not initialized');
  }
  return { dataProtector, dataProtectorSharing };
}
