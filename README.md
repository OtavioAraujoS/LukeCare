# 🐶 LukeCare

O **LukeCare** é um dashboard moderno e intuitivo desenvolvido para gerir a rotina de medicação do Luke. O projeto foi construído para garantir que nenhuma dose seja esquecida, utilizando uma interface limpa e focada na experiência do utilizador, inspirada em sistemas de gestão de saúde de alta performance.

## 🚀 Tecnologias

Este projeto utiliza o que há de mais moderno no ecossistema de desenvolvimento front-end:

- **[React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/):** Base para uma interface reativa e com tipagem segura.
- **[Vite](https://vitejs.dev/):** Ferramenta de build de próxima geração para um desenvolvimento ultra-rápido.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Gestão de estado global leve e eficiente.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Estilização de última geração para um design fiel ao protótipo, sem overhead de configuração.
- **[Lucide React](https://lucide.dev/):** Conjunto de ícones consistentes para uma melhor navegação visual.

## ✨ Funcionalidades

- **Dashboard de Progresso:** Gráfico circular dinâmico que mostra a percentagem de conclusão das tarefas do dia.
- **Gestão de Medicamentos:** Cadastro completo de remédios com nome, dosagem, horários e período de tratamento (início/fim).
- **Checklist Diário:** Sistema de marcação simples para registar o que já foi ministrado.
- **Persistência Local:** Os dados são armazenados diretamente no navegador através do `localStorage`, funcionando como uma base de dados JSON no front-end que persiste mesmo após recarregar a página.

## 📦 Estrutura do Projeto

O código está organizado de forma modular para facilitar a manutenção e escalabilidade:

```text
src/
├── components/     # Componentes de UI (Modal, Gráfico, Listas)
├── store/          # Lógica do Zustand e persistência de dados
├── App.tsx         # Orquestrador do layout e dashboard principal
└── index.css       # Configuração do Tailwind v4
```

## ⚙️ Instalação e Configuração

### 1. Clonando o Repositório

```bash
git clone https://github.com/OtavioAraujoS/LukeCare.git
cd LukeCare
```

### 2. Instalando as Dependências

Utilizando o Bun, a instalação é muito rápida:

```bash
pnpm install
```

### 3. Rodando o Projeto

```bash
pnpm dev
```
