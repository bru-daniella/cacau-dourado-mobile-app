# Cacau Dourado - Mobile App 🍫

Projeto acadêmico desenvolvido para a disciplina de [Nome da Disciplina/Curso] da [Nome da Instituição/Faculdade]. 

Trata-se de um aplicativo mobile de e-commerce especializado na venda de doces artesanais e gourmet, desenvolvido utilizando React Native e Expo.

## 🏗️ Arquitetura

Este projeto foi estruturado utilizando o padrão de arquitetura **MVVM (Model-View-ViewModel)**, visando uma melhor separação de responsabilidades, facilidade de manutenção e escalabilidade do código. 

A estrutura de pastas principal (localizada dentro de `app/` ou `src/`) está organizada da seguinte forma:

- 📂 **`/components`**: Componentes visuais genéricos e reutilizáveis (ex: botões customizados, inputs, cards). Eles não possuem regras de negócio complexas, apenas recebem dados (props) e emitem eventos.
- 📂 **`/entities`** (Models): Contém as definições de tipagem e as classes/objetos que representam os dados puros do domínio da aplicação (ex: `Produto`, `Carrinho`, `Usuario`).
- 📂 **`/services`**: Responsável pela comunicação com APIs externas, banco de dados local ou qualquer lógica de integração e busca de dados.
- 📂 **`/views`** (Views e ViewModels): Contém as telas da aplicação. As regras de formatação de dados para exibição e a ponte entre a View e os Services são gerenciadas aqui (atuando como a camada de ViewModel utilizando Hooks customizados do React).

## 🚀 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**
- **[Expo](https://expo.dev/)**
- **[Expo Router](https://docs.expo.dev/router/introduction/)** (Navegação)
- **[React Native Paper](https://callstack.github.io/react-native-paper/)** (Biblioteca de UI)

## 🛠️ Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npx expo start
   ```

3. Leia o QR Code gerado no terminal com o aplicativo **Expo Go** no seu celular (Android ou iOS) ou aperte `a` para rodar em um emulador Android / `i` para o simulador iOS.
