import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BookOpenIcon, MailIcon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
interface ForgotPasswordProps {
  onBack: () => void;
}
export const ForgotPassword = ({
  onBack
}: ForgotPasswordProps) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    resetPassword
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    setError('');
    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setIsSubmitted(true);
    } catch (err) {
      setError(err.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8">
        <button onClick={onBack} className="mb-4 flex items-center text-indigo-600 hover:text-indigo-800">
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          <span>Back to login</span>
        </button>
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-3 rounded-full">
              <BookOpenIcon className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reset Your Password
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your email and we'll send you instructions to reset your
            password
          </p>
        </div>
        {error && <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
            {error}
          </div>}
        {isSubmitted ? <div className="text-center">
            <div className="mb-4 bg-green-50 text-green-700 p-4 rounded-lg">
              <p>Reset instructions have been sent to {email}</p>
              <p className="mt-2 text-sm">
                Please check your inbox and follow the instructions to reset
                your password.
              </p>
            </div>
            <button onClick={onBack} className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
              Return to Login
            </button>
          </div> : <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="you@example.com" required />
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              {isSubmitting ? <span>Sending instructions...</span> : <>
                  <span>Send Reset Instructions</span>
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </>}
            </button>
          </form>}
      </div>
    </div>;
};