
# 💊 Meus Medicamentos

Um aplicativo mobile para gerenciamento de medicamentos, desenvolvido especialmente para facilitar o controle diário de medicações para pessoas idosas e seus cuidadores.

## 📺 Vídeo de Demonstração

[Assista ao vídeo de demonstração no Google Drive](https://drive.google.com/file/d/1Vj8qvdFulC6OqFPPYuvCN_heiTZoknKz/view?usp=sharing)

## 📱 Sobre o Projeto

O **Meus Medicamentos** é uma aplicação web responsiva com interface mobile que permite o cadastro, controle e acompanhamento de medicamentos de forma simples e intuitiva. O app foi projetado com foco na usabilidade para pessoas idosas, com botões grandes, interface clara e navegação simplificada.

## ✨ Funcionalidades

- **📋 Cadastro de Medicamentos**: Adicione medicamentos com nome, dosagem e horário
- **✅ Controle de Medicação**: Marque medicamentos como tomados/não tomados
- **📊 Dashboard de Estatísticas**: Visualize medicamentos totais, tomados e pendentes
- **✏️ Edição de Medicamentos**: Modifique informações dos medicamentos cadastrados
- **🗑️ Exclusão de Medicamentos**: Remova medicamentos desnecessários
- **💾 Persistência Local**: Dados salvos no localStorage do navegador
- **🔄 Reset Diário**: Status "tomado" é resetado automaticamente a cada dia
- **📱 Interface Mobile**: Layout otimizado para dispositivos móveis
- **🎨 Design Responsivo**: Interface adaptável e amigável

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Tailwind CSS** - Framework de CSS utilitário

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone (https://github.com/leozinzao/health-aid-tracker)
cd meus-medicamentos
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
```

## 📖 Como Usar

1. **Adicionar Medicamento**: Clique no botão "+" para cadastrar um novo medicamento
2. **Marcar como Tomado**: Clique no botão de check ao lado do medicamento
3. **Editar Medicamento**: Clique no ícone de edição para modificar as informações
4. **Excluir Medicamento**: Clique no ícone de lixeira para remover o medicamento
5. **Visualizar Estatísticas**: Veja o resumo na parte superior da tela principal

## 🎯 Público-Alvo

- Pessoas idosas que precisam controlar medicação diária
- Cuidadores e familiares
- Qualquer pessoa que necessite de controle medicamentoso

## 💾 Armazenamento de Dados

Os dados são armazenados localmente no navegador usando `localStorage`, garantindo que as informações persistam entre sessões sem necessidade de conexão com internet.

## 🎨 Design

O aplicativo utiliza um simulador de celular com:
- Layout fixo similar a um smartphone
- Interface touch-friendly
- Botões grandes e acessíveis
- Cores suaves e contrastantes
- Tipografia legível

## 📝 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do Shadcn/UI
│   ├── MedicineCard.tsx    # Card de medicamento
│   └── MedicineForm.tsx    # Formulário de medicamento
├── hooks/              # Custom hooks
│   └── useMedicines.ts     # Hook para gerenciar medicamentos
├── pages/              # Páginas da aplicação
│   └── Index.tsx           # Página principal
├── types/              # Definições de tipos TypeScript
│   └── medicine.ts         # Tipos relacionados a medicamentos
└── lib/                # Utilitários e configurações
```

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o linter

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📞 Suporte

Em caso de dúvidas ou problemas, abra uma issue no repositório do projeto.

---

**Desenvolvido com ❤️ para facilitar o cuidado com a saúde**
