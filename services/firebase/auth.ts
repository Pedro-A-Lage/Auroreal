import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { UserProfile, RegisterData } from '../../types/user';

const googleProvider = new GoogleAuthProvider();

/**
 * Registrar novo usuario com email/senha
 */
export async function registerWithEmail(data: RegisterData): Promise<UserCredential> {
    const { email, password, name, cpf, phone } = data;

    // Criar usuario no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Atualizar displayName
    await updateProfile(user, { displayName: name });

    // Criar perfil no Firestore
    await createUserProfile(user, { name, cpf, phone });

    return userCredential;
}

/**
 * Login com email/senha
 */
export async function loginWithEmail(email: string, password: string): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    // Atualizar lastLoginAt
    await updateLastLogin(userCredential.user.uid);

    return userCredential;
}

/**
 * Login/Registro com Google
 */
export async function loginWithGoogle(): Promise<UserCredential> {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Verificar se ja existe perfil
    const profileExists = await checkUserProfileExists(user.uid);

    if (!profileExists) {
        // Criar perfil para novos usuarios Google
        await createUserProfile(user, {
            name: user.displayName || '',
        });
    } else {
        await updateLastLogin(user.uid);
    }

    return userCredential;
}

/**
 * Logout
 */
export async function logout(): Promise<void> {
    await signOut(auth);
}

/**
 * Enviar email de recuperacao de senha
 */
export async function resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
}

/**
 * Criar perfil do usuario no Firestore
 */
async function createUserProfile(
    user: User,
    additionalData: { name?: string; cpf?: string; phone?: string }
): Promise<void> {
    const userRef = doc(db, 'users', user.uid);

    const profile: Omit<UserProfile, 'uid'> = {
        email: user.email || '',
        displayName: additionalData.name || user.displayName || '',
        cpf: additionalData.cpf,
        phone: additionalData.phone,
        photoURL: user.photoURL || undefined,
        isAdmin: false,
        createdAt: serverTimestamp() as any,
        updatedAt: serverTimestamp() as any,
        lastLoginAt: serverTimestamp() as any,
    };

    await setDoc(userRef, profile);
}

/**
 * Verificar se perfil existe
 */
async function checkUserProfileExists(uid: string): Promise<boolean> {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);
    return snapshot.exists();
}

/**
 * Atualizar ultimo login
 */
async function updateLastLogin(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
}

/**
 * Buscar perfil do usuario
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const userRef = doc(db, 'users', uid);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
        return null;
    }

    return {
        uid,
        ...snapshot.data(),
    } as UserProfile;
}

/**
 * Atualizar perfil do usuario
 */
export async function updateUserProfile(
    uid: string,
    data: Partial<Omit<UserProfile, 'uid' | 'createdAt' | 'isAdmin'>>
): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await setDoc(
        userRef,
        {
            ...data,
            updatedAt: serverTimestamp(),
        },
        { merge: true }
    );
}
