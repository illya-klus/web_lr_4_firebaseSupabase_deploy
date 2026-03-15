import supabase from "./supabaseInit";

// export const uploadImage = async (productId: string, imagePath: string) => {
//   const response = await fetch(imagePath);
//   const blob = await response.blob();

//   const fileName = imagePath.split("/").pop();

//   const { data, error } = await supabase.storage
//     .from("products_images")
//     .upload(`${productId}/${fileName}`, blob, {
//       upsert: true,
//     });

//   if (error) {
//     console.error("Upload error:", error);
//     return null;
//   }

//   return data;
// };

export const getImageByFolder = async (
  folderName: string,
): Promise<string | null> => {
  // Беремо список файлів у папці
  const { data: files, error } = await supabase.storage
    .from("products_images") // тут ім'я твого bucket
    .list(folderName, { limit: 1 });

  if (error) {
    console.error("Error listing files:", error);
    return null;
  }

  if (!files || files.length === 0) return null;

  // Повертаємо public URL першого файлу
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("products_images")
    .getPublicUrl(`${folderName}/${files[0].name}`);

  return publicUrl || null;
};
