/**
 * Identity Resolver Utility
 * Extracts the 'vid' parameter from the URL and provides formatted identity data.
 */

/**
 * Extracts the raw 'vid' parameter from the browser's current URL.
 * @returns {string|null} The raw identity key (e.g., 'elite-dental') or null if not found.
 */
export const getRawIdentity = () => {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('vid');
};

/**
 * Formats a raw identity key into a Title Case company name.
 * Example: 'elite-dental' -> 'Elite Dental'
 * @param {string} rawKey - The raw identity string to format.
 * @returns {string} The formatted company name or 'Company Name' as a fallback.
 */
export const getFormattedCompanyName = (rawKey) => {
  if (!rawKey) return '[Company Name]';

  return rawKey
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Helper to get both values in a single call.
 * @returns {Object} { rawId: string|null, companyName: string }
 */
export const resolveIdentity = () => {
  const rawId = getRawIdentity();
  const companyName = getFormattedCompanyName(rawId);
  
  return {
    rawId,
    companyName
  };
};