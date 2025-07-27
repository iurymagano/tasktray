# TaskTray

TaskTray é um gerenciador de tarefas multiplataforma (Linux, Windows e Mac) desenvolvido em Electron + React. Ele roda na bandeja do sistema, é leve, rápido e suporta atualização automática via GitHub Releases.

## Funcionalidades
- Gerencie tarefas de forma simples e rápida
- Interface moderna e responsiva
- Sincronização local (offline)
- Suporte a atalhos de teclado
- Atualizações automáticas (Windows/Mac)
- Instalação fácil para todos sistemas

## Como baixar e rodar
1. Acesse a página de [Releases](https://github.com/iurymagano/tasktray/releases) no GitHub.
2. Baixe o instalador mais recente para seu sistema operacional (Windows, Linux ou Mac).
3. Execute o instalador e siga as instruções na tela.
4. Após instalar, o aplicativo ficará disponível na bandeja do sistema (ícone de fantasminha).

## Como abrir e fechar o TaskTray
- Pressione `Ctrl + K` para abrir ou fechar a janela do TaskTray a qualquer momento.
- Ou clique duas vezes no ícone de fantasminha na bandeja do sistema para mostrar ou ocultar a janela.

## Build Manual (para desenvolvedores)
Para gerar instaladores localmente:
```sh
npm install
npm run build
npm run dist
```
Os arquivos estarão na pasta `dist/`.

## Atualizações automáticas
O app verifica e instala atualizações automaticamente quando há uma nova versão publicada nas releases do GitHub.

## Licença
MIT


TaskTray é um gerenciador de tarefas multiplataforma (Linux, Windows e Mac) desenvolvido em Electron + React. Ele roda na bandeja do sistema, é leve, rápido e suporta atualização automática via GitHub Releases.

## Funcionalidades
- Gerencie tarefas de forma simples e rápida
- Interface moderna e responsiva
- Sincronização local (offline)
- Suporte a atalhos de teclado
- Atualizações automáticas (Windows/Mac)
- Instalação fácil para todos sistemas

## Instalação
1. Baixe o instalador mais recente para seu sistema operacional na página de [Releases](https://github.com/iurymagano/tasktray/releases).
2. Execute o instalador e siga as instruções.

## Build Manual
Para gerar instaladores localmente:
```sh
npm install
npm run build
npm run dist
```
Os arquivos estarão na pasta `dist/`.

## Atualizações automáticas
O app verifica e instala atualizações automaticamente quando há uma nova versão publicada nas releases do GitHub.

## Licença
MIT


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
