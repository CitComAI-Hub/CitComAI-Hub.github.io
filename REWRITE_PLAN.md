# Reescritura de CitComAI-Hub.github.io — plan

Rama `docs/rewrite-2026`, sacada de `main`. Este fichero está fuera de `docs/`, así que no se publica. Se borra antes del merge.

## Objetivos

1. **Quitar lo legado** y poner al día todas las guías con lo que hay desplegado hoy.
2. **MIAIS como ejemplo didáctico de integración**: niveles, ramas del repo y un método para que otros hagan su propio servicio.
3. **Lavado de cara** con el estilo de CitCom (marketplace y web oficial).
4. **Describir la infraestructura actual**, con diagramas.
5. **El catálogo y los servicios se van al marketplace**: una sola página de entrada y redirecciones desde las URLs antiguas.
6. **Documentar la infraestructura de Valencia.**
7. **Toolbox centrada** en Lepus, NGSI-LD/FiLiP, `ds-consumer-auth` y los wallets (Lissi, atesta). Lo demás va a "Más herramientas".
8. **Un hilo conductor**: qué es CitCom, en qué se basa, qué tecnología usa, qué ofrecemos como paquete a los TEF y guías prácticas temáticas.

Idioma de la web: **inglés** (proyecto internacional).

---

## 1. Qué hay hoy y qué hacemos con cada cosa

| Sección actual | Estado | Destino |
|---|---|---|
| `welcome.md` + `overrides/home.html` | genérico | **Reescribir**: portada nueva con el estilo del marketplace |
| `getting_started/` (nodes, interoperability, data spaces, get involved/join) | parte vigente (MIMs, niveles), parte legado (join con el flujo antiguo) | **Reescribir** dentro de "Understand CitCom" y "Guides" |
| `data_catalog/` (catálogo propio con JS, plantillas y workflow `issue_dataset_to_pr.yml`) | sustituido por el marketplace | **Eliminar** (con su JS, CSS, metadatos y workflow) y redirigir al marketplace |
| `documentation/verifiable_credentials/keycloak` (566 líneas) | Keycloak antiguo, sin OID4VCI | **Reescribir** para Keycloak 26.6 (OID4VCI, LegalPerson/Machine/ServiceCredential) |
| `documentation/trust_frameworks/fiware_trust_anchor` | API 0.0.2 | **Actualizar** (TIR/TIL actuales) dentro de la arquitectura |
| `documentation/data_space_connectors/{fiware,eclipse}` | antiguo | **Fusionar** en "Data spaces" (FIWARE y EDC) |
| `documentation/mv_data_space/fiware/*` (despliegue paso a paso en AWS) | legado | **Eliminar**. Lo vigente es k3s + Terraform. Un resumen pasa a "Deploy your own" |
| `documentation/mv_data_space/eclipse/*` (Sergio, 05/2026) | vigente: el data space EDC | **Mantener**, con el estilo nuevo, en "Data spaces → Eclipse EDC data space" |
| `documentation/data_federation/lepus.md` | antiguo (83 líneas) | **Reescribir** en la Toolbox (Lepus v1.2, caché, ids, `keyValues`) |
| `documentation/data_federation/iot_agent.md` (627 líneas) | experimento | **Mover** a "Más herramientas / experimentos" |
| `documentation/ai_assessment/*` (AI Trustworthiness Label) | vigente, de otro socio | **Mantener** sin cambiar el contenido; solo estilo y sitio en la navegación |
| `documentation/local_digital_twins/` + `toolbox/ldt_toolkit.md` | vigente, de otro socio (LIST) | **Mantener**; solo estilo y sitio en la navegación |
| `services/waste_collection.md` (MIAIS) | antiguo (flujo jwt_vc, AWS nip.io, cliente archivado) | **Reescribir entero** como capítulo didáctico (sección 4) |
| `services/` (index, GenAI MVP, Healthy Routes, Container Location Optimization) | ficha por servicio | Los que están en el marketplace **enlazan allí**. Los que no, pasan a "Use cases" como casos de uso de los TEF |
| `tef/*` (Nordic, Central, South) | vigente, de cada socio | **Mantener**; Valencia se amplía con la sección 5 |
| `toolbox/{ai_toolkit, ai_logging_monitor, mims_toolkit, other_toolkit}` | lista larga y desigual | **"Más herramientas"**, plegada |
| `faq/` | vigente | **Mantener**, al día ("Contribute") |

**Contenido de otros socios** (TEF, AI assessment, LDT, GenAI MVP, Healthy Routes, Eclipse EDC): no se reescribe su contenido. Solo cambian el estilo y su sitio en la navegación, y se avisa a sus autores (Sergio Marti, LIST, socios de los TEF) en el PR.

---

## 2. Estructura nueva (hilo conductor)

