
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Medicine, MedicineFormData } from '@/types/medicine';

interface MedicineFormProps {
  medicine?: Medicine;
  onSubmit: (data: MedicineFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export const MedicineForm = ({ 
  medicine, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: MedicineFormProps) => {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: '',
    dosage: '',
    time: ''
  });

  const [errors, setErrors] = useState<Partial<MedicineFormData>>({});

  useEffect(() => {
    if (medicine) {
      setFormData({
        name: medicine.name,
        dosage: medicine.dosage,
        time: medicine.time
      });
    }
  }, [medicine]);

  const validateForm = (): boolean => {
    const newErrors: Partial<MedicineFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do medicamento é obrigatório';
    }

    if (!formData.dosage.trim()) {
      newErrors.dosage = 'Dosagem é obrigatória';
    }

    if (!formData.time) {
      newErrors.time = 'Horário é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof MedicineFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-lg font-semibold text-gray-700">
              Nome do Medicamento *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Ex: Paracetamol"
              className={`h-14 text-lg ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm font-medium">{errors.name}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="dosage" className="text-lg font-semibold text-gray-700">
              Dosagem *
            </Label>
            <Input
              id="dosage"
              type="text"
              value={formData.dosage}
              onChange={(e) => handleInputChange('dosage', e.target.value)}
              placeholder="Ex: 500mg, 1 comprimido, 10ml"
              className={`h-14 text-lg ${errors.dosage ? 'border-red-500' : ''}`}
            />
            {errors.dosage && (
              <p className="text-red-600 text-sm font-medium">{errors.dosage}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="time" className="text-lg font-semibold text-gray-700">
              Horário *
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`h-14 text-lg ${errors.time ? 'border-red-500' : ''}`}
            />
            {errors.time && (
              <p className="text-red-600 text-sm font-medium">{errors.time}</p>
            )}
          </div>

          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-bold bg-medicine-info hover:bg-blue-600 text-white"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Medicamento'}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full h-14 text-lg font-semibold border-2 hover:bg-gray-50"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
