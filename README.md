# Cacau Dourado - Mobile App 🍫

Projeto acadêmico desenvolvido para a disciplina de Programação para Dispositivos Móveis da universidade Newton Paiva Wyden. 

Trata-se de um aplicativo mobile de e-commerce especializado na venda de doces artesanais e gourmet, desenvolvido utilizando React Native e Expo.

## 🏗️ Arquitetura

Este projeto foi estruturado utilizando o padrão de arquitetura **MVVM (Model-View-ViewModel)** adaptado para o ecossistema React, visando uma melhor separação de responsabilidades, facilidade de manutenção e escalabilidade do código. 

A estrutura de pastas principal (localizada dentro de `app/`) está organizada da seguinte forma:

- 📂 **`/components`**: Componentes visuais genéricos e reutilizáveis (ex: cartões de produto, formulários de autenticação). Eles não possuem regras de negócio complexas, focando exclusivamente na UI e experiência do usuário (UX).
- 📂 **`/entities`** (Models): Contém as classes que moldam os objetos do sistema (ex: `ProdutoEntity`, `UsuarioEntity`). Garantem que os dados fluam pelo app sempre em um formato previsível.
- 📂 **`/services`**: Responsável por toda a lógica de negócio pesada, regras e persistência de dados. Toda a comunicação com o banco de dados (SQLite) é feita aqui, isolando a regra da interface visual.
- 📂 **`/views`**: Contém as telas finais do aplicativo (ex: Home, Login, Carrinho, Vitrine de Doces). 

## 🚀 Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)**: Framework principal para construção nativa multiplataforma.
- **[Expo](https://expo.dev/)**: Plataforma/ferramenta que facilita o desenvolvimento e testes contínuos do app.
- **[Expo Router](https://docs.expo.dev/router/introduction/)**: Sistema de navegação baseado em arquivos (semelhante ao Next.js).
- **[React Native Paper](https://callstack.github.io/react-native-paper/)**: Biblioteca focada em componentes UI seguindo as diretrizes do Material Design.
- **[Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)**: Banco de dados relacional embarcado no dispositivo para persistência permanente de informações de produtos e usuários.

## 📱 Passo a Passo de Uso

O aplicativo Cacau Dourado foi pensado para ser intuitivo. Abaixo, as principais funcionalidades para os clientes da loja:

1. **Acessando a Loja (Home):**
   * Ao abrir o app, você será direcionado para uma tela de Login. Se for sua primeira vez, você pode usar a opção de **Cadastrar** para criar uma conta ou navegar pelo menu hambúrguer no canto superior esquerdo para visualizar a vitrine sem logar.
   * Na Home, banners promocionais darão destaque aos produtos mais procurados.

2. **Navegando pela Vitrine:**
   * Utilizando o menu lateral, o cliente pode selecionar as categorias de doces (Brigadeiros, Beijinhos, Brownies).
   * Os produtos são exibidos com **Carrosséis de Imagens** (deslize para os lados em cima da foto do produto para ver mais ângulos do doce) e os preços.

3. **Gerenciando o Carrinho:**
   * Ao clicar em "Adicionar ao Carrinho" em qualquer produto, ele fica armazenado na sua "sacola".
   * Acessando o ícone 🛒 na barra superior, é possível visualizar o resumo do pedido e finalizá-lo.

## 🛠️ Guia para Desenvolvedores e Administradores

A aplicação possui uma estrutura segura de administração (Painel Admin) que é ativada automaticamente mediante as credenciais corretas. 

### O que o Painel Admin permite:
* Visualizar o ID, Nome e E-mail de todos os clientes atualmente cadastrados no banco de dados SQLite do aplicativo.
* **Sincronizar Novos Produtos:** Ao clicar no botão de recarregar banco, o SQLite fará um "reset" lendo os novos códigos fontes e imagens locais adicionadas pelos desenvolvedores.

### Como adicionar novos produtos ou fotos localmente (Para Desenvolvedores):
O Expo necessita empacotar as fotos **antes** do app rodar. Para contornar isso e fazer imagens funcionarem junto com banco de dados SQLite, o app utiliza um "Dicionário de Imagens".

Para adicionar novos produtos, siga o fluxo:
1. Coloque a foto nova (ex: `meubolo-1.jpg`) dentro de `assets/images/products/`.
2. Acesse o arquivo `app/components/ProductCard.jsx` e cadastre essa foto no objeto `dicionarioDeImagens`. Ex:
   ```javascript
   "meubolo-1": require("../../assets/images/products/meubolo-1.jpg"),
   ```
3. Acesse `app/services/ProdutosService.js` e adicione o seu produto ou a sua nova foto dentro do array de algum produto já existente em `produtosIniciais`. Você irá usar o nome da chave que cadastrou (neste caso, `"meubolo-1"`).
4. No aplicativo, faça login como Administrador, acesse o **Painel Admin** e clique em **Sincronizar Novos Produtos**.

## ⚙️ Como Executar o Projeto

1. Instale as dependências essenciais e as bibliotecas nativas:
   ```bash
   npm install
   npx expo install expo-sqlite @react-native-async-storage/async-storage
   ```

2. Inicie o servidor de desenvolvimento (utilize a tag `-c` caso tenha adicionado novas imagens, forçando o Expo a limpar o cache):
   ```bash
   npx expo start -c
   ```

3. Leia o QR Code gerado no terminal com o aplicativo **Expo Go** no seu celular (Android ou iOS) ou aperte `a` para rodar em um emulador Android / `i` para o simulador iOS.
