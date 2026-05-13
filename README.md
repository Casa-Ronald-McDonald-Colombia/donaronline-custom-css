# DonarOnline · CSS Custom — Casa Ronald McDonald Colombia

> Repositorio que sirve el CSS personalizado del iframe de DonarOnline para CRMD.
> El CSS se hospeda vía **statically.io CDN** y se consume como `?css=<base64>` en la URL del iframe.
>
> Mantenido por **Vladislav Marinovich** · Marinovich Consulting.

---

## ⚠️ LEER ANTES DE TOCAR NADA (instrucciones para agente)

1. **NO existe `?custom_css=`**. El parámetro correcto es **`?css=`**. Si ves `?custom_css=` en algún lado, está roto.
2. **NO uses jsDelivr.** Devuelve 502 para commits frescos. Usa **`cdn.statically.io`** siempre.
3. **NO edites `boilerplate.css`** salvo que estés actualizando el template maestro. Para cambios en producción CRMD, edita `css/crmd-oficial-v1.css`.
4. **El hash del commit es parte de la URL.** Cada commit invalida el cache. Después de cualquier `git push`, hay que **regenerar el Base64**.
5. **Iframe en producción vive en** `casaronaldmcdonald.org.co` (página `/donar/` y modal de home). Cualquier cambio de Base64 implica actualizar el iframe en WordPress.

---

## 📁 Estructura del repo

```
donaronline-custom-css/
├── README.md                  ← este archivo
├── AGENT_PROMPTS.md           ← prompts listos para copiar/pegar al darle tareas a un agente IA
└── css/
    ├── boilerplate.css        ← template maestro · framework de selectores .dsf__*
    └── crmd-oficial-v1.css    ← CSS de producción CRMD · paleta + textos por paso
```

| Archivo | Para qué sirve | Cuándo se edita |
|---|---|---|
| `css/boilerplate.css` | Framework: todas las reglas que dan forma al form (layout, hover, focus, responsive). Reutilizable para cualquier organización. | Solo cuando se mejora el template maestro (estructura, no contenido). |
| `css/crmd-oficial-v1.css` | El archivo de **producción CRMD**. Es lo que carga el iframe en `casaronaldmcdonald.org.co`. Define paleta de marca y mensajes por paso. | Cada vez que CRMD necesita cambiar un color, un texto de mensaje o un texto de botón. |

---

## 🎯 Variables editables (`:root` de `crmd-oficial-v1.css`)

Estas son las **únicas** líneas que un agente debería tocar para cambios rápidos. Están al tope del archivo dentro del bloque `:root { ... }`.

### Paleta de marca

| Variable | Valor actual | Qué controla |
|---|---|---|
| `--main-color` | `#DB0007` | Color principal: botones, focus ring, monto seleccionado, pill seleccionada |
| `--main-color-hover` | `#B00006` | Hover de botones |
| `--main-color-soft` | `rgba(219, 0, 7, 0.08)` | Fondo suave para estados secundarios |
| `--main-color-ring` | `rgba(219, 0, 7, 0.18)` | Anillo de focus de inputs |
| `--bg-color` | `transparent` | Fondo general del form (transparent permite que se vea el fondo del modal/sitio) |
| `--text-color` | `#1A1A1A` | Texto principal |
| `--text-muted` | `#6B6B6B` | Texto secundario (labels, ayudas) |
| `--input-bg` | `#FFFFFF` | Fondo de inputs |
| `--input-border` | `#E0DCD3` | Borde de inputs en reposo |
| `--input-border-hover` | `#C9C2B5` | Borde de inputs en hover |

### Mensajes y textos por paso

| Variable | Qué controla |
|---|---|
| `--msg-step-1` | Subtítulo que aparece en el Paso 1 (selección de monto) |
| `--msg-step-2` | Subtítulo del Paso 2 (datos del donante) |
| `--msg-step-3` | Subtítulo del Paso 3 (pago) |
| `--btn-step-1` | Texto del botón "Continuar" en Paso 1 |
| `--btn-step-2` | Texto del botón en Paso 2 |
| `--btn-step-3` | Texto del botón final (donar) |

> **Saltos de línea en mensajes:** usar `\A` dentro del string. Funciona porque la regla CSS asociada tiene `white-space: pre-line`.
> Ejemplo: `--msg-step-2: "Queremos conocerte,\A cuéntanos un poco de ti 📝";`

### Tokens estructurales

| Variable | Valor | Qué controla |
|---|---|---|
| `--font-family` | `'Inter', system-ui, sans-serif` | Tipografía global del form |
| `--radius-input` | `10px` | Radio de bordes de inputs |
| `--radius-btn` | `10px` | Radio de bordes de botones |
| `--radius-pill` | `999px` | Radio de pills (mensual/única vez) — full round |
| `--transition` | `180ms var(--ease)` | Duración de transiciones globales |

> Los tokens de spacing (`--space-4`, `--space-8`, ... `--space-40`) existen pero rara vez se tocan. Si hay que ajustar gaps verticales del form, editar directamente las reglas que los usan.

---

## 🎨 Mapa visual · qué color va dónde

