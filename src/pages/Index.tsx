
import { useState } from 'react';
import { useMedicines } from '@/hooks/useMedicines';
import { MedicineCard } from '@/components/MedicineCard';
import { MedicineForm } from '@/components/MedicineForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MedicineFormData } from '@/types/medicine';
import { useToast } from '@/hooks/use-toast';

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medicine-info mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Carregando medicamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            💊 Controle de Medicamentos
          </h1>
          <p className="text-lg text-gray-600">
            Mantenha seus medicamentos organizados e nunca se esqueça de tomá-los
          </p>
        </div>

        {/* Estatísticas */}
        {viewMode === 'list' && totalMedicines > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-white border-2 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-medicine-info">{totalMedicines}</div>
                <div className="text-sm text-gray-600 font-medium">Total de Medicamentos</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-medicine-success">{takenToday}</div>
                <div className="text-sm text-gray-600 font-medium">Tomados Hoje</div>
              </CardContent>
            </Card>
            <Card className="bg-white border-2 border-orange-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{pendingToday}</div>
                <div className="text-sm text-gray-600 font-medium">Pendentes</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Conteúdo Principal */}
        {viewMode === 'list' && (
          <div className="space-y-6">
            <div className="flex justify-center">
              <Button
                onClick={() => setViewMode('add')}
                size="lg"
                className="h-16 px-8 text-xl font-bold bg-medicine-info hover:bg-blue-600 text-white shadow-lg"
              >
                ➕ Adicionar Novo Medicamento
              </Button>
            </div>

            {medicines.length === 0 ? (
              <Card className="bg-white border-2 border-dashed border-gray-300">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">💊</div>
                  <h3 className="text-xl-accessible font-semibold text-gray-700 mb-2">
                    Nenhum medicamento cadastrado
                  </h3>
                  <p className="text-lg text-gray-500 mb-6">
                    Comece adicionando seu primeiro medicamento para manter o controle da sua saúde.
                  </p>
                  <Button
                    onClick={() => setViewMode('add')}
                    size="lg"
                    className="h-14 px-8 text-lg font-bold bg-medicine-info hover:bg-blue-600 text-white"
                  >
                    Cadastrar Primeiro Medicamento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
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
          <div className="space-y-6">
            <MedicineForm
              onSubmit={handleAddMedicine}
              onCancel={handleCancel}
            />
          </div>
        )}

        {viewMode === 'edit' && editingId && (
          <div className="space-y-6">
            <MedicineForm
              medicine={getMedicineById(editingId)}
              onSubmit={handleUpdateMedicine}
              onCancel={handleCancel}
              isEditing={true}
            />
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Aplicativo desenvolvido para auxiliar no controle de medicamentos
          </p>
          <p className="text-xs mt-1">
            ⚕️ Consulte sempre seu médico sobre medicamentos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
