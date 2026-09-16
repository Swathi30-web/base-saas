import { Link } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';

export default function Confirm() {
  return (
    <div className="min-h-screen bg-[#F6F6FB] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-card w-full max-w-md p-10 sm:p-12 text-center">
        <div className="relative w-28 h-28 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-8">
          <span className="absolute text-lg -top-1 left-3">✨</span>
          <span className="absolute text-lg top-2 right-1">✨</span>
          <span className="absolute text-lg bottom-0 left-0">✨</span>
          <ThumbsUp size={40} className="text-primary-500 fill-primary-500" />
        </div>
        <p className="text-lg font-semibold text-gray-800 mb-8">Your account successfully created.</p>
        <Link to="/" className="btn-primary inline-flex">Go to Home</Link>
      </div>
    </div>
  );
}
