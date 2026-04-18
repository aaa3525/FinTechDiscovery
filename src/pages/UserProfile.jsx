import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '../contexts/UserProfileContext';
import { validateProfileForm } from '../utils/validators';

const UserProfile = () => {
  const { profile, updateProfile, isProfileComplete } = useUserProfile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ riskTolerance: '', investmentHorizon: '', monthlyCapacity: '', liquidityPreference: '', investmentGoal: '' });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => { if (profile) setFormData(profile); }, [profile]);
  
  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' })); };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateProfileForm(formData);
    if (!validation.isValid) { setErrors(validation.errors); return; }
    updateProfile(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '8px' }}>Financial Profile</h1>
        <p style={{ textAlign: 'center', color: '#6c757d', marginBottom: '24px' }}>Tell us about your investment preferences</p>
        
        {isProfileComplete() && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>✓ Profile Complete - Get personalized recommendations</div>}
        {showSuccess && <div style={{ background: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>Profile saved successfully!</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}><h3>Risk Tolerance</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['conservative', 'moderate', 'aggressive'].map(risk => (<label key={risk} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: `1px solid ${formData.riskTolerance === risk ? '#0066cc' : '#ddd'}`, borderRadius: '8px', cursor: 'pointer', background: formData.riskTolerance === risk ? 'rgba(0,102,204,0.05)' : 'white' }}><input type="radio" name="riskTolerance" value={risk} checked={formData.riskTolerance === risk} onChange={handleChange} /><div><strong style={{ textTransform: 'capitalize' }}>{risk}</strong><div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{risk === 'conservative' ? 'Prefer capital preservation' : risk === 'moderate' ? 'Balance growth with risk' : 'Seek high returns'}</div></div></label>))}
            </div>{errors.riskTolerance && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.riskTolerance}</span>}
          </div>
          
          <div style={{ marginBottom: '24px' }}><h3>Investment Horizon</h3>
            <div style={{ display: 'flex', gap: '16px' }}>{['short', 'medium', 'long'].map(h => (<label key={h} style={{ flex: 1, padding: '12px', border: `1px solid ${formData.investmentHorizon === h ? '#0066cc' : '#ddd'}`, borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}><input type="radio" name="investmentHorizon" value={h} checked={formData.investmentHorizon === h} onChange={handleChange} style={{ marginRight: '8px' }} /><span style={{ textTransform: 'capitalize' }}>{h}</span></label>))}</div>{errors.investmentHorizon && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.investmentHorizon}</span>}
          </div>
          
          <div style={{ marginBottom: '24px' }}><h3>Monthly Investment Capacity (PKR)</h3><input type="number" name="monthlyCapacity" value={formData.monthlyCapacity} onChange={handleChange} placeholder="Enter amount" min="1000" step="1000" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />{errors.monthlyCapacity && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.monthlyCapacity}</span>}</div>
          
          <div style={{ marginBottom: '24px' }}><h3>Liquidity Preference</h3>
            <div style={{ display: 'flex', gap: '12px' }}>{['easy', 'moderate', 'locked'].map(l => (<label key={l} style={{ flex: 1, padding: '12px', border: `1px solid ${formData.liquidityPreference === l ? '#0066cc' : '#ddd'}`, borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}><input type="radio" name="liquidityPreference" value={l} checked={formData.liquidityPreference === l} onChange={handleChange} style={{ marginRight: '8px' }} /><span style={{ textTransform: 'capitalize' }}>{l}</span></label>))}</div>{errors.liquidityPreference && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.liquidityPreference}</span>}
          </div>
          
          <div style={{ marginBottom: '24px' }}><h3>Investment Goal</h3><select name="investmentGoal" value={formData.investmentGoal} onChange={handleChange} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}><option value="">Select a goal</option><option value="wealth">Wealth Building</option><option value="retirement">Retirement Planning</option><option value="emergency">Emergency Fund</option><option value="purchase">Specific Purchase</option></select>{errors.investmentGoal && <span style={{ color: '#dc3545', fontSize: '0.85rem' }}>{errors.investmentGoal}</span>}</div>
          
          <div style={{ display: 'flex', gap: '16px' }}><button type="button" onClick={() => setFormData({ riskTolerance: '', investmentHorizon: '', monthlyCapacity: '', liquidityPreference: '', investmentGoal: '' })} style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Reset</button><button type="submit" style={{ flex: 1, padding: '12px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Save Profile</button></div>
        </form>
        
        {isProfileComplete() && <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px solid #e0e0e0' }}><h3>Your Profile Summary</h3><div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginTop: '12px' }}><div><strong>Risk:</strong> {formData.riskTolerance}</div><div><strong>Horizon:</strong> {formData.investmentHorizon}</div><div><strong>Budget:</strong> PKR {parseInt(formData.monthlyCapacity).toLocaleString()}</div><div><strong>Liquidity:</strong> {formData.liquidityPreference}</div><div><strong>Goal:</strong> {formData.investmentGoal}</div></div><button onClick={() => navigate('/recommendations')} style={{ width: '100%', marginTop: '16px', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>View Recommendations →</button></div>}
      </div>
    </div>
  );
};

export default UserProfile;