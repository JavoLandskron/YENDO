# Auditoria para agentes IA

Este archivo resume una auditoria tecnica del proyecto YENDO para que otros agentes como Codex, Claude o similares puedan continuar el trabajo sin repetir toda la exploracion.

## Contexto rapido

- Stack: Next.js `16.2.3`, React `19.2.4`, TypeScript, Tailwind CSS `4`, Leaflet.
- Router: App Router en `src/app`.
- Rutas principales:
  - `/`: landing principal.
  - `/mapa`: mapa de puntos limpios.
  - `/suscripcion`: flujo comercial/comunidad.
  - `/api/points`: entrega puntos desde JSON local.
- Datos: `src/lib/points-data.json` contiene 3.401 puntos y pesa aprox. 544 KB.
- Instruccion local importante: antes de modificar Next.js, revisar `node_modules/next/dist/docs/`. Para esta auditoria se revisaron las guias locales de App Router, Server/Client Components, Production Checklist y upgrade v16.
- Estado del working tree al auditar: hay muchos archivos modificados antes de esta auditoria. No asumir que esos cambios son descartables.

## Verificacion ejecutada

```bash
npm run build
```

Resultado: pasa. Next compila con Turbopack, TypeScript termina bien y genera 7 paginas estaticas. Rutas detectadas: `/`, `/_not-found`, `/api/points`, `/mapa`, `/suscripcion`.

```bash
./node_modules/.bin/tsc --noEmit
```

Resultado: pasa.

```bash
npm run lint
```

Resultado original de la auditoria: fallaba con 4 errores y 2 warnings. Tras la mejora del mapa, los errores de `MapApp`, `MapView` y `Sidebar` fueron corregidos; actualmente queda sin errores y con 2 warnings en `src/app/suscripcion/page.tsx` por imports sin usar.

## Hallazgos prioritarios

### P0 - Lint falla y bloquea calidad minima

Archivos afectados:

- `src/components/mapa/MapApp.tsx`
- `src/components/mapa/MapView.tsx`
- `src/components/mapa/Sidebar.tsx`
- `src/app/suscripcion/page.tsx`

Problemas verificados:

- `MapApp.tsx` usa `showNotif` dentro de efectos antes de declararla. ESLint/React Compiler lo marca como `react-hooks/immutability`.
- `MapView.tsx` usa `(container as any)._leaflet_id`, marcado por `@typescript-eslint/no-explicit-any`.
- `Sidebar.tsx` llama `setVisibleCount(PAGE_SIZE)` directamente dentro de un effect, marcado por `react-hooks/set-state-in-effect`.
- `suscripcion/page.tsx` importa `Metadata` y `Footer` sin usarlos.

Recomendacion:

- Convertir `showNotif` a `useCallback` declarado antes de los `useEffect`, o mover la funcion antes de los efectos si se mantiene como funcion estable.
- Tipar el escape hatch de Leaflet con una interfaz local en vez de `any`, por ejemplo `HTMLDivElement & { _leaflet_id?: number }`.
- Replantear `visibleCount`: usar una key de reset, derivar el valor con estado asociado a filtros, o resetear desde el handler que cambia filtros/busqueda en vez de un effect sincronico.
- Eliminar imports muertos en `/suscripcion`.

### P1 - Las paginas completas estan marcadas como Client Components solo por animaciones

Archivos afectados:

- `src/app/page.tsx`
- `src/app/suscripcion/page.tsx`
- `src/hooks/useReveal.ts`

Las paginas usan `'use client'` para correr `IntersectionObserver` sobre `.reveal`. Segun la guia local de Next 16, las paginas/layouts son Server Components por defecto y conviene mover la frontera client al componente interactivo mas chico posible.

Impacto:

- Mas JavaScript en cliente.
- Menos beneficio de Server Components.
- En `/suscripcion`, complica agregar metadata de pagina porque el archivo hoy es Client Component.
- Hay duplicacion de la logica de reveal pese a existir `src/hooks/useReveal.ts`.

Recomendacion:

- Crear un componente chico tipo `RevealController` con `'use client'` que use `useReveal()`.
- Dejar `src/app/page.tsx` y `src/app/suscripcion/page.tsx` como Server Components.
- Agregar `<RevealController />` dentro de cada pagina o en un layout compartido si aplica.