```
Home                               portada: qué es CitCom, 4 puertas de entrada
1. Understand CitCom               el proyecto, en lenguaje claro
   ├─ The project & the TEFs       qué es un TEF, supernodos, qué se ofrece
   ├─ Interoperability             MIMs, niveles 0-1-2
   └─ Data spaces in 5 minutes     conceptos: participante, conector, credencial, contrato
2. The CitCom data spaces          la infraestructura real, con diagramas
   ├─ Overview                     dos tecnologías y cómo se conectan
   ├─ FIWARE data space            componentes, flujos (alta, compra, acceso de máquina y de persona)
   ├─ Eclipse EDC data space       (contenido actual de Sergio, con el estilo nuevo)
   └─ Bridging both                Lepus publicado en EDC con OAuth2
3. Valencia TEF node               VLCi → Lepus → conector townhall-vlc; datos, servicios, quién es quién
4. MIAIS: build an interoperable service   capítulo didáctico (sección 4 de este plan)
5. Guides                          prácticas, una tarea por guía
   ├─ Get a wallet and your credentials       Lissi / atesta-id-wallet, LEAR, ServiceCredential
   ├─ Join the data space                     onboarding, perfil de organización en el marketplace
   ├─ Use data from your code                 comprar una oferta, MachineCredential, ds-consumer-auth + FiLiP
   ├─ Publish a dataset                       broker/Lepus, oferta, política ODRL, credentialsConfiguration
   ├─ Publish a web service                   APISIX con login de wallet, rol propio (MIAIS como ejemplo)
   ├─ Publish to the EDC data space           client credentials, assets
   └─ Deploy your own connector               resumen k3s + Terraform (dsc_v10), qué piezas hay
6. Marketplace                     una sola página: qué hay, cómo comprar, enlaces (sustituye a catálogo y servicios)
7. Toolbox
   ├─ Lepus                        NGSI-v2 → NGSI-LD
   ├─ NGSI-LD & FiLiP              consultar el broker desde Python
   ├─ ds-consumer-auth             librería de acceso al data space
   ├─ Wallets                      Lissi ID Wallet, atesta-id-wallet
   ├─ Smart Data Models            modelos usados
   └─ More tools (plegado)         AI toolkit, logging monitor, MIMs tools, LDT toolkit, IoT Agent, otros
8. AI Trustworthiness Label        (contenido actual)
9. Local Digital Twins             (contenido actual)
10. Use cases                      GenAI MVP, Healthy Routes, Container Location Optimization…
11. FAQ & Contribute
```

Cada guía sigue la misma plantilla:
- *Lo que vas a conseguir*, *Lo que necesitas* (pestañas por rol: proveedor/consumidor) y pasos numerados;
- *Comprueba que funciona* (un `curl` o una captura de lo esperado) y *Si algo falla* (tabla síntoma → causa → arreglo);
- *Siguiente paso*.

Todo esto sale de la experiencia real: los errores del verifier, los ids de política sin guiones, la regla de los roles, la sesión caducada del marketplace…

---

## 3. Infraestructura y diagramas

Diagramas en **Mermaid** (la web ya lo soporta), con un tema propio para que encajen en el estilo nuevo:

1. **Mapa general**: trust anchor (TIR/TIL), marketplace (BAE + TMForum + contract-management), onboarding, participantes (townhall-vlc, vrain), wallets.
2. **Dentro de un conector**: Keycloak (emisor OID4VCI), verifier, APISIX + OPA/ODRL (PAP), TIL local, brokers (Orion-LD, Lepus).
3. **Flujo de compra**: oferta → pedido → contract-management → TIL + política.
4. **Acceso de una máquina**: credencial → verifier → token → APISIX → OPA → broker.
5. **Acceso de una persona a un servicio**: QR del verifier → sesión de APISIX → OPA → app (MIAIS).
6. **Puente con EDC**: token de Keycloak → ruta `/edc/lepus` → Lepus → VLCi.
7. **Valencia**: VLCi (Orion v2, Keystone) → Lepus → APISIX de townhall-vlc; Airflow → Orion-LD (TrafficState).
8. **Despliegue**: clúster k3s, namespaces por participante, capas de Terraform.

**Qué no se publica**: el repo `dataspace-on-upv` es privado. Se describe la arquitectura y las URLs públicas, pero nunca IPs internas, Tailscale, nombres de nodos, secretos ni rutas del servidor.

---

## 4. Capítulo MIAIS (didáctico)

Objetivo: que alguien entienda **qué cambia en un servicio al subir de nivel de interoperabilidad** y pueda repetirlo con su propio servicio.

1. **Qué hace la MIAIS**: optimizar rutas de recogida con el llenado de los contenedores. Una captura y el flujo en una frase.
2. **Los tres niveles, uno por rama** (`waste-collection-demo`):
   | Nivel | Rama | Datos de | Acceso |
   |---|---|---|---|
   | 0 · integración a medida | `valencia` (histórica) | API propia | — |
   | 1 · NGSI-LD + Smart Data Models | `mvs-orionld` / `mvs-scorpiold` | broker local de ejemplo | abierto |
   | 2 · data space | `master` | contenedores reales del Ajuntament vía Lepus | MachineCredential con `ds-consumer-auth` |

   Hay que verificar y completar la tabla: qué es `mvds` y si `mvs-ds` y `dynamic-data`, que solo existen en local, se quedan.
