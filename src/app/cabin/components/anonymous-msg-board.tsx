"use client"; // This directive marks the component as a Client Component

import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, onSnapshot, serverTimestamp, Timestamp, Firestore } from 'firebase/firestore';
import Draggable from 'react-draggable';

// Global variables provided by the Canvas environment (these would typically be environment variables in your project)
const appId = "1:4816657199:web:b55776de8f1354ac949fda";
const firebaseConfig = {
  apiKey: "AIzaSyAhLiCKwp5_blHmxMK9gMss2eQMdUW5irs",
  authDomain: "playing-with-fire-54b9f.firebaseapp.com",
  projectId: "playing-with-fire-54b9f",
  storageBucket: "playing-with-fire-54b9f.firebasestorage.app",
  messagingSenderId: "4816657199",
  appId: "1:4816657199:web:b55776de8f1354ac949fda"
};
const initialAuthToken = null;

interface msgBoardProps {
  isOpen: boolean;
  onClose: ()=> void;
}

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: Timestamp; // Firestore's Timestamp type
  userId: string;
}

export function MsgBoard({isOpen, onClose}: msgBoardProps) {
  const [name, setName] = useState<string>('');
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]); // Explicitly type the messages array
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [db, setDb] = useState<Firestore | null>(null); // Type as Firestore or null
  const [auth, setAuth] = useState<unknown>(null); // Type as 'unknown' or specific Auth type if needed
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);
  const myRef = useRef(null);

  // Initialize Firebase and handle authentication
  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const firestore = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestore);
      setAuth(firebaseAuth);

      // Listen for auth state changes
      const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          // Sign in anonymously if no user is found or initial token is not provided
          try {
            if (initialAuthToken) {
              await signInWithCustomToken(firebaseAuth, initialAuthToken);
            } else {
              await signInAnonymously(firebaseAuth);
            }
          } catch (authError: unknown) { // Catch error with 'unknown' type
            console.error("Firebase Auth Error:", authError);
            setError("Failed to authenticate. Please try again.");
          }
        }
        setIsAuthReady(true); // Mark auth as ready after initial check
      });

      return () => unsubscribeAuth();
    } catch (err: unknown) { // Catch error with 'unknown' type
      console.error("Firebase initialization error:", err);
      setError("Failed to initialize Firebase. Check console for details.");
      setLoading(false);
    }
  }, []); // Run once on component mount

  // Fetch messages from Firestore
  useEffect(() => {
    if (!db || !isAuthReady) {
      return; // Wait for Firebase and auth to be ready
    }

    setLoading(true);
    const messagesCollectionRef = collection(db, `artifacts/${appId}/public/data/messages`);
    // Note: orderBy is commented out to avoid potential index errors.
    // Data will be sorted client-side.
    const q = query(messagesCollectionRef); // , orderBy('timestamp', 'desc')

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Map and explicitly cast each doc's data to the Message interface
      const fetchedMessages: Message[] = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        message: doc.data().message,
        timestamp: doc.data().timestamp,
        userId: doc.data().userId,
      }));

      // Sort messages by timestamp client-side (descending)
      fetchedMessages.sort((a, b) => {
        const timeA = a.timestamp?.toDate ? a.timestamp.toDate().getTime() : 0;
        const timeB = b.timestamp?.toDate ? b.timestamp.toDate().getTime() : 0;
        return timeB - timeA;
      });

      setMessages(fetchedMessages);
      setLoading(false);
    }, (err: unknown) => { // Catch error with 'unknown' type
      console.error("Error fetching messages:", err);
      setError("Failed to load messages. Please try again.");
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, [db, isAuthReady, appId]); // Re-run if db or auth state changes

  const handleSubmit = async (e: React.FormEvent) => { // Type the event
    e.preventDefault();
    if (!db || !isAuthReady) {
      setError("Firebase not ready. Please wait.");
      return;
    }
    if (!messageText.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setLoading(true);
    setError(null);

    // Ensure the object matches the Message interface structure for posting
    const messageToPost: Omit<Message, 'id'> = { // Omit 'id' as it's generated by Firestore
      name: name.trim() === '' ? 'Anonymous' : name.trim(),
      message: messageText.trim(),
      timestamp: serverTimestamp() as Timestamp, // Cast serverTimestamp to Timestamp
      userId: userId as string, // Cast userId to string as it's guaranteed to be non-null here
    };

    try {
      const messagesCollectionRef = collection(db, `artifacts/${appId}/public/data/messages`);
      await addDoc(messagesCollectionRef, messageToPost);
      setName('');
      setMessageText('');
    } catch (err: unknown) { // Catch error with 'unknown' type
      console.error("Error adding message:", err);
      setError("Failed to post message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Draggable nodeRef={myRef} cancel=".no-drag">
    <div ref={myRef} className={`absolute z-112 left-50 h-100 w-1/5 font-inter ${isOpen? 'visible' : 'hidden'}`}>
      <div className="bg-background rounded-lg p-2 w-full max-w-2xl border-1 border-black">

        <h1 className="text-lg font-bold text-center text-text cursor-default">message board</h1>
        <button className="absolute text-xl inline right-3 top-1 font-bold text-text mb-1 cursor-pointer no-drag" onClick={onClose}>[x]</button>

        <div className="mt-1 pt-6 border-t border-text">
            {error && (
          <div className="bg-white border border-accent-dark text-accent-dark px-4 py-3 rounded-md relative mb-4" role="alert">
            <strong className="font-bold text-red-700">error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}
          {loading && messages.length === 0 ? (
            <p className="text-center text-text cursor-default">loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-text cursor-default">no messages yet. be the first to post!</p>
          ) : (
            <div className="space-y-2 overflow-scroll overscroll-none h-50 max-h-75 no-drag">
              {messages.map((msg: Message) => ( // Type the map iteration variable
                <div key={msg.id} className="bg-accent-light pl-2 pt-2 rounded-lg shadow-sm transition duration-200 ease-in-out hover:shadow-md">
                  <p className="text-accent-dark text-base">{msg.message}</p>
                  <p className="text-sm text-accent-dark opacity-70 font-small">
                    — {msg.name}
                    {msg.timestamp && (
                      <span className="text-accent-dark ml-2 text-xs">
                        ({new Date(msg.timestamp.toDate()).toLocaleString()})
                      </span>
                    )}
                  </p>
                  {/* Display userId for multi-user context, useful for debugging/identification */}
                  {msg.userId && (
                    <p className="text-[8px] text-accent-dark opacity-50">User ID: {msg.userId}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} // Type the event
              placeholder="anonymous"
              className="block w-full px-2 py-1 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out no-drag"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-text mb-1">Message</label>
            <textarea
              id="message"
              value={messageText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessageText(e.target.value)}
              placeholder="Write your message here..."
              rows={2}
              required
              className="block w-full px-2 py-1 border border-black rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-base transition duration-150 ease-in-out resize-y no-drag"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading || !isAuthReady}
            className="w-full bg-accent-dark text-white py-1 px-4 rounded-md shadow-lg hover:bg-accent-dark-700 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed no-drag"
          >
            {loading ? 'Posting...' : 'Post Message'}
          </button>
        </form>


      </div>
    </div>
    </Draggable>
  );
}

export default MsgBoard;
