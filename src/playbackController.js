/**
 * Playback State Controller Module
 * Orchestrates the transition between video retrieval and playback states.
 * Manages loading, ready, and error conditions for the delivery session.
 */

import { firebaseVideoAdapter } from './firebaseVideoAdapter.js';

/**
 * Initializes a playback session by resolving the remote video URL 
 * and mapping the response to a structured state object.
 * * @returns {Promise<Object>} Playback session state.
 */
export const getPlaybackSession = async () => {
  // 1. Initial State: Starting retrieval
  let sessionState = {
    identity: null,
    downloadURL: null,
    status: {
      isLoading: true,
      isReady: false,
      isError: false,
      message: 'Initializing playback engine...'
    }
  };

  try {
    // 2. Execute Retrieval via Firebase Adapter
    const result = await firebaseVideoAdapter.fetchUrl();

    if (result.status === 'success') {
      // 3. Success State Transition
      sessionState = {
        identity: result.identity,
        downloadURL: result.downloadURL,
        status: {
          isLoading: false,
          isReady: true,
          isError: false,
          message: 'Stream ready.'
        }
      };
    } else {
      // 4. Managed Error State Transition (from Adapter)
      sessionState = {
        ...sessionState,
        identity: result.identity,
        status: {
          isLoading: false,
          isReady: false,
          isError: true,
          message: result.message || 'Failed to retrieve video source.'
        }
      };
    }
  } catch (criticalError) {
    // 5. Unhandled/Critical Error State Transition
    sessionState = {
      ...sessionState,
      status: {
        isLoading: false,
        isReady: false,
        isError: true,
        message: 'A critical error occurred during playback initialization.'
      }
    };
  }

  return sessionState;
};

/**
 * Exported interface for UI orchestration consumption.
 */
export const playbackController = {
  initSession: getPlaybackSession
};