### P1 - El flujo de pago es solo una simulacion de cliente

Archivo afectado:

- `src/components/suscripcion/PrecioSection.tsx`

`handlePago()` valida solo nombre/marca/email, usa `alert`, espera con `setTimeout`, abre un portal modal y simula descargas. La UI dice Flow/Webpay, acceso inmediato, dashboard y kit descargable, pero no hay backend real, transaccion, webhook, persistencia, control de acceso ni documentos descargables reales.

Impacto:

- Riesgo alto si el sitio se publica como producto vendible.
- Cualquier usuario podria abrir el "portal" solo pasando validacion de cliente.
- No hay comprobante, estado de pago, expiracion real ni renovacion.

Recomendacion:

- Implementar una ruta o Server Action para crear transacciones Flow.
- Agregar webhook de confirmacion y persistencia de orden/marca.
- Bloquear acceso al kit por token o sesion.
- Validar formulario en servidor.
- Agregar terminos, privacidad y manejo de errores reales.

### P1 - Popups del mapa construyen HTML con strings

Archivo afectado:

- `src/components/mapa/MapView.tsx`

`marker.bindPopup()` concatena HTML manual usando datos de puntos (`point.n`, `point.a`, `point.h`, materiales). Hoy los datos vienen de JSON local, pero si el origen cambia o se edita sin validar, esto abre una superficie de XSS. Ademas el link `target="_blank"` del popup no incluye `rel`.

Recomendacion:

- Escapar contenido antes de interpolarlo, o renderizar popups con React/React-Leaflet en vez de strings.
- Agregar `rel="noopener noreferrer"` si se mantiene HTML manual.
- Validar/sanitizar `points-data.json` al cargar o en un paso de generacion.

### P1 - Mapa puede sufrir con 3.401 markers

Archivos afectados:

- `src/components/mapa/MapApp.tsx`
- `src/components/mapa/MapView.tsx`
- `src/app/api/points/route.ts`

Estado posterior: mitigado parcialmente.

Cambios aplicados:

- `MapApp` consulta `/api/points` con `type` y `q` usando `URLSearchParams`.
- La busqueda usa debounce de 300 ms y aborta requests obsoletos con `AbortController`.
- El filtrado por tipo y texto ya no se duplica en cliente.
- `MapView` usa `preferCanvas` y un renderer Canvas para `circleMarker`.
- `MapView` solo crea markers para puntos dentro del viewport actual, manteniendo el punto seleccionado si queda fuera de vista.
- La paginacion del sidebar ahora se resetea por remount con `key`, sin effect sincronico.

Situacion original:

La API soporta `type` y `q`, pero `MapApp` hace `fetch('/api/points')`, trae todos los puntos y filtra en cliente. `MapView` destruye y vuelve a crear markers cuando cambia `points`.

Impacto:

- Costo inicial innecesario en red y memoria.
- Renders pesados en dispositivos moviles.
- La paginacion del sidebar no reduce los markers del mapa.

Recomendacion:

- Usar los query params existentes de `/api/points` para filtrar por tipo y texto en servidor.
- Evaluar clustering (`leaflet.markercluster`, `supercluster`) o capa canvas/vectorial.
- Para busqueda, considerar debounce antes de refetch o filtrado.
- Para mapas grandes, pedir puntos por bounding box/zoom.

Pendiente si la data crece mucho:

- Agregar clustering real o fetch por bounding box desde la API.
- Separar resultados de sidebar y markers de mapa si se quiere que el listado no cargue todos los puntos filtrados.

### P2 - Geolocalizacion se solicita automaticamente

Archivo afectado:

- `src/components/mapa/MapApp.tsx`

Al cargar `/mapa`, se llama `navigator.geolocation.getCurrentPosition` de inmediato. Aunque mejora la experiencia si el usuario acepta, puede sentirse invasivo y generar rechazo antes de explicar el valor.

Recomendacion:

- Pedir ubicacion solo despues de que el usuario presione "Mi ubicacion".
- Opcional: mostrar microcopy previo y recordar si el permiso fue denegado.

