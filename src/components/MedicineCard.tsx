
import { Medicine } from '@/types/medicine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Edit, Trash2 } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkTaken: (id: string, taken: boolean) => void;
}

export const MedicineCard = ({ 
  medicine, 
  onEdit, 
  onDelete, 
  onMarkTaken 
}: MedicineCardProps) => {
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const getTakenStatusText = () => {
    if (medicine.taken && medicine.takenAt) {
      const takenTime = medicine.takenAt.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
      return `Tomado às ${takenTime}`;
    }
    return 'Ainda não tomado hoje';
  };

  return (
    <Card className={`transition-all duration-200 ${
      medicine.taken 
        ? 'bg-green-50 border-green-200' 
        : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl-accessible font-semibold text-gray-900">
            {medicine.name}
          </CardTitle>
          <Badge 
            variant={medicine.taken ? "default" : "secondary"}
            className={`text-sm px-3 py-1 ${
              medicine.taken 
                ? 'bg-green-100 text-green-800 border-green-200' 
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {medicine.taken ? 'Tomado' : 'Pendente'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-lg-accessible">
          <div>
            <p className="text-gray-600 font-medium">Dosagem:</p>
            <p className="text-gray-900 font-semibold">{medicine.dosage}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Horário:</p>
            <p className="text-gray-900 font-semibold">{formatTime(medicine.time)}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600 font-medium">Status:</p>
          <p className={`text-sm font-semibold ${
            medicine.taken ? 'text-green-700' : 'text-orange-700'
          }`}>
            {getTakenStatusText()}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            onClick={() => onMarkTaken(medicine.id, !medicine.taken)}
            className={`flex-1 h-12 text-lg font-semibold transition-all ${
              medicine.taken
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-medicine-success hover:bg-green-700 text-white'
            }`}
          >
            <Check className="w-5 h-5 mr-2" />
            {medicine.taken ? 'Desmarcar' : 'Marcar como Tomado'}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onEdit(medicine.id)}
              className="h-12 px-4 border-2 hover:bg-blue-50"
            >
              <Edit className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onDelete(medicine.id)}
              className="h-12 px-4 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <Trash2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
