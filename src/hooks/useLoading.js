import { useEffect, useState } from "react";
import { loadingEmitter } from "../utils/LoadingEmitter";

export const useLoading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    loadingEmitter.on("start", start);
    loadingEmitter.on("end", end);

    return () => {
      loadingEmitter.off("start", start);
      loadingEmitter.off("end", end);
    };
  }, []);

  return { loading }; // ✅ QUAN TRỌNG
};