### P2 - Falta cobertura de tests

No se encontraron archivos `test`, `spec`, `playwright.config`, `vitest.config`, `jest.config` o `cypress.config`.

Recomendacion inicial:

- Unit tests para `haversineDistance`, `formatDistance`, `filterPoints` y `queryPoints`.
- Smoke/e2e para `/`, `/mapa`, `/suscripcion`.
- Test de accesibilidad basico para menu mobile, FAQ y flujo de formulario.

### P2 - SEO, metadata y archivos de produccion incompletos

Observaciones:

- `src/app/layout.tsx` tiene metadata global.
- `src/app/mapa/page.tsx` tiene metadata propia.
- `/suscripcion` no exporta metadata porque el archivo esta como Client Component.
- No se observaron `robots`, `sitemap`, Open Graph images personalizadas, `not-found.tsx` o `global-error.tsx`.

Recomendacion:

- Agregar metadata especifica para `/suscripcion` despues de convertirla en Server Component.
- Agregar `robots.ts`, `sitemap.ts`, `not-found.tsx` y `global-error.tsx`.
- Preparar Open Graph por pagina si el sitio se va a compartir comercialmente.

### P2 - Accesibilidad de componentes interactivos

Observaciones:

- `FaqSection` usa `div` clickeable para abrir/cerrar preguntas. No es accesible por teclado como un `button`.
- Algunos SVG decorativos grandes no tienen `aria-hidden` ni etiqueta clara.
- Hay varios iconos/textos simbolicos como flechas, circulos o candados que conviene revisar con lector de pantalla.

Recomendacion:

- Convertir cada pregunta de FAQ en `button` con `aria-expanded` y `aria-controls`.
- Marcar SVG decorativos con `aria-hidden="true"`.
- Revisar orden de foco en menu mobile, bottom sheet y modal.

### P2 - Mantencion visual: mucha repeticion e inline styling

Observaciones:

- Hay estilos Tailwind y valores hex repetidos extensivamente.
- Hay SVGs grandes embebidos en componentes (`Hero`, `YendoLogo`).
- Hay footers/CTAs similares reimplementados.
- Existe `src/hooks/useReveal.ts`, pero las paginas duplican la logica.

Recomendacion:

- Extraer componentes compartidos: `RevealController`, `BrandLink`, `PrimaryCta`, `Footer` variante, `SectionHeading`.
- Mover SVG de marca a un asset o componente unico optimizado.
- Usar tokens de Tailwind/theme para color, borde, radios y tipografias.

### P2 - Datos sin validacion estructural

Archivo afectado:

- `src/lib/server/points.ts`

`rawData` se castea como `Point[]` con `as unknown as Point[]`. Hay sanitizacion de query/type, pero no validacion de forma, lat/lng, materiales ni horarios.

Recomendacion:

- Agregar schema de validacion, por ejemplo con Zod o una funcion local simple.
- Validar durante build o al importar datos.
- Generar reporte de duplicados y puntos invalidos.

## Orden sugerido de trabajo

1. Corregir `npm run lint` hasta que pase.
2. Convertir `/` y `/suscripcion` de vuelta a Server Components usando un `RevealController` cliente.
3. Agregar metadata real para `/suscripcion` y limpiar Footer duplicado/imports muertos.
4. Endurecer `MapView` contra HTML injection y mejorar link externo.
5. Optimizar el mapa: query params de API, clustering o render por viewport.
6. Definir si el flujo de pago sera real ahora o si debe mostrarse explicitamente como demo.
7. Agregar tests basicos y smoke e2e.

## Comandos utiles para siguiente agente

```bash
npm run lint
npm run build
./node_modules/.bin/tsc --noEmit
```

Para revisar documentacion local antes de tocar Next:

```bash
find node_modules/next/dist/docs/01-app -maxdepth 3 -type f
```

Lecturas locales recomendadas:

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- `node_modules/next/dist/docs/01-app/02-guides/production-checklist.md`
- `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/layout.md`

## Nota para agentes

No hacer `git reset`, no revertir cambios existentes y no asumir que los archivos modificados son de esta auditoria. El unico archivo creado por esta auditoria es `AI_AUDIT.md`.
