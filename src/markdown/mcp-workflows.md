# 🚀 MCP High-Speed Workflows

Este documento contiene estrategias de encadenamiento de herramientas MCP para escalar la velocidad de desarrollo en proyectos Full Stack (Next.js + MongoDB + GitHub + Postman).

---

## 🍰 Flujo 1: "The Vertical Slice" (Feature Completa)

**Caso de uso:** Crear una funcionalidad nueva de principio a fin sin cambiar de contexto ni ventanas.

### Prompt de Ejecución 1

> **Objetivo:** Crear la funcionalidad de "[NOMBRE_DE_LA_FEATURE]" (ej: Comentarios en posts).
>
1. **DB (MongoDB):** Analiza la colección actual `[NOMBRE_COLECCION]`. Usa `mongodb` para insertar manualmente un documento de prueba con la estructura nueva que necesitamos.

2. **Backend:** Crea el archivo `app/api/[RUTA]/route.ts`. Debe aceptar el método POST/GET según corresponda. Usa `leer_archivo` para ver cómo estructuro mis otras APIs.

3. **Test Backend (Postman):** Usa la herramienta `postman` para crear una colección "API - [NOMBRE_FEATURE]". Agrega un request a ese endpoint y pruébalo. Si falla, arréglalo hasta que dé 200 OK.

4. **Frontend:** Una vez que Postman dé OK, usa la herramienta `crear_componente` para generar la UI usando `shadcn/ui` y conéctalo al endpoint.

---

## 📊 Flujo 2: "Data-Driven UI" (Diseño con Datos Reales)

**Caso de uso:** Crear componentes de UI que no se rompan, basándose en la estructura y longitud real de los datos en producción.

### Prompt de Ejecución 2

**Objetivo:** Crear el componente "[NOMBRE_COMPONENTE]" (ej: UserProfileCard).

1. **Extracción de Datos:** Usa la herramienta `aggregate` de `mongodb` en la colección `[COLECCION]` para traerme un (1) ejemplo real de un documento que tenga todos sus campos poblados (incluyendo textos largos o arrays vacíos).
2. **Generación de UI:** Basado EXCLUSIVAMENTE en la estructura de ese JSON real que obtuviste, crea el componente en `components/[NOMBRE].tsx`.
3. **Requisitos:** Usa Tailwind CSS. Maneja casos de desbordamiento de texto si ves campos muy largos en el JSON.

---

## 🐛 Flujo 3: "The Bug Hunter" (Investigación Forense)

**Caso de uso:** Solucionar errores o regresiones sin tener que investigar manualmente el historial.

### Prompt de Ejecución 3

**Incidente:** [DESCRIPCION DEL ERROR] (ej: El login tira error 500).

1. **Investigación Histórica:** Usa `list_commits` de `github` para ver quién tocó la carpeta `[CARPETA_AFECTADA]` en los últimos [X] días.

2. **Análisis de Código:** Usa `leer_archivo` para analizar el código actual de `[ARCHIVO_SOSPECHOSO]`.

3. **Reproducción (Opcional):** Usa `playwright` para navegar a `localhost:3000` e intentar reproducir el flujo. Reporta el error de consola si aparece.

4. **Propuesta:** Explica qué cambió recientemente que pudo causar esto y propón el código corregido.

---

## 🧠 Bonus: Reglas del Sistema (System Instructions)

*Copia esto en un archivo `.vscode/instructions.md` y pídele al agente que lo lea al iniciar sesión.*

```text
# Reglas del Agente AI First

Eres un desarrollador Senior operando a través de MCP. Tu flujo de trabajo por defecto es:

1. ANTES de escribir código, LEE los archivos existentes (`leer_archivo`) para mantener la consistencia.
2. SIEMPRE que crees una API nueva, crea su test en Postman (`postman-mcp`) antes de pasar al frontend.
3. SIEMPRE que modifiques la BD, verifica el esquema actual (`mongodb-mcp`) usando `collection-schema`.
4. NUNCA asumas nombres de archivos o rutas; usa `listar_archivos` para ver la estructura real del proyecto.
