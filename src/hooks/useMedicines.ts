
import { useState, useEffect } from 'react';
import { Medicine, MedicineFormData } from '@/types/medicine';

const STORAGE_KEY = 'medicines-app-data';

export const useMedicines = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Converter strings de data de volta para objetos Date
        const medicinesWithDates = parsedData.map((medicine: any) => ({
          ...medicine,
          createdAt: new Date(medicine.createdAt),
          updatedAt: new Date(medicine.updatedAt),
          takenAt: medicine.takenAt ? new Date(medicine.takenAt) : undefined,
        }));
        setMedicines(medicinesWithDates);
      }
    } catch (error) {
      console.error('Erro ao carregar medicamentos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar no localStorage sempre que medicines mudar
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
      } catch (error) {
        console.error('Erro ao salvar medicamentos:', error);
      }
    }
  }, [medicines, loading]);

  const addMedicine = (medicineData: MedicineFormData): Medicine => {
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      ...medicineData,
      taken: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setMedicines(prev => [...prev, newMedicine]);
    return newMedicine;
  };

  const updateMedicine = (id: string, medicineData: MedicineFormData): Medicine | null => {
    setMedicines(prev => 
      prev.map(medicine => 
        medicine.id === id 
          ? { ...medicine, ...medicineData, updatedAt: new Date() }
          : medicine
      )
    );
    
    return medicines.find(m => m.id === id) || null;
  };

  const deleteMedicine = (id: string): boolean => {
    setMedicines(prev => prev.filter(medicine => medicine.id !== id));
    return true;
  };

  const markAsTaken = (id: string, taken: boolean = true): boolean => {
    setMedicines(prev => 
      prev.map(medicine => 
        medicine.id === id 
          ? { 
              ...medicine, 
              taken, 
              takenAt: taken ? new Date() : undefined,
              updatedAt: new Date()
            }
          : medicine
      )
    );
    return true;
  };

  const getMedicineById = (id: string): Medicine | undefined => {
    return medicines.find(medicine => medicine.id === id);
  };

  // Resetar status "tomado" no início de cada dia
  const resetDailyStatus = () => {
    const today = new Date().toDateString();
    setMedicines(prev => 
      prev.map(medicine => {
        const takenToday = medicine.takenAt && 
          medicine.takenAt.toDateString() === today;
        
        if (!takenToday && medicine.taken) {
          return { ...medicine, taken: false, takenAt: undefined };
        }
        return medicine;
      })
    );
  };

  // Verificar se precisa resetar status diário
  useEffect(() => {
    resetDailyStatus();
  }, []); // Roda apenas uma vez ao montar o componente

  return {
    medicines,
    loading,
    addMedicine,
    updateMedicine,
    deleteMedicine,
    markAsTaken,
    getMedicineById,
  };
};
