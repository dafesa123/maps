import React, { createContext, useContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdqfYp24TqXyoTR81VIkBOB1RgftasuJw",
  authDomain: "maps-8803a.firebaseapp.com",
  projectId: "maps-8803a",
  storageBucket: "maps-8803a.firebasestorage.app",
  messagingSenderId: "369802763154",
  appId: "1:369802763154:web:34a6f5b7ce4e90ba533f4b",
  measurementId: "G-Q7Z8WTSTWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Set up Google OAuth request
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'YOUR_ANDROID_CLIENT_ID', // Get this from Google Cloud Console
    iosClientId: '369802763154-q3cv0ksg7t945hj5e91t7chp8mhqk5ta.apps.googleusercontent.com', // Get this from Google Cloud Console
    clientId: '369802763154-3jd0ujnc6p8ka6vfc8sc65mskrq8ml03.apps.googleusercontent.com', // Get this from Google Cloud Console
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success') {
        // Handle the Google Sign-in result
        // You'll need to implement the token exchange with Firebase
        Alert.alert('Success', 'Google sign-in successful!');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 