import React, { createContext, useState, useContext, useEffect } from 'react';

const UserProfileContext = createContext();

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error('useUserProfile must be used within UserProfileProvider');
  return context;
};

export const UserProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (profile) localStorage.setItem('userProfile', JSON.stringify(profile));
    else localStorage.removeItem('userProfile');
  }, [profile]);

  const updateProfile = (newProfile) => setProfile(newProfile);
  const isProfileComplete = () => profile && profile.riskTolerance && profile.investmentHorizon && profile.monthlyCapacity && profile.liquidityPreference && profile.investmentGoal;

  const getRecommendations = (products) => {
    if (!isProfileComplete()) return [];
    
    const riskMapping = { conservative: ['low'], moderate: ['low', 'medium'], aggressive: ['low', 'medium', 'high'] };
    const horizonMapping = { short: ['short'], medium: ['short', 'medium'], long: ['short', 'medium', 'long'] };
    const liquidityMapping = { easy: ['easy'], moderate: ['easy', 'moderate'], locked: ['easy', 'moderate', 'locked'] };
    
    const allowedRisk = riskMapping[profile.riskTolerance] || ['low'];
    const allowedHorizon = horizonMapping[profile.investmentHorizon] || ['short'];
    const allowedLiquidity = liquidityMapping[profile.liquidityPreference] || ['easy'];
    
    let recommended = products.filter(p => 
      allowedRisk.includes(p.riskLevel) && 
      allowedHorizon.includes(p.timeHorizon) && 
      allowedLiquidity.includes(p.liquidity) && 
      p.minInvestment <= profile.monthlyCapacity
    );
    
    if (profile.riskTolerance === 'conservative') recommended = recommended.sort((a, b) => a.riskLevel === 'low' ? -1 : 1);
    else if (profile.riskTolerance === 'aggressive') recommended = recommended.sort((a, b) => b.expectedReturn - a.expectedReturn);
    else recommended = recommended.sort((a, b) => (b.expectedReturn / (b.riskLevel === 'low' ? 1 : 2)) - (a.expectedReturn / (a.riskLevel === 'low' ? 1 : 2)));
    
    return recommended.slice(0, 10);
  };

  return <UserProfileContext.Provider value={{ profile, updateProfile, isProfileComplete, getRecommendations }}>{children}</UserProfileContext.Provider>;
};