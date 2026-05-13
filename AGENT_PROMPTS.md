# 🤖 Prompts para Agente · DonarOnline CSS Custom CRMD

> Guía de prompts listos para copiar/pegar cuando le pidas a un agente IA (Claude, ChatGPT, Cursor, etc.) que trabaje sobre este repo.
>
> Todos los prompts son en **español** y asumen que el agente tiene acceso al repo `Casa-Ronald-McDonald-Colombia/donaronline-custom-css`.

---

## 0. Prompt de inicio · primer mensaje al agente (obligatorio)

Pegar **literal** como primer mensaje de cualquier conversación nueva con el agente:

```
Hola. Vas a trabajar sobre el repo:
https://github.com/Casa-Ronald-McDonald-Colombia/donaronline-custom-css

Este repo sirve el CSS del iframe de donaciones de Casa Ronald McDonald Colombia,
hospedado en cdn.statically.io y consumido como ?css=<base64> en el iframe.

Antes de cualquier cambio, LEE EN ESTE ORDEN:
1. README.md (estructura, reglas duras, workflow de 10 pasos)
2. css/boilerplate.css (header con arquitectura y mapa de clases .dsf__*)
3. css/crmd-oficial-v1.css (archivo de producción)

Reglas innegociables del proyecto:
- Todo en español: commits, comentarios, PRs, mensajes al usuario.
- Commits granulares: una unidad lógica = un commit.
- NO editar boilerplate.css en flujo normal. Para cambios CRMD, editar SOLO el
  bloque :root de crmd-oficial-v1.css.
- El parámetro de iframe es ?css=, NUNCA ?custom_css=.
- El CDN es cdn.statically.io, NUNCA cdn.jsdelivr.net.
- Después de cada git push, regenerar el Base64 con el hash nuevo y entregar el
  iframe completo listo para pegar.

Confirma que leíste estos archivos y listo, espero tu primer cambio.
```

---

## 1. Solicitar un cambio de color o paleta

```
Quiero cambiar [el color primario / el color de fondo / el borde de inputs] a:
- Nuevo valor: #XXXXXX
- Razón: <breve contexto · ej: kit de marca actualizado v3>

Pasos esperados:
1. Editar SOLO el bloque :root de crmd-oficial-v1.css
2. Si cambias --main-color, ajusta también --main-color-hover (10-15% más oscuro)
   y recalcula --main-color-soft y --main-color-ring con la misma base.
3. Commit en español, granular, formato: style(colors): <descripción>
4. Push a main
5. Genera Base64 nuevo con statically.io
6. Devuélveme el snippet <iframe> completo listo para pegar
```

---

## 2. Solicitar un cambio de copy (mensaje o botón por paso)

```
Quiero cambiar el [mensaje / texto del botón] del paso [1/2/3] a:

"<nuevo texto aquí>"

Si necesitas salto de línea dentro del mensaje, usa \A.

Pasos esperados:
1. Editar SOLO la variable correspondiente en :root de crmd-oficial-v1.css
   (--msg-step-N o --btn-step-N)
2. Commit: style(step-N): <descripción>
3. Push, generar Base64, devolverme iframe listo para pegar.
```

---

## 3. Solicitar una corrección visual específica

```
En el form de producción veo este problema:
- Síntoma: <describe lo que ves mal · ej: "el gap entre label e input es muy grande">
- Dónde: <paso 2 / paso 3 / mobile / desktop>
- Esperado: <cómo debería verse>

Antes de hacer cambios:
1. Identifica QUÉ selector controla esa zona (revisa boilerplate.css con sus comentarios).
2. Propóneme el cambio EXACTO (línea + before/after) antes de commitear.
3. Si requiere tocar fuera de :root, justifica por qué.
4. Después de mi aprobación: commit granular, push, Base64 nuevo, iframe listo.
```

---

## 4. Pedir una explicación (sin cambios)

```
Explícame en español, sin tocar código:
- Qué hace el selector [pegar selector].
- Qué pasaría si lo elimino.
- Cuál es la variable que más impacto tiene si la cambio.
```

O variantes:

```
Mapea cada zona visual del form a la variable de :root que la controla.
```

```
¿Por qué este CSS usa :has() en .dsf::before? Explícame el truco.
```

---

## 5. Reportar un bug en producción

```
El iframe en producción está fallando:
- URL afectada: casaronaldmcdonald.org.co/<path>
- Síntoma: <screenshot o descripción>
- Cuándo empezó: <hoy / después del último deploy>

Antes de tocar nada:
1. Verifica que el Base64 del iframe actual apunta al commit correcto (mira el README, sección Troubleshooting).
2. Abre la URL del CDN directamente en el navegador y confirma que sirve el CSS plano.
3. Si el CSS sirve bien pero el iframe falla, el problema está en el parámetro del iframe (?css= vs ?custom_css=), no en el CSS.
4. Reporta diagnóstico antes de proponer fix.
```

