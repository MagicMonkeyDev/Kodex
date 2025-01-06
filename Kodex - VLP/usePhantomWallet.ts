import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { isPhantomInstalled, openPhantomInstall } from '../utils/wallet';

export const usePhantomWallet = () => {
  const { connected, connecting, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [hasPhantom, setHasPhantom] = useState(false);

  useEffect(() => {
    setHasPhantom(isPhantomInstalled());
  }, []);

  const handleConnect = async () => {
    if (!hasPhantom) {
      const shouldInstall = window.confirm(
        'Phantom wallet is required. Would you like to install it now?'
      );
      if (shouldInstall) {
        openPhantomInstall();
      }
      return;
    }
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return {
    connected,
    connecting,
    publicKey,
    hasPhantom,
    handleConnect,
    handleDisconnect
  };
};