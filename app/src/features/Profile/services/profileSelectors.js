export const selectAuthUser = state => state?.auth?.userData || null;

const getInitials = fullName => {
  if (!fullName || typeof fullName !== 'string') {
    return 'U';
  }

  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return 'U';
  }

  return parts.map(part => part[0].toUpperCase()).join('');
};

export const selectProfileViewModel = state => {
  const user = selectAuthUser(state);
  const name = user?.name || 'Reader';
  const email = user?.email || 'No email available';
  const avatar = user?.avatar || null;

  return {
    name,
    email,
    avatar,
    initials: getInitials(name),
  };
};
