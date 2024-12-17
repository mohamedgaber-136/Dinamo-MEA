# Project Name

![Project Screenshot](./Screenshot%202024-12-17%20184403.png)

## Overview
This project is a comprehensive CRUD (Create, Read, Update, Delete) application that demonstrates modern React development practices. It fetches data from APIs using **RTK Query**, manages state with **Redux Toolkit**, and showcases a responsive UI built with **Ant Design**.

---

## Key Features
- **API Integration**: Fetch data and manage API state with **RTK Query**.
- **Full CRUD Operations**: Add, edit, delete, and view items seamlessly.
- **Error Handling**: Errors are displayed as notifications using **Ant Design**'s notification component.
- **State Management**: Centralized state management with **Redux Toolkit** and persistence using **redux-persist**.
- **Validation**: Form validation with **Formik** and **Yup** for a smooth user experience.
- **Routing**: Navigation between pages implemented with **React Router DOM**.
- **Responsive UI**: Designed with **Ant Design** for a professional look and feel.

---

## Technologies Used
### Frontend
- **React** (v18.3.1): For building the user interface.
- **React DOM** (v18.3.1): DOM-specific methods for React components.
- **Ant Design** (v5.22.5): For a modern and responsive UI.
- **@ant-design/icons** (v5.5.2): For icons and visual enhancements.

### State Management
- **Redux** (v5.0.1): For state management.
- **Redux Toolkit** (v2.5.0): Simplifies Redux development.
- **Redux Persist** (v6.0.0): For persisting the Redux store.
- **React Redux** (v9.2.0): React bindings for Redux.

### API Handling
- **RTK Query** (via Redux Toolkit): For fetching data, caching, and handling loading/error states.

### Form Handling
- **Formik** (v2.4.6): For managing form state.
- **Yup** (v1.6.0): For form validation.

### Notifications
- **SweetAlert** (v2.1.2): For alert messages.
- **Ant Design Notification Component**: For error and success notifications.

---

## How It Works
1. **Fetching Data**:
   - **RTK Query** is used to fetch data from APIs.
   - Loading states are displayed using Ant Design components.
2. **CRUD Operations**:
   - Users can add, edit, delete, and view data items.
3. **Error Notifications**:
   - Errors during API calls are displayed as notifications using Ant Design's `notification` component.
4. **Form Validation**:
   - All forms are validated with **Formik** and **Yup**.

---

## Folder Structure
```
/src
├── components
├── pages
├── redux
│   ├── store.tsx
│   └── api.tsx
├── utils
└── App.tsx
```

---


## Development Environment Setup

### TypeScript + ESLint + Vite Configuration
To expand and enhance your development environment, configure TypeScript and ESLint with React in Vite as follows:

1. Install ESLint and TypeScript plugins:
   ```bash
   npm install eslint @typescript-eslint/parser eslint-plugin-react @vitejs/plugin-react
   ```

2. Configure ESLint for type checking:
   - Create or update the ESLint configuration file (`eslint.config.js`):
     ```js
     import react from 'eslint-plugin-react';
     import tseslint from '@typescript-eslint/eslint-plugin';

     export default tseslint.config({
       languageOptions: {
         parserOptions: {
           project: ['./tsconfig.node.json', './tsconfig.app.json'],
           tsconfigRootDir: import.meta.dirname,
         },
       },
       settings: { react: { version: '18.3' } },
       plugins: { react },
       rules: {
         ...react.configs.recommended.rules,
         ...react.configs['jsx-runtime'].rules,
       },
     });
     ```

3. Update ESLint rules for stricter linting:
   - Replace `tseslint.configs.recommended` with:
     - `tseslint.configs.recommendedTypeChecked`
     - Optionally, `...tseslint.configs.stylisticTypeChecked` for stylistic rules.

---

## Future Enhancements
- Add user authentication.
- Improve error handling with custom hooks.
- Add tests with Jest and React Testing Library.

---

## License
This project is licensed under the MIT License.

