# Documento de Requisitos Funcionais - DHIS2 Audit Vision

Este documento descreve as funcionalidades, componentes e ações de cada módulo do sistema DHIS2 Audit Vision, baseando-se na estrutura de navegação definida no sistema.

## 1. Módulos Principais (Ativos)

### 1.1 Dashboard (Painel de Controle)
*   **Componentes:**
    *   Cards de Estatísticas: Resumo de total de alterações, saúde do sistema, score de segurança e alterações de alto risco.
    *   Gráfico de Linha (Recharts): Tendência de alterações ao longo do tempo.
    *   Gráfico de Rosca (Recharts): Distribuição de alterações por tipo (CREATE, UPDATE, DELETE).
    *   Tabela de Atividade Recente: Lista das últimas ações registradas.
*   **Ações:**
    *   Visualização rápida do estado geral da instância DHIS2.
    *   Navegação para detalhes de atividades através do ícone de visualização na tabela.

### 1.2 Change Explorer (Explorador de Alterações)
*   **Componentes:**
    *   Barra de Pesquisa Global: Busca por nome de objeto ou utilizador.
    *   Painel de Filtros: Filtros por grupo, tipo de metadado, utilizador, tipo de ação e intervalo de datas.
    *   Tabela de Auditoria: Lista detalhada com timestamp, utilizador, tipo, objeto e ação.
    *   Drawer de Detalhes (Slide-out): Exibe o "Diff" (antes vs depois), dependências e dados brutos (JSON).
*   **Ações:**
    *   Pesquisar e filtrar logs de auditoria.
    *   Expandir linhas para ver dependências aninhadas.
    *   Abrir drawer para inspeção detalhada de cada alteração.

### 1.3 User Audit (Auditoria de Utilizadores)
*   **Componentes:**
    *   Cards de Resumo: Total de utilizadores e utilizadores online no momento.
    *   Grid de Perfis: Cards individuais para cada utilizador com status (online/offline), papel (role) e volume de alterações.
    *   Painel de Detalhes do Utilizador: Slide-out com histórico completo de ações do utilizador selecionado.
*   **Ações:**
    *   Monitorar atividade em tempo real.
    *   Analisar o impacto individual de cada utilizador no sistema.

### 1.4 Severity Rules (Regras de Severidade)
*   **Componentes:**
    *   Tabela de Regras: Lista de regras configuradas (Nível, Ação, Tipo de Objeto).
    *   Formulário de Nova Regra: Seleção de ação, tipo de objeto e nível de severidade.
    *   Configuração de Notificações: Gestão de contatos de E-mail e WhatsApp (Group ID).
    *   Editor de Template: Campo para personalizar a mensagem de alerta com tags dinâmicas.
*   **Ações:**
    *   Criar, editar e excluir regras de alerta.
    *   Gerir contatos de destino para notificações.
    *   Personalizar o conteúdo das mensagens enviadas automaticamente.

### 1.5 Notifications (Centro de Notificações)
*   **Componentes:**
    *   Lista de Alertas: Cards categorizados por severidade (Alta, Média, Baixa).
    *   Filtros de Status: Abas para visualizar "Todas", "Não Lidas" e "Lidas".
    *   Contador de Pendências: Badge indicando o número de notificações não lidas.
*   **Ações:**
    *   Marcar notificações como lidas individualmente ou em massa.
    *   Descartar (dismiss) alertas resolvidos.

### 1.6 Documentation (Documentação)
*   **Componentes:**
    *   Busca de Artigos: Campo de pesquisa para ajuda e manuais.
    *   Categorias: Cards para início rápido, funcionalidades de auditoria, análise de dados e administração.
    *   Lista de Artigos Populares: Acesso rápido aos guias mais consultados.
*   **Ações:**
    *   Consultar guias de utilização e boas práticas de segurança.

### 1.7 Settings (Configurações)
*   **Componentes:**
    *   Seção de Notificações: Toggles para alertas por e-mail, apenas alto risco e resumo semanal.
    *   Gestão de Dados: Configuração de retenção de logs e backup automático.
*   **Ações:**
    *   Ajustar preferências globais do sistema.
    *   Configurar políticas de manutenção de dados.

## 2. Módulos Adicionais (Planeados/Ocultos)

### 2.1 Monitoring Groups (Grupos de Monitoramento)
*   **Componentes:** Interface para agrupar metadados específicos (ex: programas de HIV) para análise conjunta.
*   **Ações:** Criar e gerir agrupamentos lógicos de objetos monitorados.

### 2.2 System Health (Saúde do Sistema)
*   **Componentes:** Dashboard técnico com versão do DHIS2, status da base de dados e uptime.
*   **Ações:** Executar checklists de segurança e auditoria de completitude de dados.

### 2.3 Security Audit (Auditoria de Segurança)
*   **Componentes:** Monitoramento de permissões de partilha (Sharing) e logs de acesso crítico.
*   **Ações:** Identificar alterações de risco em acessos públicos.

### 2.4 Alerts (Alertas de Sistema)
*   **Componentes:** Visão consolidada de alertas técnicos de infraestrutura e integridade.

### 2.5 Trends (Tendências)
*   **Componentes:** Análise histórica de crescimento de metadados e score de estabilidade do sistema.

### 2.6 Profile (Perfil do Utilizador)
*   **Componentes:** Gestão de dados pessoais e alteração de senha do utilizador atual.

---
**Nota:** Este documento baseia-se na configuração de navegação definida em `sidebar-items.tsx`.