Referencia rápida para diseñador o agente que quiera entender el reskin sin abrir el CSS.

| Variable | Swatch | Aplica a |
|---|---|---|
| `--main-color` | ![#DB0007](https://placehold.co/30x20/DB0007/DB0007.png) `#DB0007` | Botón "Donar", monto seleccionado, pill seleccionada, focus ring, mensaje de error, link legal, texto del mensaje por paso |
| `--main-color-hover` | ![#B00006](https://placehold.co/30x20/B00006/B00006.png) `#B00006` | Hover sobre botón primario y sobre pill seleccionada |
| `--bg-color` | ⬜ `transparent` | Fondo del form (deja ver el host) |
| `--text-color` | ![#1A1A1A](https://placehold.co/30x20/1A1A1A/1A1A1A.png) `#1A1A1A` | Texto de inputs, monto en reposo, label del checkbox upgrade |
| `--text-muted` | ![#6B6B6B](https://placehold.co/30x20/6B6B6B/6B6B6B.png) `#6B6B6B` | Labels arriba de inputs, aviso legal, botón "Volver" |
| `--input-bg` | ![#FFFFFF](https://placehold.co/30x20/FFFFFF/CCCCCC.png) `#FFFFFF` | Fondo de inputs, chips de monto, pills, "otro monto" |
| `--input-border` | ![#E0DCD3](https://placehold.co/30x20/E0DCD3/E0DCD3.png) `#E0DCD3` | Borde de inputs y chips en reposo |

> 📸 **TODO v2:** agregar screenshot anotado del form con flechas señalando cada zona → variable. Vlad: cuando haya tiempo, capturar `casaronaldmcdonald.org.co/donar/` en desktop y anotar en Figma.

### Mapa textual de zonas del form

```
┌─────────────────────────────────────────┐
│  [mensaje del paso ──────]              │  ← --msg-step-N · color --main-color
│                                         │
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │ 50k │ │100k │ │200k │  ← chips monto │  reposo: bg=--input-bg, border=--input-border
│  └─────┘ └─────┘ └─────┘                │  selected: bg=--main-color, color=#fff
│  ┌─────┐ ┌─────┐ ┌─────┐                │
│  │300k │ │500k │ │Otro │                │
│  └─────┘ └─────┘ └─────┘                │
│                                         │
│  ╭─────────────╮ ╭─────────────╮        │  ← pills recurrencia
│  │  Mensual    │ │ Única vez   │        │  selected: bg=--main-color, label=#fff
│  ╰─────────────╯ ╰─────────────╯        │
│                                         │
│  Email          ← label, color=--text-muted
│  ┌────────────────────────────────┐    │  ← input
│  │ tucorreo@ejemplo.com           │    │  border=--input-border
│  └────────────────────────────────┘    │  focus: border=--main-color + ring
│                                         │
│  ┌────────────────────────────────┐    │
│  │      CONTINUAR CON MI APORTE   │    │  ← botón primario
│  └────────────────────────────────┘    │  bg=--main-color, text=#fff
│         Volver                          │  ← botón secundario, color=--text-muted
└─────────────────────────────────────────┘
```

---

## 🗺️ Roadmap

### v1 (actual · producción)
- ✅ Migración a org Casa-Ronald-McDonald-Colombia
- ✅ Variables `:root` controlando paleta + mensajes + botones por paso
- ✅ Rename a `crmd-oficial-v1.css`
- ✅ README operativo para agentes

### v2 (próximo · post-launch)
- 🔲 **Modularizar** — separar `crmd-oficial-v1.css` en dos archivos: uno con SOLO `:root` (paleta + textos) y otro `@import` al boilerplate. El archivo de producción queda ultra-thin (solo overrides), todo el framework vive en `boilerplate.css`.
- 🔲 **Testear** la modularización en sandbox de DonarOnline antes de cambiar prod. Verificar que `@import` funciona vía iframe cross-origin con statically.io.
- 🔲 **Enviar a DonarOnline como referencia técnica** — una vez validado v2, compartir con el equipo de soporte de DonarOnline como caso de uso ejemplar de su API de `?css=`. Posible feature en su documentación oficial.
- 🔲 Screenshot anotado del form con mapping variable→zona (Figma export).
- 🔲 Workflow en GitHub Actions que genera el Base64 automáticamente en cada push y lo postea como comentario en el commit.
- 🔲 Validador YAML que falla si una variable de `:root` queda vacía.

### Futuro (Q3 2026+)
- 🔲 Spin-off del repo `donaronline-theme-template` parametrizable (con Jinja2 + build.py) para reusar en otras ONGs cliente de Marinovich Consulting.

---

## 🔁 Workflow completo: hacer un cambio y desplegarlo

### Pasos para un agente (sin margen de error)

**1. Clonar el repo (si no está ya local):**
```bash
git clone https://github.com/Casa-Ronald-McDonald-Colombia/donaronline-custom-css.git
cd donaronline-custom-css
```

**2. Editar el archivo de producción:**
Abrir `css/crmd-oficial-v1.css` y modificar **únicamente** dentro del bloque `:root { ... }` al tope del archivo. Para cambios fuera de `:root` (selectores específicos), justificar el cambio en el mensaje de commit.

**3. Commit (en español, granular, una unidad lógica = un commit):**
```bash
git add css/crmd-oficial-v1.css
git commit -m "style(<scope>): <descripción corta del cambio>

<cuerpo opcional explicando el porqué>"
```

Ejemplos válidos de subject:
- `style(colors): actualizar primary a #DB0007 según kit de marca v2`
- `style(step-2): nuevo subtítulo más cálido y line-break`
- `style(pills): radio oculto, pill solid red cuando seleccionada`

**4. Push:**
```bash
git push origin main
```

**5. Tomar el hash corto del último commit:**
```bash
git rev-parse --short HEAD
# devuelve algo como: 60031ed
```

**6. Construir la URL del CDN (statically.io):**
```
https://cdn.statically.io/gh/Casa-Ronald-McDonald-Colombia/donaronline-custom-css@<HASH>/css/crmd-oficial-v1.css
```

Sustituir `<HASH>` por el hash del paso 5.

**7. Codificar la URL en Base64:**
```bash
echo -n "https://cdn.statically.io/gh/Casa-Ronald-McDonald-Colombia/donaronline-custom-css@<HASH>/css/crmd-oficial-v1.css" | base64
```

> ⚠️ El flag `-n` de `echo` es **obligatorio**. Sin él se incluye un `\n` final y el Base64 sale mal.

**8. Construir la URL del iframe:**
```
https://embed.donaronline.org/c/c/25107305-ccc8-415c-aca3-d3d944a246f3?css=<BASE64>
```

> El UUID `25107305-ccc8-415c-aca3-d3d944a246f3` es el ID de la campaña CRMD en DonarOnline. **No cambiar.**

**9. Pegar el iframe en WordPress:**

```html
<iframe
 id="donation_form"
 class="responsive-iframe"
 src="https://embed.donaronline.org/c/c/25107305-ccc8-415c-aca3-d3d944a246f3?css=<BASE64>"
 allow="payment"
 onload="window.scrollTo(0, 0);"
></iframe>
```

**Pegar también este `<style>` en el mismo bloque HTML (o en el CSS global del sitio):**

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
```

> El primer `height` (620px) aplica en **desktop**.
> El segundo `height` (830px) aplica en **mobile** (≤768px) — más alto porque las pills mensual/única vez se apilan y el form crece verticalmente.

**10. Verificar en producción:**
- Abrir la URL del CDN directamente en el navegador — debe servir el CSS plano (no 404, no 502).
- Abrir el iframe en `casaronaldmcdonald.org.co/donar/`.
- Verificar visualmente: pills mensual/única vez, mensajes por paso, color primary `#DB0007`, labels visibles.

---

## 🚨 Troubleshooting

| Síntoma | Causa probable | Fix |
|---|---|---|
| El iframe carga pero el CSS no aplica | Parámetro mal escrito (`custom_css` en vez de `css`) | Corregir a `?css=` |
| El CSS aplica un commit viejo | Olvidaste regenerar el Base64 con el hash nuevo | Repetir pasos 5–9 |
| CDN devuelve 502 | jsDelivr está cacheando, o el commit es muy fresco | Usar `cdn.statically.io` (no `cdn.jsdelivr.net`) |
| Cambio no se ve aunque el Base64 es nuevo | Cache del navegador o de WordPress | Hard refresh (Cmd+Shift+R) + purgar cache de WP |
| Mensajes por paso no aparecen | Las variables `--msg-step-N` están vacías | Confirmar valores en `:root` |
| Saltos de línea no funcionan en mensajes | Falta `\A` o la regla asociada perdió `white-space: pre-line` | Usar `\A` en el string y confirmar `white-space: pre-line` en la regla `::before`/`::after` |
| Iframe no permite pagos | Falta atributo `allow="payment"` | Agregar al tag iframe |

---

## 🔐 Acceso

- **Repo:** `Casa-Ronald-McDonald-Colombia/donaronline-custom-css` (público)
- **Admin org GitHub:** Vladislav Marinovich
- **Dashboard DonarOnline:** acceso vía cuenta CRMD (consultar a Vladislav)
- **WordPress:** cuenta de admin CRMD

---

## 📜 Histórico de bugs resueltos

- **`?custom_css=` no existe** → el parámetro correcto es `?css=`. Documentado en docs oficiales DonarOnline.
- **jsDelivr 502 para commits frescos** → migramos a `cdn.statically.io`.
- **Fondos forzados a `transparent !important`** → reemplazado por variable `--bg-color`.
- **`:has(.dsf__donor)` no siempre matchea** → reemplazado por `.dsf__step-{N}-container` (oficial).

---

## 🔗 Referencias externas

- [Docs DonarOnline · Estilos personalizados](https://docs.donaronline.org/formulario-multi-pasos/guias/estilos)
- [Statically.io CDN docs](https://statically.io/)
- Campaña CRMD en DonarOnline: ID `25107305-ccc8-415c-aca3-d3d944a246f3`

---

_Construido y mantenido por [Vladislav Marinovich](https://marinovich.co) · Marinovich Consulting · mayo 2026_
