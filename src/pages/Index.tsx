
import { useState } from 'react';
import { useMedicines } from '@/hooks/useMedicines';
import { MedicineCard } from '@/components/MedicineCard';
import { MedicineForm } from '@/components/MedicineForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MedicineFormData } from '@/types/medicine';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus } from 'lucide-react';

type ViewMode = 'list' | 'add' | 'edit';

const Index = () => {
  const { 
    medicines, 
    loading, 
    addMedicine, 
    updateMedicine, 
    deleteMedicine, 
    markAsTaken,
    getMedicineById 
  } = useMedicines();
  
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddMedicine = (data: MedicineFormData) => {
    try {
      addMedicine(data);
      setViewMode('list');
      toast({
        title: "Medicamento cadastrado!",
        description: `${data.name} foi adicionado com sucesso.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao cadastrar",
        description: "Não foi possível cadastrar o medicamento.",
        variant: "destructive",
      });
    }
  };

  const handleEditMedicine = (id: string) => {
    setEditingId(id);
    setViewMode('edit');
  };

  const handleUpdateMedicine = (data: MedicineFormData) => {
    if (!editingId) return;
    
    try {
      updateMedicine(editingId, data);
      setViewMode('list');
      setEditingId(null);
      toast({
        title: "Medicamento atualizado!",
        description: `${data.name} foi atualizado com sucesso.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar o medicamento.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMedicine = (id: string) => {
    const medicine = getMedicineById(id);
    if (!medicine) return;

    if (window.confirm(`Tem certeza que deseja excluir o medicamento "${medicine.name}"?`)) {
      try {
        deleteMedicine(id);
        toast({
          title: "Medicamento excluído",
          description: `${medicine.name} foi removido da lista.`,
          variant: "default",
        });
      } catch (error) {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o medicamento.",
          variant: "destructive",
        });
      }
    }
  };

  const handleMarkTaken = (id: string, taken: boolean) => {
    const medicine = getMedicineById(id);
    if (!medicine) return;

    try {
      markAsTaken(id, taken);
      toast({
        title: taken ? "Medicamento marcado como tomado!" : "Medicamento desmarcado",
        description: taken 
          ? `${medicine.name} foi marcado como tomado.`
          : `${medicine.name} foi desmarcado.`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do medicamento.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setViewMode('list');
    setEditingId(null);
  };

  // Estatísticas rápidas
  const totalMedicines = medicines.length;
  const takenToday = medicines.filter(m => m.taken).length;
  const pendingToday = totalMedicines - takenToday;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-medicine-info mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-medium">Carregando medicamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 relative">
      {/* Header Mobile */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          {viewMode !== 'list' ? (
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="lg"
                onClick={handleCancel}
                className="p-2"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                {viewMode === 'add' ? 'Novo Medicamento' : 'Editar Medicamento'}
              </h1>
              <div className="w-10"></div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                💊 Meus Medicamentos
              </h1>
              <p className="text-gray-600">
                Controle seus medicamentos
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pb-20">
        {/* Estatísticas - apenas na lista */}
        {viewMode === 'list' && totalMedicines > 0 && (
          <div className="grid grid-cols-3 gap-3 my-6">
            <Card className="bg-white border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-medicine-info">{totalMedicines}</div>
                <div className="text-xs text-gray-600 font-medium">Total</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-medicine-success">{takenToday}</div>
                <div className="text-xs text-gray-600 font-medium">Tomados</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{pendingToday}</div>
                <div className="text-xs text-gray-600 font-medium">Pendentes</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conteúdo Principal */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {medicines.length === 0 ? (
              <Card className="bg-white border-2 border-dashed border-gray-300 mt-8">
                <CardContent className="p-8 text-center">
                  <div className="text-6xl mb-4">💊</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Nenhum medicamento cadastrado
                  </h3>
                  <p className="text-gray-500 mb-6 text-base">
                    Comece adicionando seu primeiro medicamento.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {medicines.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    onEdit={handleEditMedicine}
                    onDelete={handleDeleteMedicine}
                    onMarkTaken={handleMarkTaken}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {viewMode === 'add' && (
          <div className="mt-6">
            <MedicineForm
              onSubmit={handleAddMedicine}
              onCancel={handleCancel}
            />
          </div>
        )}

        {viewMode === 'edit' && editingId && (
          <div className="mt-6">
            <MedicineForm
              medicine={getMedicineById(editingId)}
              onSubmit={handleUpdateMedicine}
              onCancel={handleCancel}
              isEditing={true}
            />
          </div>
        )}
      </div>

      {/* Floating Action Button - apenas na tela de lista */}
      {viewMode === 'list' && (
        <div className="absolute bottom-6 right-6 z-20">
          <Button
            onClick={() => setViewMode('add')}
            size="lg"
            className="h-16 w-16 rounded-full bg-medicine-info hover:bg-blue-600 text-white shadow-lg"
          >
            <Plus className="w-8 h-8" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
