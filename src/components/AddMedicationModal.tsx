import { useMedicationStore } from "../store/useMedicationStore";
import { MedicationForm } from "./MedicationForm";

export function AddMedicationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const addMedication = useMedicationStore((state) => state.addMedication);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addMedication({
      name: formData.get("name") as string,
      dosage: formData.get("dosage") as string,
      scheduledTime: formData.get("time") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
    });
    onClose();
  };
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <MedicationForm onClose={onClose} handleSubmit={handleSubmit} />
    </div>
  );
}
