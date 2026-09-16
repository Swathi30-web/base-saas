import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Recover() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F6FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-card w-full max-w-md p-10 sm:p-12">
        <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M3 15 L8 10 L12 13 L21 5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="8" cy="10" r="1.8" fill="white" />
            <circle cx="12" cy="13" r="1.8" fill="white" />
            <circle cx="21" cy="5" r="1.8" fill="white" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">Recover</h1>

        <form onSubmit={submit}>
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
          <input
            type="email"
            required
            placeholder="example@gmail.com"
            className="input-field mb-6"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-primary w-full">Reset Your Password</button>
        </form>
      </div>
    </div>
  );
}
