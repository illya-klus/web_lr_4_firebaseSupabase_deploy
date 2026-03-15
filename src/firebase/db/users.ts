import {
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { User } from "../../features/auth/context/useAuthContext";
import { db } from "../firebaseSetup";

export const saveUserToFirestore = async (user: User) => {
  const userRef = doc(db, "users", user.userId); // uid як ID документа

  await setDoc(
    userRef,
    {
      userName: user.userName || "no_name",
      email: user.userEmail || "",
      phoneNumber: user.userPhoneNumber || "",
      role: "user",
      authStatus: "identify",
      photoUrl: user.photoUrl || "/public/images/avatar.jpg",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    },
    { merge: true }, // merge=true щоб не перезаписати старі поля
  );
};

// userId – ID документа, тобто uid користувача
export const updateUserField = async (
  userId: string,
  newName: string,
  email: string,
  phone: string,
) => {
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    userName: newName, // оновлюємо лише поле userName
    email: email,
    phoneNumber: phone,
  });
};

export const getUserById = async (userId: string): Promise<User | null> => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    let data = userSnap.data();
    let user = {
      role: data.role,
      authStatus: data.authStatus,
      userEmail: data.email,
      userName: data.userName,
      userPhoneNumber: data.phoneNumber,
      userId: userId,
      photoUrl: data.photoUrl,
    };

    return user; // повертає об’єкт з полями користувача
  } else {
    console.log("Такого користувача немає!");
    return null;
  }
};
