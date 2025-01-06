import { useWallet } from '@solana/wallet-adapter-react';
import { authService } from '../services/authService';

export const useAuth = () => {
  const { publicKey, connected } = useWallet();

  return {
    isAuthenticated: connected && publicKey !== null,
    isLoading: false,
    user: publicKey?.toString() || null,
    error: null
  };
};