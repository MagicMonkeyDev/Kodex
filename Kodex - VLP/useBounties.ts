import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useAgents } from './useAgents';
import { Bounty, BountyStatus, BountyPoints } from '../types/bounty';
import { useLocalStorage } from './useLocalStorage';

interface ClaimedBounties {
  [id: number]: boolean;
}

const POINTS_KEY = 'bounty_points';

// Temporary mock data until we implement the backend
const mockBounties: Bounty[] = [
  {
    id: 1,
    title: "Create Your First Agent",
    description: "1. Click 'Create Agent' in the Agents page\n2. Configure your agent's personality and traits\n3. Add an avatar image\n4. Save your agent\n5. Return here to claim your bounty points!",
    reward: 5000,
    deadline: "7 days left",
    image: "https://i.imgur.com/XOGTct9.png",
    tags: ["AI", "Agents", "Neural Networks"],
    status: "open"
  }
];

export const useBounties = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const { publicKey, connected } = useWallet();
  const [claimError, setClaimError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { agents } = useAgents();
  const [bountyPoints, setBountyPoints] = useLocalStorage<BountyPoints[]>(POINTS_KEY, []);
  const walletAddress = publicKey?.toString();

  const getUserPoints = useCallback(() => {
    if (!walletAddress) return 0;
    const userPoints = bountyPoints.find(bp => bp.wallet === walletAddress);
    return userPoints?.points || 0;
  }, [walletAddress, bountyPoints]);

  const hasClaimedBounty = useCallback((bountyId: number) => {
    if (!walletAddress) return false;
    const userPoints = bountyPoints.find(bp => bp.wallet === walletAddress);
    return userPoints?.claimed_bounties.includes(bountyId) || false;
  }, [walletAddress, bountyPoints]);

  const hasAgentForWallet = useCallback(() => {
    if (!walletAddress) return false;
    return agents.some(agent => agent.creator_id === walletAddress);
  }, [agents, walletAddress]);

  useEffect(() => {
    // Simulate API call
    const loadBounties = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBounties(mockBounties);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load bounties');
      } finally {
        setLoading(false);
      }
    };

    loadBounties();
  }, []);

  const claimBounty = async (id: number) => {
    try {
      setClaimError(null);

      const bounty = bounties.find(b => b.id === id);
      if (!bounty) {
        setClaimError('Bounty not found');
        return;
      }
      
      if (!publicKey) {
        setClaimError('Please connect your wallet first');
        return;
      }

      // Check if bounty is already claimed by this user
      if (hasClaimedBounty(id)) {
        setClaimError('You have already claimed this bounty');
        return;
      }
      
      // Check if user has created an agent
      if (!hasAgentForWallet()) {
        setClaimError('You need to create an agent first to claim this bounty');
        return;
      }

      // Check if bounty is already claimed
      if (bounty.status === 'in_progress') {
        setClaimError('This bounty has already been claimed');
        return;
      }
      
      // Update user's bounty points
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const walletAddress = publicKey.toString();
      const existingUser = bountyPoints.find(bp => bp.wallet === walletAddress);

      if (existingUser) {
        setBountyPoints(bountyPoints.map(bp => 
          bp.wallet === walletAddress 
            ? {
                ...bp,
                points: bp.points + bounty.reward,
                claimed_bounties: [...bp.claimed_bounties, bounty.id]
              }
            : bp
        ));
      } else {
        setBountyPoints([
          ...bountyPoints,
          {
            wallet: walletAddress,
            points: bounty.reward,
            claimed_bounties: [bounty.id]
          }
        ]);
      }
      
      // Update local state
      setBounties(prev => prev.map(bounty => 
        bounty.id === id 
          ? { ...bounty, status: 'in_progress' as const } 
          : bounty
      ));
      setClaimError('Bounty claimed successfully! Start working on it now. Check your bounty points.');
    } catch (err) {
      throw err;
    }
  };

  return {
    bounties,
    loading,
    claimError,
    userPoints: getUserPoints(),
    claimedBounties: bountyPoints.find(bp => bp.wallet === publicKey?.toString())?.claimed_bounties.length || 0,
    hasClaimedBounty,
    error,
    claimBounty
  };
};