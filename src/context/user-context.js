import React, { useEffect, useState } from 'react';
import { useAuth0 } from './auth-context';

export const UserContext = React.createContext();

// Purposely separating the userProfile from auth because most of any logic added here will eventually need to go away
// as we clean up our auth implementation system wide.
export function UserProvider(props) {
  const { userProfile, setUserProfile } = useAuth0();
  const [profile, setProfile] = useState({});

  // We are making a copy of userProfile from auth and changing it. Don't want to keep two copies of the profile in memory.
  useEffect(() => {
    if (!profile.resources && userProfile.resources) {
      // There are lots of resources in this array that are included for backwards compat, remove those so we don't have to loop over them again.
      const resources = userProfile?.resources?.filter(
        r => !Boolean(r.conditions)
      );
      const filteredProfile = {
        ...userProfile,
        resources
      };

      setProfile(filteredProfile);
      setUserProfile({});
    }
  }, [profile, userProfile, setUserProfile]);

  return <UserContext.Provider value={profile} {...props} />;
}

export function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }

  return context;
}
