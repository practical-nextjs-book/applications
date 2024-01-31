export function getImageElementFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        resolve(image);
      };
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function resizePhoto({
  image,
  size,
}: {
  image: HTMLImageElement;
  size: number;
}): Promise<Blob> {
  return new Promise((resolve) => {
    const [w, h] = [image.width, image.height];
    const max = Math.max(w, h);
    const ratio = max === w ? w / h : h / w;
    const width = max === w ? size : size / ratio;
    const height = max === h ? size : size / ratio;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
    ctx.canvas.toBlob(
      (result) => {
        if (!result) throw new Error("Failed to convert canvas to blob");
        resolve(result);
      },
      "image/jpeg",
      0.8,
    );
  });
}
