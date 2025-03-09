const defaultOrigin = process.env.NEXT_PUBLIC_HOST_URL;
const backupOrigin = process.env.NEXT_PUBLIC_HOST_BACKUP_URL;

export const getOrigin = () => {
  if (typeof window !== 'undefined') {
    if (window.location.origin === defaultOrigin) {
      return defaultOrigin;
    } else {
      return backupOrigin;
    }
  }
  return undefined;
};
