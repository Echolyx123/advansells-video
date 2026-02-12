/**
 * Firebase Retrieval Adapter Module
 * Asynchronously converts resolved storage paths into streamable 
 * download URLs via the Firebase Storage SDK.
 */

import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase.js';
import { videoSourceResolver } from './videoSourceResolver.js';

/**
 * Retrieves a streamable URL for the current outreach video session.
 * Connects the logic from videoSourceResolver to the Firebase Storage instance.
 * * @returns {Promise<Object>} { identity, storagePath, downloadURL }
 */
export const getRemoteVideoUrl = async () => {
  try {
    // 1. Obtain pathing metadata from the resolver
    const { identity, storagePath } = videoSourceResolver.getSource();

    // 2. Create a reference to the file in Firebase Storage
    const videoRef = ref(storage, storagePath);

    // 3. Retrieve the signed download URL
    const downloadURL = await getDownloadURL(videoRef);

    return {
      identity,
      storagePath,
      downloadURL,
      status: 'success'
    };
  } catch (error) {
    console.error("Advansells Retrieval Error:", error.message);
    
    return {
      identity: null,
      storagePath: null,
      downloadURL: null,
      status: 'error',
      message: error.message
    };
  }
};

/**
 * Exported interface for downstream delivery and playback modules.
 */
export const firebaseVideoAdapter = {
  fetchUrl: getRemoteVideoUrl
};