---

## 6. Solicitar el iframe ready-to-paste sin hacer cambios

```
Dame el iframe completo, listo para pegar en WordPress, usando:
- Último commit en main.
- Clase .responsive-iframe (heights: 620px desktop / 830px mobile ≤768px).
- onload="window.scrollTo(0, 0);"

No hagas cambios al CSS. Solo construye la URL con el hash actual y entrégame
el snippet HTML completo.
```

---

## 7. Iniciar v2 · modularización (post-launch)

```
Vamos a empezar la v2 del repo. Lee la sección "Roadmap · v2" del README.

Objetivos en orden:
1. Crear css/crmd-oficial-v2.css que sea ULTRA-thin: solo el bloque :root con
   la paleta CRMD + los textos por paso, seguido de @import url("./boilerplate.css").
2. NO tocar producción todavía. crmd-oficial-v1.css sigue siendo el que sirve.
3. Probar el v2 generando un Base64 apuntando a crmd-oficial-v2.css y abriéndolo
   en un iframe de prueba (no en casaronaldmcdonald.org.co).
4. Documentar en el README si @import funcionó vía iframe cross-origin.
5. Si funcionó: armar plan de migración v1 → v2.
6. Si no funcionó: documentar el error y proponer alternativa (build step).

Trabaja en una rama: git checkout -b feat/v2-modularizacion
Cuando termines, abrí un PR con tu diagnóstico antes de merge.
```

---

## 8. Crear una nueva campaña (otra organización)

```
Voy a usar este boilerplate para una organización nueva: <nombre>.

Datos:
- Slug: <kebab-case>
- Color primario: #XXXXXX
- Color hover: #XXXXXX (10-15% más oscuro)
- Color de fondo: <transparent | #XXXXXX>
- Tipografía: <nombre fuente>
- Mensaje paso 1: "<texto>"
- Mensaje paso 2: "<texto>"
- Mensaje paso 3: "<texto>"
- Botón paso 1: "<texto en mayúsculas>"
- Botón paso 2: "<texto>"
- Botón paso 3: "<texto>"
- Campaign UUID DonarOnline: <uuid>

Pasos:
1. cp css/boilerplate.css css/<slug>.css
2. Editar SOLO :root del nuevo archivo con los valores de arriba.
3. Commit: feat(css): nueva campaña <slug>
4. Push, generar Base64, devolverme iframe listo con el UUID correcto.
```

---

## 9. Formato esperado de respuesta del agente

Todo agente que trabaje en este repo debe responder en este formato:

```
1. Qué leí: <archivos consultados>
2. Diagnóstico: <qué entiendo del problema/petición>
3. Plan: <pasos numerados, granulares>
4. Cambios aplicados: <commits con hash corto>
5. Verificación: <URL del CDN para validar que sirve OK>
6. Entrega final: <snippet <iframe> + <style> listo para pegar>
```

Si en algún paso necesita confirmación del usuario, debe **detenerse y preguntar**, no asumir.

---

## 🚨 Anti-patrones · cosas que el agente NO debe hacer

- ❌ Editar `boilerplate.css` para cambios de marca CRMD (esos van en `crmd-oficial-v1.css`).
- ❌ Commits compuestos ("cambié colores, textos y responsive en un commit").
- ❌ Commit messages en inglés.
- ❌ Proponer alternativas más complejas cuando la solución simple ya funciona.
- ❌ Usar `?custom_css=` en URLs (no existe).
- ❌ Usar `cdn.jsdelivr.net` (502 en commits frescos).
- ❌ Olvidar `-n` en `echo -n "<url>" | base64` (rompe el Base64).
- ❌ Cambiar el UUID `25107305-ccc8-415c-aca3-d3d944a246f3` (es la campaña CRMD en DonarOnline).
- ❌ Modificar producción sin probar en sandbox primero (regla absoluta del proyecto).

---

## 🔗 Referencias rápidas

- Repo: https://github.com/Casa-Ronald-McDonald-Colombia/donaronline-custom-css
- Iframe en prod: `casaronaldmcdonald.org.co/donar/`
- Docs DonarOnline: https://docs.donaronline.org/formulario-multi-pasos/guias/estilos
- Statically.io: https://statically.io/
- Mantenedor: Vladislav Marinovich · vladislav@marinovich.co · Marinovich Consulting

---

_Última actualización: mayo 2026 · Vladislav Marinovich_
