
import { Medicine } from '@/types/medicine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Edit, Trash2, Clock } from 'lucide-react';

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
          <CardTitle className="text-xl font-semibold text-gray-900 flex-1 pr-2">
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
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💊</span>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Dosagem</p>
              <p className="text-gray-900 font-semibold text-lg">{medicine.dosage}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 text-sm">Horário</p>
              <p className="text-gray-900 font-semibold text-lg">{formatTime(medicine.time)}</p>
            </div>
          </div>
        </div>
        
        <div className={`p-3 rounded-lg ${
          medicine.taken ? 'bg-green-100' : 'bg-orange-50'
        }`}>
          <p className="text-sm text-gray-600 font-medium">Status:</p>
          <p className={`text-sm font-semibold ${
            medicine.taken ? 'text-green-700' : 'text-orange-700'
          }`}>
            {getTakenStatusText()}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            onClick={() => onMarkTaken(medicine.id, !medicine.taken)}
            className={`w-full h-14 text-lg font-semibold transition-all ${
              medicine.taken
                ? 'bg-orange-500 hover:bg-orange-600 text-white'
                : 'bg-medicine-success hover:bg-green-700 text-white'
            }`}
          >
            <Check className="w-6 h-6 mr-2" />
            {medicine.taken ? 'Desmarcar' : 'Marcar como Tomado'}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={() => onEdit(medicine.id)}
              className="h-12 border-2 hover:bg-blue-50"
            >
              <Edit className="w-5 h-5 mr-2" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onDelete(medicine.id)}
              className="h-12 border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
