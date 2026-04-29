import { useLoading } from "../../hooks/UseLoading";

export default function LoadingOverlay() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-400 border-t-transparent"></div>
    </div>
  );
}