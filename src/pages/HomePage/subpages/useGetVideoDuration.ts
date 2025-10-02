export async function getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.onloadedmetadata = () => {
        resolve(video.duration); // długość wideo w sekundach
      };

      video.onerror = () => {
        reject(new Error("Błąd podczas odczytu długości wideo"));
      };

      const url = URL.createObjectURL(file);
      video.src = url;
    });
  }