3. **Recorrido por el código**: dónde se leen los datos (`DataSource`), qué cambia entre ramas (un diff comentado), configuración por variables de entorno y Docker.
4. **Ejecutarla**: en local (nivel 1, `docker compose`) y contra el data space (nivel 2: comprar la oferta, credenciales, variables).
5. **Ofrecerla como servicio** en el marketplace: detrás de APISIX, login con wallet, rol `waste_collection_user`. Enlace a la guía "Publish a web service".
6. **Haz el tuyo**: lista de comprobación (modelo de datos SDM, cliente NGSI-LD, autenticación con `ds-consumer-auth`, URLs relativas si va detrás de un prefijo, imagen Docker con tag, oferta) y una plantilla de proyecto.

---

## 5. Valencia

Se amplía `tef/south_connect/valencia.md` y se convierte en el capítulo 3:
- **Quién**: Ajuntament (VLCi) y VRAIN-UPV.
- **Qué datos**: las cuatro ofertas del marketplace, con sus modelos.
- **Cómo fluyen**: diagrama 7.
- **Qué servicios**: MIAIS.
- **Cómo se accede**: desde este data space y desde EDC.

---

## 6. Estilo

Material for MkDocs, con un tema propio en la línea del marketplace y de citcom.ai:
- **Paleta**: fondo oscuro `#14161d`/`#1f242c` en la cabecera, la portada y el pie; acento turquesa `#3cc3cf` (botones del marketplace); verdes de la marca `#00c48c` y `#00724d`; azul `#00add3`. Modo claro y oscuro.
- **Tipografía**: *Blinker* para el texto (la del marketplace), y titulares en mayúsculas condensadas, como la portada del marketplace (por confirmar cuál es).
- **Portada**: héroe oscuro con el lema, botones a "Understand", "Marketplace", "Build a service" y "Toolbox", tarjetas por audiencia (ciudades, proveedores de datos, desarrolladores de IA, TEF) y franja de socios con el logo de la UE.
- **Componentes**: tarjetas (`grid cards`), pestañas por rol, avisos con estilo, `navigation.tabs` arriba, `navigation.instant`, búsqueda con sugerencias, botón de copiar en el código, pie con logos.
- **Redirecciones** con `mkdocs-redirects`: `data_catalog/*` y `services/*` → marketplace o su página nueva; las guías antiguas → las nuevas. Así no se rompen enlaces externos.

---

## 7. Fases (un commit o un PR por fase)

1. **Esqueleto y estilo**: tema, portada, navegación nueva con páginas vacías, redirecciones, `mkdocs build --strict` en verde.
2. **Understand CitCom + Data spaces**: textos y diagramas 1–6.
3. **Valencia + MIAIS**: capítulos 3 y 4, diagrama 7.
4. **Guides**: las siete guías.
5. **Toolbox + Marketplace**: páginas centrales y "More tools"; quitar el catálogo y su workflow.
6. **Contenido de socios**: moverlo, darle el estilo nuevo y avisar a los autores.
7. **Repaso**: enlaces (comprobador de enlaces), capturas actualizadas, ortografía y una lectura de principio a fin.

En cada fase: `mkdocs serve` en local y capturas para revisar antes de seguir. PR a `develop`, que es la convención del repo; de `develop` pasa a `main`, que es lo que publica la CI.

## 8. Decisiones (2026-10-28)

1. **Contenido de otros socios**: el repo es colaborativo, así que también se puede reescribir. Se avisa a los autores en el PR igualmente.
2. **Servicios que no están en el marketplace** (GenAI MVP, Healthy Routes, Container Location Optimization): **se quitan**, sin sección "Use cases". Puede que llegue una "operational guidance" con todos los casos de uso; si llega, se enlaza.
3. **Estilo**: la paleta vale. Referencia visual: [citcomtef.eu](https://citcomtef.eu/) (texto `#15141A`, *FK Grotesk* fina, acento cian). FK Grotesk es comercial: el repo solo tiene `FKGrotesk-Regular.woff2`, que se queda para el título del sitio; el resto usa una alternativa libre parecida (Google Fonts).
4. **EDC**: se describe como alternativa (qué hay desplegado y su arquitectura). **No** se escribe la guía "Publish to the EDC data space" por ahora.
5. **Ramas de la MIAIS**: solo se limpian las que no aportan; se conservan las útiles para la didáctica (p. ej., las de nivel 1).

Consecuencias en la estructura (sección 2): desaparece "10. Use cases" y la guía "Publish to the EDC data space"; "Bridging both" describe el puente sin pasos de publicación.
