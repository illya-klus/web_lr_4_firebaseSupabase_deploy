import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseSetup";
import { getImageByFolder } from "../../supabase/imagesUpload";
// import { uploadImage } from "../../supabase/imagesUpload";

// import { products } from "../../data/products";

export type ProductDto = {
  id: string;
  brand: string;
  title: string;
  description: string;
  price: number;
  discount: number | null;
  stock: number;
  currency: string;
  image: string | null;
};

export const getProducts = async (): Promise<ProductDto[]> => {
  const productsCol = collection(db, "products");
  const snapshot = await getDocs(productsCol);

  const products = snapshot.docs.map((doc) => {
    const data = doc.data() as ProductDto;
    const { id, ...rest } = data; // прибираємо id з data

    return {
      id: doc.id,
      ...rest,
    };
  });

  // for (let product of products) {
  //   // await uploadImage(product.id, product.image);
  // }
  const productsWithImages = await Promise.all(
    products.map(async (product) => {
      const imageUrl = await getImageByFolder(product.id);
      return {
        ...product,
        image: imageUrl,
      };
    }),
  );

  return productsWithImages;
};

// export const writeProducts = async () => {
//   const productsCol = collection(db, "products");

//   for (let product of products) {
//     const { id, ...productData } = product; // видаляємо поле id
//     await addDoc(productsCol, productData);
//   }
// };
