# Flappen

F(öräldra)l(edighets)appen

https://www.flappen.se

_Testa gärna! Men notera att appen är en [alfaversion](https://sv.wikipedia.org/wiki/Alfaversion) och kan gå sönder när som helst._

## Vad är detta?

En app för att förenkla planering av föräldraledighet, löst "inspirerad" av Försäkringskassans funktioner för att ansöka om _föräldrapenning_.

Här är några saker jag tänker att appen skall hjälpa föräldrar med.

- Överblicka + planera av **föräldraledighetsdagar**
- Överblicka uttag av **föräldrapenning**
- Sammanställa **ekonomiskt utfall** för respektive förälder
- Beräkna eventuell **föräldralön från arbetsgivare**
- All möjlig **statistik**

## Mål
Formaliteterna kring föräldraledighet, föräldrapenning och eventuell föräldralön är oftast komplexa. Flappens mål är att hjälpa föräldrar förstå vad olika beslut får för konkreta konsekvenser i denna komplexa djungel.

Historiskt - så även i skrivande stund - tar mammor en majoritet av föräldraledighet. Med bättre information och underlag tror jag att detta går att förändra så att föräldraledigheten delas lika.

## Tekniskt
Hej! 👋

Det här är mitt hobbyprojekt under föräldraledighet 2, och därtill min första frontend-app som jag bygger från grunden. Jag har valt React.js för att enligt uppgift är otroligt populärt och bör vara användbart när jag är tillbaka på jobbet.

Varmt välkommen att bidra, fixa buggar, tyck till eller vad som helst.


<details>
<summary>App scaffolding documentation</summary>
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

</details>
