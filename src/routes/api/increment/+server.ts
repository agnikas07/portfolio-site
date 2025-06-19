import admin from 'firebase-admin';
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const privateKey = env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  } catch (error: any) {
    console.error("Firebase Admin Initialization Error:", error.message);
  }
}

const db = admin.firestore();

/** @type {import('./$types').RequestHandler} */
export async function POST() {
  const documentId = import.meta.env.VITE_PUBLIC_FIRESTORE_DOCUMENT_ID;

  if (!documentId) {
    return json({ error: 'Firestore document ID not configured.' }, { status: 500 });
  }
  
  const counterRef = db.collection('counters').doc(documentId);
  
  try {
    await counterRef.update({
      count: admin.firestore.FieldValue.increment(1)
    });
    return json({ success: true });
  } catch (error) {
    console.error("Error incrementing counter:", error);
    return json({ error: 'Failed to update counter.' }, { status: 500 });
  }
}