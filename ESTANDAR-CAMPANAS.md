# Estándar · Formularios de donación DonarOnline CRMD

Guía para crear y mantener los formularios de donación de Casa Ronald McDonald
Colombia. **Un formulario = una campaña en DonarOnline + un archivo CSS de este
repo**, servido por CDN y embebido con `?css=<base64>` dentro de un iframe.

> Mantenido por Vladislav Marinovich · Marinovich Consulting.

---

## 1. Skins disponibles

| Skin | Archivo base | Look | Dónde se usa |
|---|---|---|---|
| **Chips** | `css/crmd-oficial-v1.css` | Montos en grilla de 3 columnas | `/donar/` (producción) |
| **Sitio** | `css/cena-bogota-2026.css` (vivo en `main`); `crmd-cali-v3.css` (pinneado en commit histórico, no en `main`) | Tarjetas verticales con descripción + badge "Más elegido" + caja "Tu aporte" | Casa Cali, Cena 25 años |

Para campañas nuevas con **descripción por monto**, usar el **skin Sitio**.

---

## 2. Regla de oro: qué se edita y qué no

- ✅ **Bloque `:root`** (al tope del archivo): colores + mensajes y botones por
  paso. **Edita aquí.**
- ⛔ **Debajo de `:root`**: el layout (selectores `.dsf__*`). **No tocar** salvo
  que sepas exactamente qué haces.
- ⚠️ **Excepción heredada (deuda conocida):** en el skin **Sitio**, las
  **descripciones de cada monto**, los **labels del toggle** ("Cada mes" /
  "Una sola vez") y el **texto del badge** "Más elegido" **no están en `:root`**:
  están inyectados en el cuerpo por posición (`content` en `::after` por
  `:nth-child`). Hoy se editan ahí. Ver sección 3.

---

## 3. Dónde está cada TEXTO

| Texto | Ubicación en el CSS |
|---|---|
| Subtítulo por paso | `:root` → `--msg-step-1 / 2 / 3` |
| Botón por paso | `:root` → `--btn-step-1 / 2 / 3` |
| **Descripción de cada monto** | cuerpo → `.dsf__amount-option:nth-child(N) > div::after { content: "..." }` |
| **Labels del toggle** | cuerpo → `.dsf__recurrency-option:nth-child(1/2) .dsf__recurrency-option-label::after` |
| **Texto del badge** "Más elegido" | cuerpo → `.dsf__amount-option:nth-child(2)::after { content: "..." }` |

> ⚠️ La descripción que aparece en la caja **"Tu aporte"** (recap) **no es del
> CSS**: sale de la campaña en DonarOnline (panel → Montos). O sea, el texto de
> la **tarjeta** (CSS) y el del **recap** (campaña) son **dos fuentes distintas**
> y hay que mantenerlos sincronizados a mano.

---

## 4. Dónde está cada COLOR (`:root`)

| Variable | Qué controla |
|---|---|
| `--red` | Acento principal (botón, seleccionado, toggle, focus). *El nombre dice "red" por herencia; puede ser cualquier color.* |
| `--red-hover` | Hover del acento (10-18% más oscuro) |
| `--red-soft-bg` | Fondo del monto seleccionado (tinte muy claro del acento) |
| `--red-ring` | Halo del seleccionado (rgba del acento ~0.12) |
| `--ink` / `--muted` | Texto principal / secundario |
| `--white` / `--cream` / `--lavender` | Tarjeta / caja recap / resumen paso 3 |
| `--amber` | Badge "Más elegido" |
| `--border` / `--border-hover` | Bordes |
| `--font-family` | Tipografía (Figtree en el skin Sitio) |

---

## 5. Receta: campaña nueva en 5 pasos

```bash
# 1. Copiar el skin Sitio vivo a un archivo nuevo
cp css/cena-bogota-2026.css css/<slug>.css

# 2. Editar css/<slug>.css:
#    - :root  -> colores (acento, texto, bordes)
#    - cuerpo -> descripciones de monto (nth-child), labels toggle, badge

# 3. Commit + push
git add css/<slug>.css
git commit -m "feat(css): campaña <slug>"
git push origin main

# 4. Hash + URL del CDN (jsdelivr) + PURGA (importante en commits frescos)
HASH=$(git rev-parse HEAD)
URL="https://cdn.jsdelivr.net/gh/Casa-Ronald-McDonald-Colombia/donaronline-custom-css@${HASH}/css/<slug>.css"
curl -s "https://purge.jsdelivr.net/gh/Casa-Ronald-McDonald-Colombia/donaronline-custom-css@${HASH}/css/<slug>.css" > /dev/null

# 5. Base64 de la URL (el flag -n es obligatorio)
echo -n "$URL" | base64
```

iframe para pegar (sustituir `<UUID>` y `<BASE64>`):

```html
<style>
  .responsive-iframe { width:100%; border:none; background:transparent; display:block; margin:0 auto; height:845px; }
  @media (max-width:768px){ .responsive-iframe{ height:930px; } }
</style>

<iframe id="donation_form" class="responsive-iframe" allow="payment"
  src="https://embed.donaronline.org/c/c/<UUID>?css=<BASE64>"></iframe>
```

> El `<UUID>` es el ID de la campaña en DonarOnline (va entre `/c/c/` y `?css=`).
> Las alturas 845 / 930 son para el skin Sitio; el skin Chips usa 620 / 830.

---

## 6. CDN · cuál usar

- ✅ **Producción usa `cdn.jsdelivr.net`** (Casa Cali y Cena). Es rápido.
  Para un commit recién pusheado hay que **purgar** con
  `https://purge.jsdelivr.net/<misma-ruta>` o puede tardar / devolver 502.
- `cdn.statically.io` es una **alternativa válida** (sirve commits frescos sin
  purga), pero en pruebas resultó **más lento** al cargar.
- Siempre el parámetro **`?css=`** (nunca `?custom_css=`, no existe).

> Nota: el `README.md` original recomienda statically y desaconseja jsdelivr por
> los 502 en commits frescos. En la práctica jsdelivr + purga es lo que corre en
> producción por velocidad. Ambos funcionan; este documento manda.

---

## 7. Campañas vigentes

| Campaña | UUID DonarOnline | CSS | Skin |
|---|---|---|---|
| CRMD general | `25107305-ccc8-415c-aca3-d3d944a246f3` | `crmd-oficial-v1.css` | Chips |
| Casa Cali | `d674f6ed-bfb0-4ebb-9855-cd6b96bb3fa9` | `crmd-cali-v3.css` (pinneado en commit `0a98a3a`, no en `main`) | Sitio |
| Cena Bogotá 2026 | `a4725fa9-2d19-4766-a4a7-002467e29371` | `cena-bogota-2026.css` | Sitio morado `#91187d` |

---

## 8. Pendiente · mejora v2 (no implementada)

Subir a `:root` las **descripciones de monto**, los **labels del toggle** y el
**texto del badge**, para que crear una campaña nueva sea **solo editar `:root`**
sin tocar el cuerpo. Hoy ese copy vive en el cuerpo por `:nth-child` (heredado
del skin Sitio de Cali). Mientras no se haga, seguir la sección 3.
