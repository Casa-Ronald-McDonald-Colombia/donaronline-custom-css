# 👤 Guía para humanos · DonarOnline CSS Custom CRMD

> Si eres una persona (no un agente IA) que aterriza en este repo por primera vez,
> este es tu punto de entrada. Léeme antes que el README técnico.

---

## ¿Qué es este repo en una frase?

El CSS que hace que el formulario de donaciones de Casa Ronald McDonald Colombia
**no parezca de DonarOnline** y sí parezca de la marca CRMD.

---

## ¿Por qué existe?

DonarOnline (la pasarela de donaciones que usa CRMD) ofrece un iframe con un form
funcional pero genérico. Para que el form se vea con los colores, tipografía y
voz de CRMD, se le pasa un CSS personalizado vía un parámetro `?css=` en la URL
del iframe.

Ese CSS lo hospedamos acá, se sirve por un CDN público (`statically.io`), y se
pega Base64-codificado en el iframe que vive en `casaronaldmcdonald.org.co`.

---

## ¿Quién mantiene esto?

**Vladislav Marinovich** · Fractional CTO de CRMD · [vladislav@marinovich.co](mailto:vladislav@marinovich.co)
Marinovich Consulting · [marinovich.co](https://marinovich.co)

Si tienes dudas, escribe directamente. Si Vlad no responde en 24h, abre un issue
en este repo describiendo qué necesitas.

---

## ¿Qué quieres hacer?

### Caso A · "Quiero cambiar un color o un texto del form"

1. **No edites nada directamente** si no tienes experiencia con Git/CSS.
2. Abre [`AGENT_PROMPTS.md`](./AGENT_PROMPTS.md) en este repo.
3. Copia el "Prompt 0 · de inicio" y pégalo a un agente IA (Claude, ChatGPT, Cursor).
4. Después pega el prompt específico (sección 1 para colores, sección 2 para textos).
5. El agente te devolverá el iframe nuevo listo para pegar en WordPress.

### Caso B · "Quiero entender cómo funciona esto técnicamente"

Lee, en este orden:
1. [`README.md`](./README.md) — sección "📁 Estructura del repo" y "🎯 Variables editables"
2. [`css/boilerplate.css`](./css/boilerplate.css) — el header (primeras 50 líneas) explica todo
3. [`AGENT_PROMPTS.md`](./AGENT_PROMPTS.md) — prompt 4 ("Pedir una explicación") para que el agente te lo explique

### Caso C · "El form de donaciones está roto en producción"

1. Abre [`README.md`](./README.md) → sección "🚨 Troubleshooting" → busca tu síntoma.
2. Si no encuentras el síntoma, escríbele a Vladislav o usa el prompt 5 de `AGENT_PROMPTS.md`.

### Caso D · "Quiero usar este boilerplate para otra organización"

1. Abre [`AGENT_PROMPTS.md`](./AGENT_PROMPTS.md) → sección 8 ("Crear una nueva campaña").
2. Reúne primero los datos requeridos (paleta, fuentes, textos, UUID DonarOnline).
3. Pega el prompt a un agente y te genera el nuevo CSS + Base64 + iframe.

### Caso E · "Necesito el iframe actual de producción, sin hacer cambios"

Copia esto y pégalo en WordPress (CSS + iframe):

```html
<style>
    .responsive-iframe {
        width: 100%;
        border: none;
        background: transparent;
        display: block;
        margin: 0 auto;
        height: 620px;            /* 👈 ALTURA DESKTOP */
    }
    @media (max-width: 768px) {
        .responsive-iframe {
            height: 830px;        /* 👈 ALTURA MOBILE (≤768px) */
        }
    }
</style>

<iframe
 id="donation_form"
 class="responsive-iframe"
 src="https://embed.donaronline.org/c/c/25107305-ccc8-415c-aca3-d3d944a246f3?css=aHR0cHM6Ly9jZG4uc3RhdGljYWxseS5pby9naC9DYXNhLVJvbmFsZC1NY0RvbmFsZC1Db2xvbWJpYS9kb25hcm9ubGluZS1jdXN0b20tY3NzQDRkNjY1YjMvY3NzL2NybWQtb2ZpY2lhbC12MS5jc3M="
 allow="payment"
 onload="window.scrollTo(0, 0);"
></iframe>
```

> ⚠️ Esta Base64 puede estar desactualizada si alguien hizo un commit nuevo después de mayo 2026. Para obtener la versión más reciente, sigue el Caso A o pídele a un agente con el prompt 6 de `AGENT_PROMPTS.md`.

---

## Glosario mínimo

| Término | Qué es |
|---|---|
| **Iframe** | Una ventana embebida en una página web. El form de donaciones vive dentro de uno. |
| **DonarOnline** | La pasarela de pagos que usa CRMD para procesar donaciones. |
| **Base64** | Una forma de codificar texto en una sola línea para meterlo en URLs. El CSS se codifica así para pasarse en el iframe. |
| **CDN** | "Content Delivery Network". Un servicio que sirve archivos rápido desde servidores cerca del usuario. Usamos `statically.io`. |
| **Commit** | Una "fotografía" guardada del código en un momento. Cada commit tiene un hash único (ej: `4d665b3`). |
| **`:root`** | El bloque de variables al tope del CSS. Es lo único que se edita en flujo normal. |
| **`?css=`** | El parámetro de URL que DonarOnline lee para aplicar CSS personalizado. NO es `?custom_css=`. |

---

## Reglas que sí o sí aplican

1. **Todo en español.** Mensajes de commit, comentarios en código, conversaciones con agentes IA, PRs, issues.
2. **Probar antes de prod.** Cualquier cambio se prueba en un iframe de sandbox antes de pegarlo en `casaronaldmcdonald.org.co`.
3. **Commits granulares.** Un cambio lógico = un commit. Nunca mezclar "cambié el color y arreglé el form mobile" en un solo commit.
4. **No tocar el UUID del iframe.** `25107305-ccc8-415c-aca3-d3d944a246f3` es la campaña CRMD en DonarOnline. Cambiarlo rompe la captura de donaciones.

---

## Mapa rápido del repo

| Archivo | Para qué sirve | Para quién |
|---|---|---|
| [`README.md`](./README.md) | Documentación técnica completa: variables, workflow de 10 pasos, troubleshooting | Agente IA o developer técnico |
| [`HUMANO.md`](./HUMANO.md) | Esta guía. Punto de entrada amigable | Humano no técnico |
| [`AGENT_PROMPTS.md`](./AGENT_PROMPTS.md) | Prompts listos para copiar/pegar a un agente IA | Humano que delega a IA |
| [`css/boilerplate.css`](./css/boilerplate.css) | Framework reutilizable, no se sirve a prod | Mantenedor del template |
| [`css/crmd-oficial-v1.css`](./css/crmd-oficial-v1.css) | CSS de producción CRMD | Agente que aplica cambios |

---

## Cuando algo no esté claro

1. Relee este doc.
2. Si sigue sin estar claro, escríbele a Vladislav.
3. Si Vlad no está disponible, abre un issue en este repo y describe qué intentaste, qué pasó y qué esperabas.

---

_Construido con cariño por [Vladislav Marinovich](https://marinovich.co) · Marinovich Consulting · mayo 2026 · para que cualquier persona pueda mantener este sistema sin necesitar mi presencia._
