# Planning poker

> Ferramenta de planning poker gratuita e open-source.

![Desenho da aplicação](./client/screenshot.webp)

Entenda e acompanhe pelo [Figma](https://www.figma.com/file/XhgXti6IjO5nrFVCA2hs0G/Poker-planning).

## Desenvolvimento

Com Docker e Docker Compose instalados, rode;

```sh
$ docker-compose up
```

Usando o **Chrome** acesse:

- http://client-planning-poker.localhost

⚠️ O Chrome responde automaticamente a subdomínios de localhost. Caso esteja utilizando outro navegador você tem 2 opções; acessar http://localhost an porta designada ao container do cliente ou configurar um DNS local para responder a `client-planning-poker.localhost` o recurso do Chrome.

### Cliente

É uma aplicação React. [Leia mais](./client).

### API

É um servidor WebSocket. [Leia mais](./api).

## Licença

Apache-2.0 © 2021 Arthur Corenzan
