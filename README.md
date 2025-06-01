# 🎉 SSE Interactive Player Demo

Este é um projeto simples para testar o uso de **Server-Sent Events (SSE)** de forma interativa e visual.  
Aqui você pode registrar seu nome, ver um círculo colorido com seu nome seguindo o movimento do mouse na tela, e acompanhar em tempo real os movimentos dos outros jogadores conectados! 🖱️🟢

---

## 🚀 O que é essa aplicação?

- Você digita seu nome e clica em **Iniciar** para se registrar no servidor.  
- Seu mouse vira um círculo colorido com seu nome dentro.  
- A posição do seu mouse é enviada para o servidor e replicada para todos os outros players conectados em tempo real.  
- Você pode alterar seu nome a qualquer momento.  
- Quando alguém fecha a aba, o círculo desaparece para todos.  

Essa aplicação serve para mostrar como usar SSE para comunicação em tempo real, com um exemplo prático, simples e divertido! 😄

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Node.js (recomendado v18 ou superior)  
- [pnpm](https://pnpm.io/) instalado globalmente (opcional, mas recomendado)

### Passos para rodar

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repo.git
   cd seu-repo

2. Instale as dependências usando pnpm:
   ```bash
   pnpm install

3. Rode o servidor de desenvolvimento:
   ```bash
   pnpm dev

4. Abra seu navegador e acesse: 
   [http://localhost:3000](http://localhost:3000)

---

## 📝 Tecnologias usadas
- Next.js (App Router)
- React 18+
- Server-Sent Events (SSE) para comunicação em tempo real
- TypeScript
- pnpm como gerenciador de pacotes

---

## 💡 Dicas
- Abra múltiplas abas para ver os círculos dos outros players se movimentando ao vivo.
- Teste alterar seu nome e veja a atualização instantânea em todas as abas.
- Feche a aba para remover seu player do servidor e das outras abas.
- Gere a Build para eliminar delays
  ```bash
  pnpm build
  pnpm start

---

## ⚖️ Licença
Este projeto está licenciado sob a MIT License.

---

Obrigado por visitar! 🚀✨
