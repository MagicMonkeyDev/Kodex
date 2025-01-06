import { useState, useEffect } from 'react';
import { Agent } from '../types/agent';
import { agentService } from '../services/agentService';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const data = await agentService.getAgents();
      setAgents(data);
      setError(null);
    } catch (err) {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setError('Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load agents');
      }
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agent: Omit<Agent, 'id' | 'creator' | 'created_at'>) => {
    try {
      console.log('Creating agent:', agent);
      const newAgent = await agentService.createAgent(agent);
      console.log('Agent created:', newAgent);
      // Add the new agent to the local state
      setAgents(prev => [newAgent, ...prev]);
      // Return the created agent to allow for success handling
      return newAgent;
    } catch (err) {
      console.error('Failed to create agent:', err);
      throw err;
    }
  };

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    try {
      const updatedAgent = await agentService.updateAgent(id, updates);
      setAgents(prev => prev.map(agent => 
        agent.id === id ? updatedAgent : agent
      ));
      return updatedAgent;
    } catch (err) {
      throw err;
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      await agentService.deleteAgent(id);
      setAgents(prev => prev.filter(agent => agent.id !== id));
    } catch (err) {
      throw err;
    }
  };

  return {
    agents,
    loading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
    refresh: loadAgents
  };
};