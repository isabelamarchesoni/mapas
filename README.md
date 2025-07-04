# 📍 App de Cadastro de Locais com Mapa

Este aplicativo permite que o usuário:

- 📌 Cadastre locais com nome, latitude e longitude.  
- 🗺️ Visualize os locais cadastrados como marcadores (_Marker_) no mapa.  
- 📋 Veja a lista de locais salvos, com opção de exclusão.  
- 📍 Veja sua própria localização atual no mapa.

---

## 📦 Tecnologias Utilizadas

- React Native  
- Expo  
- React Native Maps  
- expo-location  
- expo-sqlite  

---

## 🧭 Funcionalidades

### 📥 Tela de Cadastro

- Campo para digitar o nome do local  
- Captura da localização atual (latitude e longitude)  
- Salvamento dos dados no banco SQLite  

### 🗺️ Tela de Mapa

- Mostra a localização atual do usuário  
- Exibe todos os locais cadastrados como _Marker_  

### 📋 Tela de Lista

- Exibe o nome dos locais salvos  
- Permite excluir qualquer local  

---

## 📁 Estrutura de Pastas

```plaintext
📦 src
 ┣ 📂pages
 ┃ ┣ 📂Cadastro
 ┃ ┃ ┗ 📜 index.js
 ┃ ┣ 📂Lista
 ┃ ┃ ┗ 📜 index.js
 ┗ 📜 App.js
