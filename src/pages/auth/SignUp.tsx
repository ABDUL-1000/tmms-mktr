import React from 'react';

import { useRouter } from 'next/router';  // Import the `useRouter` hook from next/router
import SignupForm from '../../app/signup/page';

const SignupPage: React.FC = () => {
  const router = useRouter();  // Initialize the router object

  // Handle successful signup
  const handleSignupSuccess = () => {
    // Use `router.push()` to redirect the user to the login page
    router.push('/login');
  };

  return (
    <div className="signup-page">
      <SignupForm onSuccess={handleSignupSuccess} />
    </div>
  );
};

export default SignupPage;
