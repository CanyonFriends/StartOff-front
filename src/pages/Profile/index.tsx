import React from 'react';
import ProfileTemplate from './template';

function Profile() {
  return (
    <ProfileTemplate
      editableAuthority
      nickname="nickname"
      introduce=""
      imageUrl=""
      github=""
      blog=""
      tagContents={[]}
    />
  );
}

export default Profile;
