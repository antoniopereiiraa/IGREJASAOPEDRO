# Portal Oficial da Igreja São Pedro

Portal web moderno, seguro, acessível e responsivo da Paróquia São Pedro, integrando a vida litúrgica, o Festejo do Padroeiro, o projeto de Capoeira e as parcerias socioculturais.

---

## 🚀 Modernização Tecnológica & Segurança

O projeto foi migrado de uma estrutura antiga de arquivos estáticos desestruturados e servidor obsoleto (`servor`) para uma arquitetura moderna e segura:

- **Vite 6**: Ferramenta de build de última geração com bundling ultrarrápido, suporte nativo a ES Modules e otimização automática de assets.
- **Segurança Reforçada**:
  - Cabeçalhos de segurança (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`).
  - Prevenção contra XSS e sanitização no manuseio de dados de formulário.
  - Links externos protegidos com `rel="noopener noreferrer"`.
  - Zero vulnerabilidades em dependências (`0 vulnerabilities`).
- **Acessibilidade & Padrões Web**:
  - HTML5 semântico com landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`).
  - Link de atalho acessível (*Skip-to-content*).
  - Suporte completo a navegação por teclado e botões com ARIA tags.
- **Design System Coerente**:
  - CSS Custom Properties com variáveis organizadas de cores, tipografia, elevações e espaçamentos.
  - Componentes reutilizáveis (Badges, Cards, Tabelas de Horários, Linha do Tempo e Modais).
  - Responsividade total (Desktop, Tablet e Mobile).

---

## 🏛️ Nova Estrutura de Páginas e Conteúdos

1. **[Festejo de São Pedro](file:///festejo.html)** (`festejo.html`):
   - História da devoção ao padroeiro na comunidade e raízes dos pescadores.
   - Programação oficial completa (Alvorada, Solene Novenário, Missa dos Pescadores, Tradicional Procissão Fluvial dos Barcos Enfeitados e Quermesse).
   - As 4 grandes tradições: Novenas, Grande Leilão Beneficente de Prendas, Comidas Típicas (peixe frito com pirão, caldos, canjica, quentão) e Música ao Vivo (forró pé-de-serra e quadrilhas).
   - Galeria interativa de edições anteriores com modal lightbox.

2. **[Capoeira & Atividades Culturais](file:///capoeira.html)** (`capoeira.html`):
   - Destaque ao Projeto Sociocultural e Roda de Capoeira São Pedro (aulas 100% gratuitas).
   - Quem ensina: Trajetória do Mestre Damião Silva.
   - Dias e horários das turmas (Infantil/Ginga Mirim, Juventude & Adultos e Roda Aberta Comunitária).
   - História e fundamentos da capoeira (bateria de berimbaus, atabaque, ritmo e cidadania).
   - Galeria de fotos das rodas e batizados de cordão.
   - Outras oficinas culturais (música, bordado tradicional e teatro).

3. **[Agenda Inteligente](file:///agenda.html)** (`agenda.html`):
   - Separação clara e intuitiva entre **Eventos Culturais & Tradição** e **Eventos Litúrgicos & Paroquiais**.
   - Abas com filtros dinâmicos em tempo real sem recarregar a página.
   - Botão **"Salvar no Calendário"** que gera arquivo padrão `.ics` (iCalendar) para Google Agenda, Apple Calendar e Outlook.

4. **[Parcerias Institucionais com Secretarias](file:///index.html)**:
   - Destaque oficial de honra para a **Secretaria Municipal de Cultura** pelo fomento ao projeto de Capoeira, salvaguarda do patrimônio imaterial da festa e apoio aos artistas locais.
   - Menção às Secretarias de Turismo, Assistência Social, Esporte e Educação.
   - Selos culturais integrados na Home, na página do Festejo, na página de Cultura e no rodapé oficial.

---

## 💻 Como Rodar o Projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- NPM

### 1. Instalação das Dependências
```bash
npm install
```

### 2. Iniciar Servidor de Desenvolvimento
```bash
npm run dev
# ou
npm start
```
O servidor será aberto em `http://localhost:3000`.

### 3. Gerar Build de Produção
```bash
npm run build
```
Os arquivos otimizados e minificados serão gerados na pasta `dist/`.

### 4. Testar o Build Localmente
```bash
npm run preview
```

