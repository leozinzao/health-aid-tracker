
export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  time: string;
  taken: boolean;
  takenAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicineFormData {
  name: string;
  dosage: string;
  time: string;
}
