type Props = {
  message: string;
  onSubmit: () => void;
  onCancel: () => void; // виправив typo з onCansel
};

export default function ConfirmModal({ message, onSubmit, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      

      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 flex flex-col gap-6">
        

        <p className="text-gray-700 text-center text-lg font-semibold">{message}</p>
        
        <div className="flex justify-center gap-4 text-sm">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {onSubmit(); onCancel()}}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}