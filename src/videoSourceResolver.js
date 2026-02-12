/**
 * Video Source Resolver Module
 * Pure logic layer for constructing outreach video filenames and 
 * Firebase Storage paths based on the identity provided by the 
 * Delivery Controller.
 */

import { deliveryController } from './deliveryController.js';

/**
 * Resolves the video source metadata for the current session.
 * * @returns {Object} { identity: string, filename: string, storagePath: string }
 */
export const getVideoSource = () => {
  const session = deliveryController.getSession();
  const rawId = session.identity.rawId;

  // Handle missing identity gracefully for internal consistency
  const identity = rawId || 'default-outreach';

  // Locked Convention: {identity}.mp4
  const filename = `${identity}.mp4`;

  // Locked Folder Structure: videos/{identity}.mp4
  const storagePath = `videos/${filename}`;

  return {
    identity,
    filename,
    storagePath
  };
};

/**
 * Exported interface for storage retrieval modules.
 */
export const videoSourceResolver = {
  getSource: getVideoSource
};