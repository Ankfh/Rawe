/**
 * Utility for file validation
 */
export const isPdf = (file) => {
  if (!file) return false;
  
  // Check MIME type or extension
  const type = file.type || '';
  const name = file.name || '';
  
  return (
    type === 'application/pdf' || 
    name.toLowerCase().endsWith('.pdf')
  );
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
