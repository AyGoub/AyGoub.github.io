export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  longDescriptionFr?: string
  category: string
  date: string
  technologies: string[]
  github?: string
  demo?: string
  report?: string
  featured: boolean
  images?: string[]
  challenges?: string[]
  solutions?: string[]
  outcomes?: string[]
  teamSize?: number
  duration?: string
}

export const projects: Project[] = [
  {
    slug: "hash-identifier",
    title: "Hash Identifier — Format-Based Hash Recognition",
    description: "Python tool identifying hash types by pure format analysis (prefix, alphabet, length, context) — no cryptographic computation. Returns a ranked candidate list with hashcat/john modes, exposed as a CLI, a Python API and a Flask web app deployed on Render.",
    longDescription: `
A hash identification tool that determines the likely algorithm behind a hash string through **format analysis only** — prefix, alphabet, length and surrounding context. No cryptographic computation is ever performed: the tool is a pattern recognizer, not a cracker.

## 🎯 Core Design Principle

The result is **always a ranked list, never a single answer**. A 32-character hexadecimal string matches at least eight plausible algorithms (MD5, NTLM, MD4, RIPEMD-128, …), and claiming otherwise would simply be false. The tool ranks candidates by confidence instead of pretending to a certainty it cannot have.

## 🔍 Detection Order

| Step | Signal | Role |
|------|--------|------|
| 1 | **Prefix** | \`$2b$\`, \`{SSHA}\`, \`$argon2id$\`… unique signature, short-circuits everything else |
| 2 | **Alphabet** | hex, standard base64, crypt base64 (\`./A-Za-z0-9\`), decimal |
| 3 | **Length** | discriminates the family, rarely the algorithm |
| 4 | **Context** | separators, salt, pwdump line, MySQL \`*\` prefix |

Each candidate is returned with its **hashcat mode** and **john format** name, so the output feeds directly into the next step of a workflow.

## 🏗️ Architecture

Strict single-responsibility layering, with dependencies always pointing inward:

\`\`\`
cli.py      ┐
web/app.py  ┼→ engine.py → normalize.py / charset.py → models.py
\`\`\`

| Path | Role | Never does |
|------|------|-----------|
| \`models.py\` | Shared types: \`Rule\`, \`Candidate\`, \`Parsed\` | no logic |
| \`normalize.py\` | Dirty input → clean input | guesses no algorithm |
| \`charset.py\` | Alphabet predicates | knows no algorithm name |
| \`engine.py\` | Rules → candidates → scores → sort | no \`print()\` |
| \`cli.py\` | Arguments, I/O, display | no identification logic |
| \`data/rules.json\` | All domain knowledge | — |
| \`web/app.py\` | Flask API: serves page + \`/api/identify\` | no identification logic |

The CLI and the web API are two façades over the same \`engine.identify()\` — adding an interface means one new file and **zero changes to the engine**.

## ⚙️ Data-Driven Rules

Adding a new algorithm is a single JSON entry, zero lines of Python:

\`\`\`json
{
  "name": "SHA-224",
  "regex": "[a-fA-F0-9]{56}",
  "hashcat": "1300",
  "john": "raw-sha224",
  "base_score": 50,
  "confidence": "ambigu",
  "exclusive": false
}
\`\`\`

\`base_score\` is **uniform per length group** (50 for raw hex): it measures pattern precision, not popularity. Ties between same-length algorithms are broken by a separate \`POPULARITE\` map in \`engine.py\` — keeping "how specific is this pattern" and "how common is this algorithm" as two independent axes.

## 💻 Interfaces

\`\`\`bash
hashid 5d41402abc4b2a76b9719d911017c592
cat hashes.txt | hashid --json
hashid -f hashes.txt --top 3
\`\`\`

\`\`\`python
from hashid import identify
identify("5d41402abc4b2a76b9719d911017c592")
\`\`\`

A Flask layer serves a terminal-styled front end and a JSON API on top of the same engine:

- \`GET /\` — the page
- \`GET /api/identify?hash=&top=\` — JSON \`{hash, count, candidates}\`

## 📦 Packaging & Deployment

- \`src/\` layout so tests run against the **installed package**, not the working directory
- Editable install (\`pip install -e ".[dev]"\`) with \`dev\` and \`web\` extras
- Deployed free on **Render** via a \`render.yaml\` Blueprint — every \`git push\` triggers a redeploy
- Regression tests on real hashes: a new rule that breaks a test is a rule that is too broad
    `,
    longDescriptionFr: `
Un outil d'identification de hash qui détermine l'algorithme probable derrière une chaîne par **analyse de format uniquement** — préfixe, alphabet, longueur et contexte. Aucun calcul cryptographique n'est effectué : l'outil est un reconnaisseur de motifs, pas un casseur de hash.

## 🎯 Principe de conception

Le résultat est **toujours une liste classée, jamais une réponse unique**. Une chaîne de 32 caractères hexadécimaux correspond à au moins huit algorithmes plausibles (MD5, NTLM, MD4, RIPEMD-128, …), et prétendre le contraire serait faux. L'outil classe les candidats par confiance plutôt que de simuler une certitude qu'il ne peut pas avoir.

## 🔍 Ordre de détection

| Étape | Signal | Rôle |
|-------|--------|------|
| 1 | **Préfixe** | \`$2b$\`, \`{SSHA}\`, \`$argon2id$\`… signature unique, court-circuite tout le reste |
| 2 | **Alphabet** | hex, base64 standard, base64 crypt (\`./A-Za-z0-9\`), décimal |
| 3 | **Longueur** | discrimine la famille, rarement l'algorithme |
| 4 | **Contexte** | séparateurs, sel, ligne pwdump, préfixe \`*\` de MySQL |

Chaque candidat est retourné avec son **mode hashcat** et son **format john**, afin que la sortie alimente directement l'étape suivante du workflow.

## 🏗️ Architecture

Responsabilité unique par module, avec des dépendances toujours dirigées vers l'intérieur :

\`\`\`
cli.py      ┐
web/app.py  ┼→ engine.py → normalize.py / charset.py → models.py
\`\`\`

| Chemin | Rôle | Ne fait jamais |
|--------|------|----------------|
| \`models.py\` | Types partagés : \`Rule\`, \`Candidate\`, \`Parsed\` | aucune logique |
| \`normalize.py\` | Entrée sale → entrée propre | ne devine aucun algorithme |
| \`charset.py\` | Prédicats sur l'alphabet | ne connaît aucun nom d'algorithme |
| \`engine.py\` | Règles → candidats → scores → tri | aucun \`print()\` |
| \`cli.py\` | Arguments, E/S, affichage | aucune logique d'identification |
| \`data/rules.json\` | Toute la connaissance métier | — |
| \`web/app.py\` | API Flask : sert la page + \`/api/identify\` | aucune logique d'identification |

Le CLI et l'API web sont deux façades sur le même \`engine.identify()\` — ajouter une interface, c'est un fichier de plus et **zéro modification du moteur**.

## ⚙️ Règles pilotées par les données

Ajouter un algorithme est une simple entrée JSON, zéro ligne de Python :

\`\`\`json
{
  "name": "SHA-224",
  "regex": "[a-fA-F0-9]{56}",
  "hashcat": "1300",
  "john": "raw-sha224",
  "base_score": 50,
  "confidence": "ambigu",
  "exclusive": false
}
\`\`\`

\`base_score\` est **uniforme par groupe de longueur** (50 pour du hex brut) : il mesure la précision du motif, pas la popularité. Ce qui départage deux algorithmes de même longueur, c'est le dictionnaire \`POPULARITE\` dans \`engine.py\` — deux axes indépendants : « à quel point ce motif est spécifique » et « à quel point cet algorithme est courant ».

## 💻 Interfaces

\`\`\`bash
hashid 5d41402abc4b2a76b9719d911017c592
cat hashes.txt | hashid --json
hashid -f hashes.txt --top 3
\`\`\`

\`\`\`python
from hashid import identify
identify("5d41402abc4b2a76b9719d911017c592")
\`\`\`

Une couche Flask sert un front au style terminal et une API JSON par-dessus le même moteur :

- \`GET /\` — la page
- \`GET /api/identify?hash=&top=\` — JSON \`{hash, count, candidates}\`

## 📦 Packaging & Déploiement

- Layout \`src/\` pour que les tests s'exécutent sur le **paquet installé**, pas sur le dossier courant
- Installation éditable (\`pip install -e ".[dev]"\`) avec les extras \`dev\` et \`web\`
- Déployé gratuitement sur **Render** via un Blueprint \`render.yaml\` — chaque \`git push\` redéclenche le déploiement
- Tests de non-régression sur des hashes réels : une nouvelle règle qui casse un test est une règle trop large
    `,
    category: "Cybersecurity",
    date: "2026",
    technologies: ["Python", "Flask", "REST API", "JSON", "pytest", "CLI", "Regex", "Render", "hashcat", "John the Ripper"],
    github: "https://github.com/AyGoub/hash_identifier",
    demo: "https://hash-identifier-9qwi.onrender.com/",
    featured: true,
    images: [],
    challenges: [
      "Hash identification is inherently ambiguous: a 32-character hex string matches at least eight algorithms, so any single-answer output would be dishonest",
      "Keeping domain knowledge (which algorithm looks like what) out of the code, so new algorithms do not require Python changes",
      "Ranking candidates fairly without conflating pattern precision with algorithm popularity",
      "Serving the same identification logic from a CLI, a Python API and a web endpoint without duplicating the engine",
      "Deploying on a free hosting tier where the service sleeps and cold-starts on the first request"
    ],
    solutions: [
      "Designed the output as a ranked candidate list with confidence levels, plus hashcat mode and john format for each candidate",
      "Externalized every rule into data/rules.json — adding an algorithm is one JSON entry and zero lines of Python",
      "Split scoring into two independent axes: a base_score uniform per length group for pattern precision, and a separate POPULARITE map to break ties",
      "Enforced an inward-only dependency direction (cli.py and web/app.py both depend on engine.py, never the reverse), making each interface a thin facade",
      "Adopted a four-step detection order — prefix short-circuit, then alphabet, length and context — so unambiguous formats resolve immediately"
    ],
    outcomes: [
      "Identification engine covering prefixed formats (bcrypt, SSHA, Argon2), raw hex, base64 and contextual formats (pwdump, MySQL)",
      "Three interfaces over a single engine: CLI, importable Python API, and Flask JSON API",
      "Zero-code extensibility — new algorithms added declaratively via rules.json",
      "Live web demo deployed on Render with continuous deployment on every push",
      "Regression test suite on real hashes acting as a guard against overly broad rules",
      "Published on GitHub: github.com/AyGoub/hash_identifier"
    ],
    teamSize: 1,
    duration: "Completed (2026)"
  },
  {
    slug: "dark-web-monitor",
    title: "Dark Web Monitor — CTI Passive Surveillance Tool",
    description: "Passive CTI surveillance tool monitoring .onion sources for threat intelligence, extracting IOCs, and auto-scoring threat criticality — deployed via Docker with strict OPSEC.",
    longDescription: `
A Cyber Threat Intelligence (CTI) tool for passive monitoring of Tor .onion sources. Detects mentions of a target organization in public dark web sources, extracts Indicators of Compromise (IOCs), and automatically qualifies threat criticality.

## 🎯 Project Overview

Built as an OPSEC-strict passive reconnaissance tool for SOC/CERT environments. All traffic is routed through a local Tor daemon (SOCKS5 proxy), and the tool verifies Tor exit before any collection.

**Usage scope:** Passive monitoring of public sources only — no authentication, no marketplace interaction, no download of illegal content.

## 🔍 Threat Detection Categories

- **fuite_information** — Source code leaks, API keys, database dumps, exposed secrets
- **compromission** — Credentials, stealer logs, VPN/RDP access sales
- **atteinte_image** — Phishing pages, typosquatting, fake login portals

## 🧩 IOC Extraction

Automatically extracts and classifies IOCs from .onion page content:
- Credentials (\`email:password\` pairs)
- AWS access keys (\`AKIA…\` pattern)
- IP addresses
- Cryptographic hashes (MD5, SHA-1, SHA-256)

## 🔐 k-Anonymity Breach Verification (HIBP)

Detected passwords are verified against the **Have I Been Pwned** API using the k-anonymity model:
- Only the first 5 characters of the SHA-1 hash are sent to the API
- The full password or hash is never transmitted
- The server returns all hashes matching that prefix; the check is done locally

## 📊 Threat Scoring

| Score | Meaning |
|-------|---------|
| INFO | Mention found, no IOC |
| LOW | Generic IOC, target not confirmed |
| MEDIUM | IOC linked to target |
| HIGH | Active credential or access leak for target |
| CRITICAL | Confirmed breach with mass credential/access dump |

Passwords are redacted (\`:***redacted***\`) in all alert outputs.

## 🏗️ Architecture & Deployment

- **Alerting** — Alerts written to \`alerts.jsonl\` (JSON Lines), ready for Elasticsearch/OpenSearch ingestion
- **Docker Compose** — Containerized deployment for reproducibility and isolation
- **OPSEC** — Tor exit verification before any collection; designed for isolated VM deployment

## 🛠️ Stack

| Component | Technology |
|-----------|-----------|
| Language | Python 3.10+ |
| Anonymous network | Tor (SOCKS5 via requests[socks]) |
| HTML parsing | BeautifulSoup4 |
| Breach API | Have I Been Pwned (k-anonymity) |
| Containerization | Docker / Docker Compose |
    `,
    longDescriptionFr: `
Outil de Cyber Threat Intelligence (CTI) pour la surveillance passive de sources .onion sur le réseau Tor. Détecte les mentions d'une organisation cible sur des sources dark web publiques, extrait des Indicateurs de Compromission (IOC) et qualifie automatiquement la criticité des menaces.

## 🎯 Présentation du projet

Conçu comme un outil de reconnaissance passive OPSEC-strict pour les environnements SOC/CERT. Tout le trafic est routé via un démon Tor local (proxy SOCKS5), et l'outil vérifie la sortie Tor avant toute collecte.

**Périmètre d'usage :** Surveillance passive de sources publiques uniquement — pas d'authentification, pas d'interaction avec les marketplaces, pas de téléchargement de contenu illégal.

## 🔍 Catégories de détection

- **fuite_information** — Fuites de code source, clés API, database dumps, secrets exposés
- **compromission** — Credentials, logs de stealers, ventes d'accès VPN/RDP
- **atteinte_image** — Pages de phishing, typosquatting, faux portails de connexion

## 🧩 Extraction d'IOC

Extraction et classification automatiques des IOC depuis le contenu des pages .onion :
- Credentials (paires \`email:password\`)
- Clés d'accès AWS (motif \`AKIA…\`)
- Adresses IP
- Hashes cryptographiques (MD5, SHA-1, SHA-256)

## 🔐 Vérification HIBP en k-Anonymat

Les mots de passe détectés sont vérifiés contre **Have I Been Pwned** via le modèle k-anonymat :
- Seuls les 5 premiers caractères du hash SHA-1 sont envoyés à l'API
- Le mot de passe complet ou le hash ne transite jamais
- Le serveur retourne tous les hashes correspondant au préfixe ; la vérification est effectuée localement

## 📊 Scoring de criticité

| Score | Signification |
|-------|--------------|
| INFO | Mention trouvée, pas d'IOC |
| LOW | IOC générique, cible non confirmée |
| MEDIUM | IOC lié à la cible |
| HIGH | Fuite de credentials ou d'accès actifs pour la cible |
| CRITICAL | Brèche confirmée avec dump massif de credentials/accès |

Les mots de passe sont masqués (\`:***redacted***\`) dans toutes les sorties d'alertes.

## 🏗️ Architecture & Déploiement

- **Alertes** — Écrites dans \`alerts.jsonl\` (JSON Lines), prêtes à être ingérées dans Elasticsearch/OpenSearch
- **Docker Compose** — Déploiement conteneurisé pour la reproductibilité et l'isolation
- **OPSEC** — Vérification de la sortie Tor avant toute collecte ; conçu pour un déploiement en VM isolée
    `,
    category: "Cybersecurity",
    date: "2026",
    technologies: ["Python", "Tor (SOCKS5)", "BeautifulSoup4", "Have I Been Pwned API", "Docker", "CTI", "IOC Extraction"],
    github: "https://github.com/AyGoub/darkweb-monitor",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Routing all traffic through Tor while verifying OPSEC before any collection",
      "Implementing k-anonymity for HIBP password checking without leaking the full hash",
      "Designing a multi-category threat classifier that minimizes false positives",
      "Masking sensitive data in alert output while preserving forensic value",
      "Building an extensible alert format compatible with SIEM ingestion pipelines"
    ],
    solutions: [
      "SOCKS5 proxy via requests[socks] + mandatory Tor exit check before collection loop",
      "SHA-1 prefix (5 chars) sent to HIBP; local suffix match against returned hash list",
      "Three-category threat taxonomy with keyword-based classification per category",
      "Regex-based IOC extractor with automatic password redaction in JSON alert output",
      "JSON Lines format (alerts.jsonl) enabling direct ingestion into Elasticsearch/OpenSearch"
    ],
    outcomes: [
      "Functional CTI passive monitoring tool covering credential leaks, access sales, and brand threats",
      "k-anonymity HIBP integration ensuring zero sensitive data transmission",
      "Automated IOC extraction: credentials, AWS keys, IPs, cryptographic hashes",
      "Criticality scoring from INFO to CRITICAL with target-presence weighting",
      "Containerized deployment via Docker Compose for reproducible SOC/CERT environments"
    ],
    teamSize: 1,
    duration: "Completed (June 2026)"
  },
  {
    slug: "student-sec-score",
    title: "StudentSecScore — DevSecOps Automated Security Platform",
    description: "SaaS platform for automated security analysis of GitHub repositories via OAuth, integrating SCA (Trivy), SAST (SonarQube/Semgrep), and DAST (OWASP ZAP) to generate dynamic OWASP compliance scores.",
    longDescription: `
A web application that automates the security analysis of GitHub repositories through OAuth integration. Combines multiple security scanning tools (SCA, SAST, DAST) into a unified pipeline and generates dynamic compliance scores aligned with OWASP Top 10.

## 🎯 Project Overview

StudentSecScore makes DevSecOps accessible by providing automated, one-click security analysis of any GitHub repository. The platform generates actionable compliance reports with exportable dashboards.

## 🔍 Security Scanning Pipeline

**SCA — Software Composition Analysis**
- **Trivy** — Scans dependencies and container images for known CVEs
- Detects outdated libraries, insecure package versions, and license risks

**SAST — Static Application Security Testing**
- **SonarQube** — Code quality and security bug detection
- **Semgrep** — Fast, customizable static analysis with security rulesets

**DAST — Dynamic Application Security Testing**
- **OWASP ZAP** — Automated web vulnerability scanning (injection, XSS, CSRF, etc.)
- Tests running applications against OWASP Top 10 attack vectors

## 📊 Compliance Scoring

- Dynamic score generated from aggregated scan results
- Breakdown by OWASP Top 10 category
- Risk tracking dashboard with trend visualization
- Exportable compliance reports (PDF/JSON)

## 🔐 GitHub OAuth Integration

- Secure OAuth 2.0 flow for repository access
- Scoped permissions — read-only access to repository contents
- Supports public and private repositories

## 🏗️ Architecture

- **Frontend** — React with dynamic dashboards
- **Backend** — Python/Node.js API orchestrating scan tools
- **Pipeline** — Containerized scan workers via Docker
    `,
    longDescriptionFr: `
Application web qui automatise l'analyse de sécurité des dépôts GitHub via une intégration OAuth. Combine plusieurs outils de scan de sécurité (SCA, SAST, DAST) en un pipeline unifié et génère des scores de conformité dynamiques alignés sur l'OWASP Top 10.

## 🎯 Présentation du projet

StudentSecScore rend le DevSecOps accessible en fournissant une analyse de sécurité automatisée en un clic de n'importe quel dépôt GitHub. La plateforme génère des rapports de conformité exploitables avec des tableaux de bord exportables.

## 🔍 Pipeline de scan de sécurité

**SCA — Analyse de Composition Logicielle**
- **Trivy** — Analyse des dépendances et images conteneurs pour les CVE connus
- Détecte les bibliothèques obsolètes, les versions non sécurisées et les risques de licence

**SAST — Test de Sécurité Statique**
- **SonarQube** — Détection de bugs de qualité et de sécurité dans le code
- **Semgrep** — Analyse statique rapide et personnalisable avec des règles de sécurité

**DAST — Test de Sécurité Dynamique**
- **OWASP ZAP** — Scan automatisé de vulnérabilités web (injection, XSS, CSRF, etc.)
- Teste les applications en cours d'exécution contre les vecteurs d'attaque OWASP Top 10

## 📊 Scoring de conformité

- Score dynamique généré à partir des résultats agrégés des scans
- Décomposition par catégorie OWASP Top 10
- Tableau de bord de suivi des risques avec visualisation des tendances
- Rapports de conformité exportables (PDF/JSON)

## 🔐 Intégration OAuth GitHub

- Flux OAuth 2.0 sécurisé pour l'accès aux dépôts
- Permissions à portée limitée — accès en lecture seule au contenu des dépôts
- Support des dépôts publics et privés
    `,
    category: "Cybersecurity",
    date: "2026",
    technologies: ["Python", "Node.js", "React", "OAuth GitHub", "Trivy", "SonarQube", "Semgrep", "OWASP ZAP", "Docker", "DevSecOps"],
    github: "",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Orchestrating heterogeneous security tools (SCA, SAST, DAST) into a unified pipeline",
      "Managing GitHub OAuth scopes to minimize permissions while enabling repository access",
      "Aggregating scan results from different tools into a coherent compliance score",
      "Designing a scoring model aligned with OWASP Top 10 categories"
    ],
    solutions: [
      "Built a pipeline orchestrator running Trivy → Semgrep/SonarQube → OWASP ZAP with structured output",
      "Used read-only OAuth scopes (repo:read) for safe GitHub integration",
      "Designed a normalized vulnerability schema mapping findings from all tools to OWASP categories",
      "Implemented weighted scoring per OWASP Top 10 category with severity multipliers"
    ],
    outcomes: [
      "Full automated DevSecOps pipeline covering SCA, SAST, and DAST in a single platform",
      "Dynamic compliance scores with OWASP Top 10 breakdown and risk trend dashboards",
      "GitHub OAuth integration enabling analysis of public and private repositories",
      "Exportable compliance reports ready for academic and professional use"
    ],
    teamSize: 1,
    duration: "Completed (February 2026)"
  },
  {
    slug: "rag-assistant",
    title: "RAG Assistant — Microservices & Cloud Deployment",
    description: "Intelligent RAG assistant split across 3 independent microservices, orchestrated with Kubernetes, secured with RBAC and HashiCorp Vault, and monitored via the Prometheus/Loki/Grafana stack.",
    longDescription: `
Development of an intelligent Retrieval-Augmented Generation (RAG) assistant split into 3 independent microservices for independent scalability. Deployed on a cloud environment with strict security policies and full observability.

## 🎯 Project Overview

This academic project explores modern cloud-native architecture patterns: microservices decomposition, container orchestration, infrastructure-as-code, and production-grade security. The RAG assistant answers user queries by retrieving relevant context from a knowledge base before generating responses.

## 🏗️ Microservices Architecture

The application is divided into 3 independent services, each deployable and scalable separately:

1. **Retrieval Service** — Vector similarity search over the knowledge base
2. **Generation Service** — Language model interface for response generation with retrieved context
3. **API Gateway** — Single entry point, routing, authentication, and rate limiting

## ☁️ Containerization & Orchestration

- **Docker** — Each microservice containerized with optimized multi-stage builds
- **Kubernetes (K8s)** — Cluster orchestration with independent HPA per service
- **Network Policies** — Strict inter-service communication rules (least privilege)
- **RBAC** — Role-Based Access Control for Kubernetes resources

## 🔐 Security

- **HashiCorp Vault** — Dynamic secrets management; no hardcoded credentials
- **RBAC** — Fine-grained access control on Kubernetes namespaces and resources
- **Network Policies** — Pod-to-pod communication restricted to declared flows

## 🚀 CI/CD Pipeline (GitLab CI)

- Docker image build and push on commit
- Kubernetes manifest linting
- Automated deployment to staging/production namespaces
- Rollback triggers on health check failure

## 📊 Observability Stack (PLG)

| Tool | Role |
|------|------|
| **Prometheus** | Metrics scraping (latency, throughput, error rate) |
| **Loki** | Centralized log aggregation from all pods |
| **Grafana** | Unified dashboards for metrics and logs |

Custom dashboards track AI generation latency P50/P95/P99 and retrieval hit rates.
    `,
    longDescriptionFr: `
Développement d'un assistant intelligent RAG (Retrieval-Augmented Generation) découpé en 3 micro-services indépendants pour une scalabilité indépendante. Déployé sur environnement cloud avec des politiques de sécurité strictes et une observabilité complète.

## 🎯 Présentation du projet

Ce projet académique explore les patterns d'architecture cloud-native modernes : décomposition en micro-services, orchestration de conteneurs, infrastructure-as-code et sécurité de niveau production.

## 🏗️ Architecture Micro-services

L'application est divisée en 3 services indépendants :

1. **Service de Récupération** — Recherche par similarité vectorielle sur la base de connaissances
2. **Service de Génération** — Interface avec le modèle de langage pour la génération avec contexte récupéré
3. **API Gateway** — Point d'entrée unique, routage, authentification et limitation de débit

## ☁️ Conteneurisation & Orchestration

- **Docker** — Chaque micro-service conteneurisé avec des builds multi-étapes optimisés
- **Kubernetes (K8s)** — Orchestration de cluster avec HPA indépendant par service
- **Network Policies** — Règles strictes de communication inter-services (moindre privilège)
- **RBAC** — Contrôle d'accès basé sur les rôles pour les ressources Kubernetes

## 🔐 Sécurité

- **HashiCorp Vault** — Gestion dynamique des secrets ; pas de credentials codés en dur
- **RBAC** — Contrôle d'accès granulaire sur les namespaces Kubernetes
- **Network Policies** — Communication pod-à-pod restreinte aux flux déclarés

## 🚀 Pipeline CI/CD (GitLab CI)

- Build et push d'images Docker au commit
- Lint des manifestes Kubernetes
- Déploiement automatisé vers les namespaces staging/production
- Déclencheurs de rollback en cas d'échec des health checks

## 📊 Stack d'Observabilité (PLG)

| Outil | Rôle |
|-------|------|
| **Prometheus** | Collecte de métriques (latence, débit, taux d'erreur) |
| **Loki** | Agrégation centralisée des logs de tous les pods |
| **Grafana** | Tableaux de bord unifiés pour métriques et logs |
    `,
    category: "DevOps & Cloud",
    date: "2026",
    technologies: ["Docker", "Kubernetes", "GitLab CI", "Prometheus", "Loki", "Grafana", "HashiCorp Vault", "RBAC", "Python", "RAG"],
    github: "",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Decomposing a monolithic RAG system into independently deployable microservices",
      "Managing secrets securely in a Kubernetes cluster without hardcoded credentials",
      "Ensuring strict network isolation between services with Kubernetes Network Policies",
      "Building observability for AI-specific metrics (generation latency, retrieval accuracy)"
    ],
    solutions: [
      "Defined clear service boundaries as separate K8s Deployments with independent HPA",
      "Integrated HashiCorp Vault for dynamic secret injection via Vault Agent sidecar",
      "Implemented NetworkPolicy manifests allowing only declared pod-to-pod communication paths",
      "Created custom Prometheus metrics in the generation service for P50/P95/P99 latency tracking"
    ],
    outcomes: [
      "Fully operational RAG assistant deployed on Kubernetes with independent service scaling",
      "Zero hardcoded secrets — all credentials dynamically injected via HashiCorp Vault",
      "Complete PLG observability stack with AI latency dashboards",
      "Automated CI/CD pipeline with GitLab CI covering build, test, deploy, and rollback",
      "Production-grade Kubernetes security: RBAC, NetworkPolicies, namespaced isolation"
    ],
    teamSize: 1,
    duration: "Completed (January 2026)"
  },
  {
    slug: "siem-open-source",
    title: "SIEM Open Source — Blue Team Log Supervision",
    description: "Deployed an OSSIM/AlienVault SIEM integrating 5+ log sources and 15+ custom correlation rules, validated by purple team attack simulations (Hydra, Nmap, SQLmap).",
    longDescription: `
Deployment and configuration of an open-source SIEM (Security Information and Event Management) solution based on OSSIM/AlienVault for centralized log supervision and threat detection.

## 🎯 Project Overview

Full SIEM lifecycle: architecture design, log source integration, correlation rule writing, dashboard creation, and detection validation through simulated attacks (purple team approach).

## 🔌 Log Source Integration (5+ sources)

- **Apache** — Web server access and error logs
- **SSH** — Authentication events (success/failure, brute-force)
- **Syslog** — System events from Linux hosts
- **HIDS Agents** — Host Intrusion Detection System (file integrity, process monitoring)
- **Network devices** — Firewall and switch logs

## 📐 Correlation Rules (15+)

| Rule | Attack Pattern Detected |
|------|------------------------|
| SSH Brute Force | >10 failed SSH authentications in 60 seconds |
| Port Scan | Nmap SYN scan signature across 20+ ports |
| Privilege Escalation | sudo/su events following failed logins |
| Lateral Movement | Unusual SSH connections between internal hosts |
| Web Exploitation | SQL injection patterns in Apache access logs |
| HIDS Alert | Unexpected file modifications in /etc or /bin |

## 🟣 Purple Team Validation

Simulated attacks to validate detection coverage:

- **Hydra SSH brute-force** → validated SSH Brute Force rule
- **Nmap full-port scan** → validated Port Scan rule
- **Manual privilege escalation** (sudo -l, SUID exploitation) → validated Priv Esc rule
- **SQLmap** against test web app → validated Web Exploitation rule

Post-exploitation analysis: log review, rule refinement, signature improvement.

## 📊 Dashboards & Alerting

- Real-time dashboards for event volume, top sources, and alert severity
- Automated email/SMS alerts on CRITICAL rules
- Incident timeline visualization for forensic analysis
    `,
    longDescriptionFr: `
Déploiement et configuration d'une solution SIEM open source basée sur OSSIM/AlienVault pour la supervision centralisée des logs et la détection des menaces.

## 🎯 Présentation du projet

Cycle de vie complet d'un déploiement SIEM : conception de l'architecture, intégration des sources de logs, écriture de règles de corrélation, création de tableaux de bord et validation de la détection via des attaques simulées (approche purple team).

## 🔌 Intégration des sources de logs (5+)

- **Apache** — Logs d'accès et d'erreurs du serveur web
- **SSH** — Événements d'authentification (succès/échec, brute-force)
- **Syslog** — Événements système des hôtes Linux
- **Agents HIDS** — Système de Détection d'Intrusion Hôte (intégrité des fichiers, surveillance des processus)
- **Équipements réseau** — Logs de pare-feu et de commutateurs

## 📐 Règles de corrélation (15+)

| Règle | Pattern d'attaque détecté |
|-------|--------------------------|
| Brute Force SSH | >10 authentifications SSH échouées en 60 secondes |
| Scan de ports | Signature de scan SYN nmap sur 20+ ports |
| Élévation de privilèges | Événements sudo/su après des échecs de connexion |
| Mouvement latéral | Connexions SSH inhabituelles entre hôtes internes |
| Exploitation web | Patterns d'injection SQL dans les logs Apache |
| Alerte HIDS | Modifications inattendues de fichiers dans /etc ou /bin |

## 🟣 Validation Purple Team

Attaques simulées pour valider la couverture de détection :

- **Brute-force SSH Hydra** → validation de la règle Brute Force SSH
- **Scan complet des ports Nmap** → validation de la règle Scan de ports
- **Élévation de privilèges manuelle** → validation de la règle Priv Esc
- **SQLmap** contre application web de test → validation de la règle Exploitation web

Analyse post-exploitation : revue des logs, affinage des règles, amélioration des signatures.
    `,
    category: "Cybersecurity",
    date: "2025",
    technologies: ["OSSIM/AlienVault", "HIDS", "Syslog", "Apache", "SSH", "SIEM", "Blue Team", "Purple Team", "Hydra", "Nmap", "SQLmap"],
    github: "",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Normalizing logs from 5+ heterogeneous sources into a unified SIEM format",
      "Writing correlation rules with low false positive rates for common attack patterns",
      "Validating detection coverage without a dedicated red team",
      "Tuning alert thresholds to balance sensitivity and alert fatigue"
    ],
    solutions: [
      "Used OSSIM built-in log parsers and custom syslog forwarding rules for normalization",
      "Wrote time-windowed correlation rules (e.g., >10 events in 60s) with source/destination filters",
      "Applied purple team methodology: simulated attacks to verify rule triggers",
      "Iteratively adjusted thresholds based on baseline traffic and attack simulation results"
    ],
    outcomes: [
      "SIEM with 5+ integrated log sources covering SSH, web, system, network, and HIDS",
      "15+ custom correlation rules validated against real attack simulations",
      "Real-time dashboards and automated alerting on critical events",
      "Purple team validation confirming detection of brute-force, port scans, privesc, and SQLi",
      "Documented incident response process from alert trigger to forensic analysis"
    ],
    teamSize: 1,
    duration: "Completed (November 2025)"
  },
  {
    slug: "owasp-juice-shop",
    title: "OWASP Juice Shop — Web Penetration Testing & Audit",
    description: "Full OWASP Top 10 penetration test on Juice Shop: SQL injection, XSS (reflected/stored), IDOR, JWT algorithm confusion — complete audit report with CVSS scores and ASVS remediations.",
    longDescription: `
Comprehensive penetration test and security audit of OWASP Juice Shop, a deliberately vulnerable web application. Covers identification, exploitation, and remediation of the full OWASP Top 10 vulnerability set.

## 🎯 Project Overview

Simulates a real-world web application security audit. Findings are documented with CVSS v3.1 scores and remediations aligned with the OWASP Application Security Verification Standard (ASVS).

## 🔍 Vulnerability Coverage (OWASP Top 10)

### A01 — Broken Access Control
- **IDOR** — Accessing other users' orders by manipulating basket IDs
- **Admin panel exposure** — Forced browsing to /administration without authentication

### A02 — Cryptographic Failures
- **JWT algorithm confusion** — Forging admin tokens by exploiting \`alg: none\` vulnerability using jwt-tool

### A03 — Injection
- **SQL Injection (login bypass)** — \`' OR 1=1--\` in login form
- **SQLi (data extraction)** — UNION-based injection to extract user table via SQLmap

### A07 — Authentication Failures
- **Weak password policy** — Default admin credentials brute-forced
- **Security question bypass** — Predictable answers enabling account takeover

### A03 — XSS
- **Reflected XSS** — Injected in search parameter
- **Stored XSS** — Persistent payload in product reviews

## 📋 Audit Report

- Vulnerability inventory with CVSS v3.1 scores (Base, Temporal, Environmental)
- Proof-of-Concept (PoC) steps for each finding
- Risk prioritization matrix
- Remediations aligned with OWASP ASVS

**Severity distribution:** 2 Critical · 3 High · 4 Medium · 2 Low · 3 Informational

## 🛠️ Tooling

| Tool | Usage |
|------|-------|
| Burp Suite | HTTP proxy, request manipulation, repeater, intruder |
| OWASP ZAP | Automated scanning baseline |
| SQLmap | Automated SQL injection testing |
| jwt-tool | JWT token analysis and manipulation |
    `,
    longDescriptionFr: `
Test de pénétration et audit de sécurité complet d'OWASP Juice Shop, une application web délibérément vulnérable. Couvre l'identification, l'exploitation et la remédiation de l'ensemble des vulnérabilités OWASP Top 10.

## 🎯 Présentation du projet

Simule un audit de sécurité d'application web réel. Les findings sont documentés avec des scores CVSS v3.1 et des remédiations alignées sur l'OWASP ASVS.

## 🔍 Couverture des vulnérabilités (OWASP Top 10)

### A01 — Contrôle d'accès défaillant
- **IDOR** — Accès aux commandes d'autres utilisateurs en manipulant les IDs de panier
- **Exposition du panneau admin** — Navigation forcée vers /administration sans authentification

### A02 — Défaillances cryptographiques
- **Confusion d'algorithme JWT** — Forge de tokens admin en exploitant la vulnérabilité \`alg: none\`

### A03 — Injection
- **SQL Injection (bypass connexion)** — \`' OR 1=1--\` dans le formulaire de connexion
- **SQLi (extraction de données)** — Injection UNION pour extraire la table utilisateurs via SQLmap

### A07 — Authentification défaillante
- **Politique de mot de passe faible** — Credentials admin par défaut brute-forcés
- **Contournement de question de sécurité** — Réponses prévisibles permettant la prise de contrôle de compte

### A03 — XSS
- **XSS Réfléchi** — Injecté dans le paramètre de recherche
- **XSS Stocké** — Payload persistant dans les avis sur les produits

## 📋 Rapport d'audit

- Inventaire des vulnérabilités avec scores CVSS v3.1
- Étapes de Preuve de Concept (PoC) pour chaque finding
- Matrice de priorisation des risques
- Remédiations alignées sur l'OWASP ASVS

**Distribution de sévérité :** 2 Critique · 3 Haute · 4 Moyenne · 2 Basse · 3 Informationnelle
    `,
    category: "Cybersecurity",
    date: "2025",
    technologies: ["Burp Suite", "OWASP ZAP", "SQLmap", "jwt-tool", "SQL Injection", "XSS", "IDOR", "JWT", "CVSS", "ASVS"],
    github: "",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Systematically covering all OWASP Top 10 categories without missing attack surfaces",
      "Chaining multiple vulnerabilities for higher-impact exploitation paths",
      "Writing CVSS scores that accurately reflect business risk context",
      "Writing remediations specific enough to be actionable for developers"
    ],
    solutions: [
      "Followed a structured OWASP Top 10 checklist, documenting each test case before exploitation",
      "Identified IDOR + privilege escalation chains and JWT + access control bypass combinations",
      "Used CVSS v3.1 calculator with environmental metrics adjusted to web application context",
      "Mapped each finding to OWASP ASVS verification requirements for precise remediation guidance"
    ],
    outcomes: [
      "Complete OWASP Top 10 coverage with 14 validated findings across 6 vulnerability categories",
      "Professional audit report with CVSS v3.1 scores, PoC steps, and ASVS-aligned remediations",
      "Demonstrated practical exploitation: SQLi login bypass, XSS payloads, JWT alg:none, IDOR",
      "Risk prioritization matrix enabling developer teams to address critical findings first"
    ],
    teamSize: 1,
    duration: "Completed (October 2025)"
  },
  {
    slug: "webstalker",
    title: "WebStalker — Passive & Active Reconnaissance Tool",
    description: "Modular Python OSINT framework: passive recon (WHOIS, DNS, subdomain enumeration via HackerTarget/OTX) + active scanning (nmap, HTTP headers, WAF/CMS detection) + directory fuzzing + automated JSON/TXT reports.",
    longDescription: `
A modular offensive reconnaissance tool written in 100% Python for authorized penetration tests and OSINT investigations. Combines passive and active information gathering into a unified, automated reporting pipeline.

**Authorized use only** — designed for legal penetration testing engagements and security research.

## 🔍 Passive Reconnaissance

No direct interaction with the target — all data from public third-party services:

- **WHOIS** — Domain registration data (registrar, creation/expiry dates, registrant)
- **DNS Enumeration** — A, MX, NS, TXT, CNAME records via public resolvers
- **Subdomain Discovery** — Passive enumeration via HackerTarget API and AlienVault OTX (no API key required)

## 📡 Active Reconnaissance

Direct interaction with the target:

- **Port Scanning** — nmap integration for service/version detection
- **HTTP Header Analysis** — Server, X-Powered-By, security headers (CSP, HSTS, X-Frame-Options)
- **Technology Detection** — Fingerprinting of CMS (WordPress, Drupal), frameworks (Django, Laravel), WAF, and CDN

## 🔓 Directory Fuzzing

- Configurable wordlist-based path enumeration
- Targeted checks for .env, .git, backup archives, admin panels, and config files

## 📊 Automated Reporting

- Structured **JSON** report for programmatic processing and SIEM integration
- Human-readable **TXT** report for documentation and review

## 🏗️ Architecture

| Module | Responsibility |
|--------|---------------|
| \`passive.py\` | WHOIS, DNS, subdomain enumeration |
| \`active.py\` | Port scan, HTTP headers, tech fingerprinting |
| \`fuzzing.py\` | Directory brute-force and sensitive file detection |
| \`report.py\` | JSON + TXT report generation |

Multi-threaded execution for improved performance on large port ranges and wordlists.
    `,
    longDescriptionFr: `
Outil de reconnaissance offensive modulaire écrit en 100% Python pour les tests de pénétration autorisés et les investigations OSINT. Combine la collecte d'informations passive et active dans un pipeline de reporting automatisé unifié.

**Usage autorisé uniquement** — conçu pour les missions de pentest légales et la recherche en sécurité.

## 🔍 Reconnaissance Passive

Aucune interaction directe avec la cible — toutes les données proviennent de services tiers publics :

- **WHOIS** — Données d'enregistrement de domaine
- **Énumération DNS** — Enregistrements A, MX, NS, TXT, CNAME
- **Découverte de sous-domaines** — Énumération passive via HackerTarget et AlienVault OTX (sans clé API)

## 📡 Reconnaissance Active

Interaction directe avec le système cible :

- **Scan de ports** — Intégration nmap pour la détection de services/versions
- **Analyse des en-têtes HTTP** — Server, X-Powered-By, en-têtes de sécurité (CSP, HSTS, X-Frame-Options)
- **Détection de technologies** — Fingerprinting de CMS, frameworks, WAF et CDN

## 🔓 Fuzzing de Répertoires

- Fuzzing basé sur une wordlist configurable pour l'énumération de chemins
- Vérifications ciblées pour .env, .git, archives de backup, panneaux d'administration

## 📊 Reporting Automatisé

- Rapport **JSON** structuré pour le traitement programmatique et l'intégration SIEM
- Rapport **TXT** lisible pour la documentation et la revue

## 🏗️ Architecture

| Module | Responsabilité |
|--------|---------------|
| \`passive.py\` | WHOIS, DNS, énumération de sous-domaines |
| \`active.py\` | Scan de ports, en-têtes HTTP, fingerprinting |
| \`fuzzing.py\` | Brute-force de répertoires et détection de fichiers sensibles |
| \`report.py\` | Génération de rapports JSON + TXT |
    `,
    category: "Cybersecurity",
    date: "2025",
    technologies: ["Python", "nmap", "WHOIS", "DNS", "OSINT", "HackerTarget API", "AlienVault OTX", "Reconnaissance"],
    github: "https://github.com/AyGoub/WebStalker",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Integrating nmap programmatically with proper error handling",
      "Performing passive subdomain enumeration without paid API keys",
      "Designing a modular architecture that works both standalone and chained",
      "Making fuzzing efficient on large wordlists via multi-threading"
    ],
    solutions: [
      "Used Python subprocess to call nmap with argument escaping and timeout handling",
      "Leveraged HackerTarget and AlienVault OTX free APIs for subdomain enumeration",
      "Defined clean input/output contracts for each module, enabling both CLI and programmatic use",
      "Implemented thread pools with configurable concurrency for fuzzing performance"
    ],
    outcomes: [
      "Complete passive + active + fuzzing recon pipeline in a single Python tool",
      "Zero external API key requirements for passive phase",
      "Automated JSON and TXT report generation for professional documentation",
      "Modular architecture enabling easy extension with new recon modules",
      "Published on GitHub: github.com/AyGoub/WebStalker"
    ],
    teamSize: 1,
    duration: "Completed (May 2025)"
  },
  {
    slug: "portfolio-website",
    title: "Personal Portfolio & Cybersecurity Showcase",
    description: "Modern portfolio website built with Next.js 14, showcasing cybersecurity projects, skills, and achievements with dynamic routing and static generation.",
    longDescription: `
A comprehensive personal portfolio website designed to showcase my cybersecurity expertise, academic projects, certifications, and professional journey. Built with cutting-edge web technologies for optimal performance and user experience.

## 🎯 Project Goals

• Create a professional online presence highlighting cybersecurity skills
• Showcase academic projects with detailed explanations
• Display certifications and achievements from platforms like TryHackMe
• Provide an interactive and responsive user experience
• Optimize for performance and SEO
• Deploy on GitHub Pages with automated CI/CD

## 🛠️ Technology Stack

• **Next.js 14** - App Router for modern React architecture
• **TypeScript** - Type safety and better developer experience
• **Tailwind CSS** - Utility-first, responsive design
• **Framer Motion** - Smooth, engaging user interactions
• **Lucide React** - Consistent, modern iconography
• **GitHub Actions** - Automated CI/CD workflow
• **EmailJS** - Contact form functionality without backend

## ✨ Key Features

• **Dynamic Project Pages** - Each project has detailed page with full descriptions
• **Bilingual CV Support** - Toggle between French and English resume versions
• **TryHackMe Integration** - Display real-time stats and achievements
• **CTF Writeups Section** - Showcase penetration testing writeups
• **Skills Visualization** - Interactive display of technical skills
• **Certifications Gallery** - Professional certifications with verification links
• **Responsive Design** - Fully responsive across all devices
• **Dark Theme** - Cybersecurity-themed dark color scheme
• **Contact Form** - Functional email integration
• **SEO Optimized** - Proper meta tags and static generation

## 🏗️ Architecture

The website uses Next.js 14's App Router with static site generation (SSG) for optimal performance. All pages are pre-rendered at build time and served as static HTML, ensuring fast load times and excellent SEO.

**Project Structure:**
• Component-based architecture with reusable modules
• Dynamic routing for individual project pages
• Centralized data management in TypeScript files
• Lazy loading for better performance
• Markdown support for rich text formatting

## 🚀 Development Process

**1. Planning** - Designed site architecture and user flow
**2. Design** - Created cybersecurity-themed dark design
**3. Implementation** - Built components incrementally with TypeScript
**4. Content** - Populated with real projects and achievements
**5. Optimization** - Lazy loading, image optimization, code splitting
**6. Testing** - Cross-browser and device testing
**7. Deployment** - Set up CI/CD pipeline with GitHub Actions

## 📦 Deployment & CI/CD

Automated deployment using GitHub Actions:
• Automatic builds on push to main branch
• Static site generation with Next.js export
• Deployment to GitHub Pages
• Build verification and error checking
• Ready for custom domain configuration
    `,
    longDescriptionFr: `
Un site portfolio personnel complet conçu pour présenter mon expertise en cybersécurité, mes projets académiques, certifications et parcours professionnel. Développé avec des technologies web modernes pour des performances optimales et une expérience utilisateur de qualité.

## 🎯 Objectifs du projet

• Créer une présence en ligne professionnelle mettant en valeur les compétences en cybersécurité
• Présenter des projets académiques avec des explications détaillées
• Afficher les certifications et réalisations de plateformes comme TryHackMe
• Offrir une expérience utilisateur interactive et responsive
• Optimiser les performances et le référencement (SEO)
• Déployer sur GitHub Pages avec CI/CD automatisé

## 🛠️ Stack technologique

• **Next.js 14** - App Router pour une architecture React moderne
• **TypeScript** - Typage fort et meilleure expérience développeur
• **Tailwind CSS** - Design responsive basé sur les utilitaires
• **Framer Motion** - Animations fluides et engageantes
• **Lucide React** - Iconographie cohérente et moderne
• **GitHub Actions** - Workflow CI/CD automatisé
• **EmailJS** - Formulaire de contact sans backend

## ✨ Fonctionnalités principales

• **Pages de projets dynamiques** - Chaque projet dispose d'une page détaillée
• **CV bilingue** - Basculer entre les versions française et anglaise du CV
• **Intégration TryHackMe** - Affichage des statistiques et réalisations en temps réel
• **Section Writeups CTF** - Présentation des writeups de tests de pénétration
• **Visualisation des compétences** - Affichage interactif des compétences techniques
• **Galerie de certifications** - Certifications professionnelles avec liens de vérification
• **Design responsive** - Entièrement responsive sur tous les appareils
• **Thème sombre** - Palette cybersécurité sombre
• **Formulaire de contact** - Intégration email fonctionnelle
• **Optimisé SEO** - Balises meta et génération statique

## 🏗️ Architecture

Le site utilise le App Router de Next.js 14 avec la génération de site statique (SSG). Toutes les pages sont pré-rendues au moment du build et servies en HTML statique, garantissant des temps de chargement rapides et un excellent référencement.

**Structure du projet :**
• Architecture basée sur les composants avec des modules réutilisables
• Routage dynamique pour les pages de projets individuels
• Gestion centralisée des données dans des fichiers TypeScript
• Chargement différé pour de meilleures performances
• Support Markdown pour le formatage de texte enrichi

## 🚀 Processus de développement

**1. Planification** - Conception de l'architecture du site et du flux utilisateur
**2. Design** - Création d'un design sombre sur le thème cybersécurité
**3. Implémentation** - Construction incrémentale des composants avec TypeScript
**4. Contenu** - Remplissage avec les vrais projets et réalisations
**5. Optimisation** - Chargement différé, optimisation des images, découpage du code
**6. Tests** - Tests multi-navigateurs et multi-appareils
**7. Déploiement** - Mise en place du pipeline CI/CD avec GitHub Actions

## 📦 Déploiement & CI/CD

Déploiement automatisé avec GitHub Actions :
• Builds automatiques lors des pushs sur la branche main
• Génération de site statique avec export Next.js
• Déploiement sur GitHub Pages
• Vérification des builds et détection des erreurs
• Prêt pour la configuration d'un domaine personnalisé
    `,
    category: "Web Development",
    date: "2025-2026",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub Actions", "React"],
    github: "https://github.com/AyGoub/AyGoub.github.io",
    demo: "https://aygoub.github.io",
    featured: false,
    images: [],
    challenges: [
      "Configuring Next.js for static export compatible with GitHub Pages",
      "Implementing dynamic routes while maintaining static generation",
      "Creating smooth animations without impacting performance",
      "Managing bilingual content (French/English) for CV section",
      "Integrating external data (TryHackMe stats) in a static site"
    ],
    solutions: [
      "Used Next.js 'output: export' with proper configuration for GitHub Pages deployment",
      "Implemented generateStaticParams for pre-rendering all project routes",
      "Optimized Framer Motion animations with useReducedMotion and lazy loading",
      "Created dynamic language switcher with useState for client-side switching",
      "Designed fallback UI for external data with graceful degradation"
    ],
    outcomes: [
      "Successfully deployed live portfolio at aygoub.github.io",
      "Achieved 100/100 Lighthouse performance score for static pages",
      "Created fully responsive design working on all screen sizes",
      "Implemented automated deployment reducing manual work",
      "Built scalable architecture for easy content updates",
      "Showcased full-stack development and DevOps skills"
    ],
    teamSize: 1,
    duration: "Ongoing (2024-2025)"
  },
  {
    slug: "keylogger",
    title: "Python KeyLogger",
    description: "Educational keylogger implementation in Python demonstrating keystroke capture, logging mechanisms, and security awareness for cybersecurity research.",
    longDescription: `
An educational keylogger developed in Python to understand keystroke monitoring techniques, system-level interactions, and security implications. This project was created for **cybersecurity research and educational purposes only**.

## 🎯 Project Overview

This project demonstrates how keyloggers work at a technical level, providing insights into system security vulnerabilities and defensive measures. It showcases low-level system programming, event handling, and secure coding practices.

## 📚 Educational Objectives

• Understand keystroke capture mechanisms at the OS level
• Learn about system-level programming and event hooks
• Explore security implications of keylogging malware
• Develop defensive strategies against such attacks
• Practice responsible disclosure and ethical hacking principles

## 🔧 Technical Implementation

**Core Features:**

• **Keystroke Capture** - Real-time monitoring of keyboard events
• **Event Logging** - Secure storage of captured data
• **System Hooks** - Integration with OS-level keyboard APIs
• **Stealth Operation** - Understanding detection avoidance techniques
• **Data Export** - Structured logging formats for analysis

**Architecture:**

The keylogger uses Python libraries to interface with system-level keyboard events:
• Event listeners for capturing keystrokes
• Buffer management for efficient data handling
• File I/O operations for secure logging
• Error handling and crash recovery

## 🛡️ Security Considerations

This project emphasizes understanding attack vectors to build better defenses:

• **Awareness** - Understanding how keyloggers operate
• **Detection** - Learning methods to identify keylogging software
• **Prevention** - Implementing security measures against monitoring
• **Ethics** - Emphasizing responsible use and legal implications

## 🔍 Defensive Insights

Through developing this project, I gained valuable knowledge about:

• How to detect keyloggers on systems
• Security best practices for protection against monitoring
• The importance of endpoint security solutions
• Behavioral patterns that indicate keylogger presence

## ⚠️ Legal & Ethical Notice

**IMPORTANT:** This project is for educational and research purposes only. Unauthorized use of keyloggers is illegal in most jurisdictions. The project was developed in a controlled environment to understand security vulnerabilities and improve defensive measures.

## 📖 Learning Outcomes

• Gained deep understanding of OS-level event handling
• Learned system programming concepts in Python
• Developed appreciation for endpoint security measures
• Enhanced knowledge of malware analysis and detection
• Understood the ethical responsibilities in cybersecurity
    `,
    longDescriptionFr: `
Un keylogger pédagogique développé en Python pour comprendre les techniques de surveillance des frappes clavier, les interactions au niveau système et les implications en termes de sécurité. Ce projet a été créé **uniquement à des fins de recherche et d'éducation en cybersécurité**.

## 🎯 Présentation du projet

Ce projet démontre le fonctionnement technique des keyloggers, permettant de comprendre les vulnérabilités de sécurité système et les mesures défensives. Il illustre la programmation système bas niveau, la gestion des événements et les bonnes pratiques de codage sécurisé.

## 📚 Objectifs pédagogiques

• Comprendre les mécanismes de capture de frappes au niveau OS
• Apprendre la programmation système et les hooks d'événements
• Explorer les implications sécuritaires des keyloggers malveillants
• Développer des stratégies défensives contre ce type d'attaque
• Pratiquer les principes de divulgation responsable et d'éthique

## 🔧 Implémentation technique

**Fonctionnalités principales :**

• **Capture des frappes** - Surveillance en temps réel des événements clavier
• **Journalisation des événements** - Stockage sécurisé des données capturées
• **Hooks système** - Intégration avec les API clavier au niveau OS
• **Fonctionnement discret** - Compréhension des techniques de dissimulation
• **Export des données** - Formats de journalisation structurés pour l'analyse

**Architecture :**

Le keylogger utilise des bibliothèques Python pour interfacer avec les événements clavier système :
• Écouteurs d'événements pour la capture des frappes
• Gestion des tampons pour un traitement efficace
• Opérations d'E/S fichier pour la journalisation sécurisée
• Gestion des erreurs et reprise sur incident

## 🛡️ Considérations de sécurité

Ce projet met l'accent sur la compréhension des vecteurs d'attaque pour construire de meilleures défenses :

• **Sensibilisation** - Comprendre le fonctionnement des keyloggers
• **Détection** - Apprendre à identifier les logiciels de surveillance
• **Prévention** - Mettre en place des mesures de sécurité contre la surveillance
• **Éthique** - Insister sur l'utilisation responsable et les implications légales

## 🔍 Enseignements défensifs

Ce projet m'a apporté des connaissances précieuses sur :

• La détection de keyloggers sur les systèmes
• Les bonnes pratiques de sécurité pour se protéger contre la surveillance
• L'importance des solutions de sécurité endpoint
• Les schémas comportementaux indiquant la présence d'un keylogger

## ⚠️ Avis légal et éthique

**IMPORTANT :** Ce projet est uniquement destiné à l'éducation et à la recherche. L'utilisation non autorisée de keyloggers est illégale dans la plupart des juridictions. Le projet a été développé dans un environnement contrôlé pour comprendre les vulnérabilités et améliorer les mesures défensives.

## 📖 Résultats d'apprentissage

• Compréhension approfondie de la gestion des événements au niveau OS
• Apprentissage des concepts de programmation système en Python
• Appréciation renforcée des mesures de sécurité endpoint
• Connaissances améliorées sur l'analyse et la détection de malwares
• Compréhension des responsabilités éthiques en cybersécurité
    `,
    category: "Cybersecurity",
    date: "2025",
    technologies: ["Python", "pynput", "System APIs", "Event Handling", "Security Research"],
    github: "https://github.com/AyGoub/KeyLogger",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Understanding low-level system event handling and keyboard APIs",
      "Implementing reliable keystroke capture across different OS environments",
      "Ensuring responsible and ethical development practices",
      "Balancing functionality with security awareness education"
    ],
    solutions: [
      "Used pynput library for cross-platform keyboard event monitoring",
      "Implemented robust error handling and logging mechanisms",
      "Created comprehensive documentation emphasizing ethical use",
      "Developed in isolated virtual environment for safe testing"
    ],
    outcomes: [
      "Successfully demonstrated keystroke capture mechanisms",
      "Enhanced understanding of system-level security vulnerabilities",
      "Developed defensive mindset for endpoint security",
      "Created educational resource for cybersecurity awareness",
      "Gained practical experience with Python system programming"
    ],
    teamSize: 1,
    duration: "Completed"
  },
  {
    slug: "grand-prix-f1",
    title: "Grand Prix F1 Racing",
    description: "Intelligent F1 racing bot using A* pathfinding algorithm in C for autonomous navigation, collision avoidance, and optimal race strategy in real-time competitions.",
    longDescription: `
An intelligent Formula 1 racing bot developed in C for a programming competition. The system uses advanced pathfinding algorithms to autonomously navigate race circuits, avoid collisions with opponents, manage fuel consumption, and optimize racing strategies in real-time.

## 🎯 Project Overview

This project implements a competitive F1 racing AI using the A* pathfinding algorithm with custom heuristics for a programming competition. The bot competes against other AI drivers on various circuits, making real-time decisions about acceleration, braking, overtaking, and fuel management to achieve the fastest lap times.

**Main Objectives:**

• **Reach the finish line as quickly as possible** - Minimize circuit completion time by combining speed efficiency with strategic racing decisions
• **Respect race regulations** - Adhere to maximum speed limits, fuel consumption rules, and acceleration constraints imposed by race regulations
• **Optimal movement algorithm design** - Develop an algorithm ensuring the shortest possible path while considering circuit elements and race rules
• **Multi-circuit validation** - Test performance across different circuits to measure arrival times and manage fuel consumption
• **Code optimization** - Improve performance by optimizing source code to increase algorithm efficiency, reduce computation time, and improve race times

## 🏎️ Core Features

• **A* Pathfinding Algorithm** - Custom implementation for optimal route finding on race circuits
• **Real-time Decision Making** - Calculates acceleration vectors every turn (sub-second response)
• **Collision Avoidance** - Detects and avoids obstacles and opponent vehicles using line traversal
• **Fuel Management** - Optimizes speed vs. fuel consumption for race completion
• **Terrain Adaptation** - Handles different surface types (track, sand, obstacles)
• **Multi-opponent Racing** - Tracks and responds to up to 2 other AI drivers simultaneously
• **Boost Strategy** - Strategic use of limited turbo boosts (5 per race)

## 💻 Technical Implementation

**Core Algorithms:**

• **A* Search** - Modified A* with Chebyshev heuristic for optimal pathfinding
• **Collision Detection** - Bresenham line algorithm for path clearance checking
• **Hash Table** - Custom hash table (capacity 1000) for closed set optimization
• **Priority Queue** - Min-heap queue for efficient node exploration
• **Destination Selection** - Euclidean distance-based target prioritization

**Data Structures:**

• **GraphNode** - Position, velocity, fuel, cost, heuristic, predecessor chain
• **TerrainMap** - 2D grid representation of the circuit
• **GraphQueue** - Priority queue sorted by totalCost (cost + heuristic)
• **HashTable** - Fast lookup for visited nodes with custom hash function
• **DestinationList** - Ordered list of finish line positions

**System Architecture:**

• Modular design with 9 separate C modules
• Graph-based representation of race positions
• State space search through position-velocity combinations
• Memory-efficient node management with proper cleanup
• Round-based execution with time tracking (sub-second per turn)

## 🧮 Algorithm Details

**A* Implementation:**
• State space: (x, y, vx, vy) - position and velocity vectors
• Heuristic: Chebyshev distance (max of dx, dy) to finish line
• Cost function: Path length + fuel consumption penalty
• Successor generation: 9 acceleration options (-1, 0, +1 for x and y)
• Speed constraint: Maximum velocity magnitude of 25 units
• Fuel calculation: Based on acceleration magnitude and current speed

**Collision Detection:**
• Line traversal from current to next position
• Checks each discrete point along the path
• Detects walls (.), obstacles, sand (~), and opponent positions
• Avoids positions occupied by other vehicles

**Optimization Techniques:**
• Hash-based closed set prevents revisiting states
• Priority queue ensures optimal node exploration order
• Path caching and reuse when possible
• Sand terrain penalty (extra fuel cost + speed limit)
• Dynamic speed adjustment based on remaining fuel

## 🏁 Race Features

**Strategic Elements:**
• Optimal acceleration calculation from current state
• Overtaking maneuvers when opponents block path
• Fuel-efficient pathing when low on gas
• Speed adaptation for terrain types
• Emergency braking for obstacle avoidance

**Competition Format:**
• Real-time stdin/stdout communication with race manager
• Position updates every round
• Gas consumption tracking
• Boost usage optimization
• Performance timing per round

## 📊 Performance Metrics

• **Response Time** - Calculates moves in under 1 second per turn
• **Fuel Efficiency** - Optimizes path length vs. acceleration costs
• **Pathfinding Accuracy** - Successfully navigates complex circuits
• **Collision Avoidance** - Zero crashes in optimal conditions
• **Memory Management** - Proper allocation/deallocation with no leaks

## 🛠️ Build System

• Makefile-based compilation
• Modular compilation of 9 source files
• Compiler flags: -Wall -std=c99 -Wextra -O3
• Math library linking (-lm)
• Binary output to drivers directory

## 📚 Learning Outcomes

• Mastered A* pathfinding algorithm implementation from scratch
• Implemented advanced graph search data structures (priority queue, hash table)
• Applied algorithmic optimization techniques for real-time constraints
• Gained experience with competitive programming and AI decision-making
• Developed robust collision detection using computational geometry
• Enhanced understanding of state space search and heuristic design
• Practiced efficient C programming with manual memory management
    `,
    longDescriptionFr: `
Un bot de course Formule 1 intelligent développé en C pour une compétition de programmation. Le système utilise des algorithmes de pathfinding avancés pour naviguer de manière autonome sur les circuits, éviter les collisions, gérer la consommation de carburant et optimiser les stratégies de course en temps réel.

## 🎯 Présentation du projet

Ce projet implémente une IA de course F1 compétitive utilisant l'algorithme A* avec des heuristiques personnalisées. Le bot affronte d'autres pilotes IA sur différents circuits, prenant des décisions en temps réel sur l'accélération, le freinage, les dépassements et la gestion du carburant.

**Objectifs principaux :**

• **Atteindre l'arrivée le plus rapidement possible** - Minimiser le temps de parcours en combinant vitesse et décisions stratégiques
• **Respecter les règles de course** - Respecter les limites de vitesse, les règles de consommation et les contraintes d'accélération
• **Conception d'algorithme de déplacement optimal** - Développer un algorithme garantissant le chemin le plus court possible
• **Validation multi-circuits** - Tester les performances sur différents circuits
• **Optimisation du code** - Améliorer les performances en optimisant le code source

## 🏎️ Fonctionnalités principales

• **Algorithme A*** - Implémentation personnalisée pour trouver les routes optimales sur les circuits
• **Prise de décision en temps réel** - Calcul des vecteurs d'accélération à chaque tour (réponse sous la seconde)
• **Évitement des collisions** - Détection et évitement des obstacles et véhicules adverses
• **Gestion du carburant** - Optimisation de la vitesse vs. consommation pour terminer la course
• **Adaptation au terrain** - Gestion des différents types de surface (piste, sable, obstacles)
• **Course multi-adversaires** - Suivi de jusqu'à 2 autres pilotes IA simultanément
• **Stratégie turbo** - Utilisation stratégique des 5 turbos disponibles par course

## 💻 Implémentation technique

**Algorithmes principaux :**

• **Recherche A*** - A* modifié avec heuristique de Chebyshev pour le pathfinding optimal
• **Détection de collision** - Algorithme de Bresenham pour la vérification de trajectoire
• **Table de hachage** - Table personnalisée (capacité 1000) pour l'optimisation de l'ensemble fermé
• **File de priorité** - File min-tas pour une exploration efficace des nœuds
• **Sélection de destination** - Priorisation des cibles par distance euclidienne

**Structures de données :**

• **GraphNode** - Position, vitesse, carburant, coût, heuristique, chaîne prédécesseur
• **TerrainMap** - Représentation 2D du circuit en grille
• **GraphQueue** - File de priorité triée par coût total (coût + heuristique)
• **HashTable** - Accès rapide aux nœuds visités avec fonction de hachage personnalisée
• **DestinationList** - Liste ordonnée des positions de la ligne d'arrivée

## 🧮 Détails de l'algorithme

**Implémentation A*** :
• Espace d'état : (x, y, vx, vy) - vecteurs position et vitesse
• Heuristique : distance de Chebyshev (max de dx, dy) vers la ligne d'arrivée
• Fonction de coût : longueur du chemin + pénalité de consommation carburant
• Génération de successeurs : 9 options d'accélération (-1, 0, +1 pour x et y)
• Contrainte de vitesse : magnitude maximale de 25 unités
• Calcul carburant : basé sur la magnitude d'accélération et la vitesse actuelle

**Détection de collision :**
• Parcours de ligne de la position actuelle à la suivante
• Vérification de chaque point discret le long du chemin
• Détection des murs (.), obstacles, sable (~) et positions adverses
• Évitement des positions occupées par d'autres véhicules

## 🏁 Éléments stratégiques

• Calcul d'accélération optimale depuis l'état courant
• Manœuvres de dépassement quand les adversaires bloquent le chemin
• Trajectoire économe en carburant en cas de réserve faible
• Adaptation de vitesse selon le type de terrain
• Freinage d'urgence pour l'évitement d'obstacles

## 📊 Métriques de performance

• **Temps de réponse** - Calcul des mouvements en moins d'1 seconde par tour
• **Efficacité carburant** - Optimisation longueur de chemin vs. coûts d'accélération
• **Précision du pathfinding** - Navigation réussie sur circuits complexes
• **Évitement des collisions** - Zéro crash dans les conditions optimales
• **Gestion mémoire** - Allocation/désallocation correcte sans fuites

## 📚 Résultats d'apprentissage

• Maîtrise de l'implémentation de l'algorithme A* from scratch
• Implémentation de structures de données avancées (file de priorité, table de hachage)
• Application de techniques d'optimisation algorithmique pour contraintes temps réel
• Expérience en programmation compétitive et prise de décision IA
• Développement de détection de collision robuste par géométrie computationnelle
    `,
    category: "Algorithms ",
    date: "2024",
    technologies: ["C", "A* Algorithm", "Pathfinding", "Data Structures", "Graph Search", "Hash Tables"],
    github: "https://github.com/AyGoub/Grand_Prix-F1",
    demo: "",
    report: "/reports/grand-prix-f1-report.pdf",
    featured: false,
    images: [
      "/projects/grand-prix-f1-1.png",
      "/projects/grand-prix-f1-2.png"
    ],
    challenges: [
      "Initial node allocation causing memory crashes on large maps due to pre-allocating all nodes in a 2D array",
      "Computation time constraints: linked list for open set was too slow to find minimum cost node within 1-second deadline",
      "Collision detection between pilots: identifying when vehicles occupy same position or pass through walls ('teleporting')",
      "Selecting optimal heuristic: poor heuristic choice led to suboptimal paths and excessive computation time",
      "Fuel management on difficult terrain: mandatory sand sections made race completion impossible via normal route"
    ],
    solutions: [
      "Selective node allocation: only allocate memory for nodes when added to open list with competitive f-cost, drastically reducing memory usage",
      "Priority queue for open list: replaced linked list with min-heap queue for O(log n) operations, meeting time constraints even on large maps",
      "Hash table for closed list (capacity 1000): replaced linked list with hash table for O(1) lookup to verify visited nodes",
      "Implemented collisionDetection() using line sweep algorithm and reachableNode() to validate safe, obstacle-free paths",
      "Chebyshev heuristic: measures max absolute difference between coordinates, treats diagonal movement equal to horizontal/vertical, optimizing corner handling",
      "Sand avoidance weighting: assigned higher cost to sand terrain in pathfinding to favor normal roads and reduce fuel consumption"
    ],
    outcomes: [
      "Successfully completed races on various circuit layouts with zero memory crashes",
      "Achieved optimal pathfinding with sub-second response times (<1s per turn)",
      "Implemented robust collision avoidance with 3-vehicle tracking and wall penetration prevention",
      "Reduced computation time significantly through priority queue and hash table optimizations",
      "Optimized fuel efficiency by intelligently avoiding sand sections while respecting race constraints",
      "Demonstrated strong algorithm design, data structure optimization, and problem-solving skills"
    ],
    teamSize: 3,
    duration: "3 months"
  },
  {
    slug: "epidemic-simulation",
    title: "Epidemic Simulation System",
    description: "Multi-threaded epidemic simulation system built in C implementing SIR model for disease propagation analysis with real-time visualization and statistical tracking.",
    longDescription: `
A comprehensive epidemic simulation system developed in C as part of an Operating Systems course. The project simulates disease propagation using the SIR (Susceptible-Infected-Recovered) epidemiological model with multi-threading, process synchronization, and real-time data visualization.

## 🎯 Project Overview

This project demonstrates advanced operating system concepts including process management, inter-process communication, thread synchronization, and resource management. The simulation models how diseases spread through populations with configurable parameters for transmission rates, recovery times, and population dynamics.

**Team:** Developed collaboratively by a team of 4 members
**Achievement:** Ranked among the top 3 best projects in the entire promotion

## 👥 Team Responsibilities

Our team divided the work across different system components:

• **Simulation Engine** - Core logic and epidemic propagation model
• **Multi-threading** - Thread management and synchronization mechanisms  
• **Data Analysis** - Statistical collection and analysis
• **Visualization** - Graphical interface and real-time plotting

## 🔧 Technical Architecture

**Core Components:**

• Multi-threaded epidemic propagation model
• SIR Model mathematical implementation
• Concurrent execution of population agents
• Mutex-based synchronization for shared resources
• Real-time graphical visualization
• Statistical tracking and data analysis

**Operating Systems Concepts:**

• **Multi-threading** - Each population agent runs in a separate thread
• **Process Synchronization** - Critical sections protected with mutexes
• **Shared Memory** - Efficient data sharing between threads
• **Resource Management** - Proper allocation and deallocation
• **Deadlock Prevention** - Careful synchronization design
• **Race Condition Handling** - Thread-safe operations

## 🦠 SIR Epidemiological Model

The simulation implements the classic SIR model:

• **Susceptible (S)** - Individuals who can contract the disease
• **Infected (I)** - Currently infected and contagious individuals  
• **Recovered (R)** - Individuals with immunity after recovery

## ⚙️ Configurable Parameters

• Population size and density
• Transmission rate (beta)
• Recovery rate (gamma)
• Initial number of infected individuals
• Movement patterns and contact rates
• Simulation duration and time steps

## 📊 Real-time Monitoring

• Live epidemic curve visualization
• Population state transitions tracking
• Peak infection time and magnitude
• Reproduction number (R0) calculation
• Comprehensive statistical analysis

## 💻 Implementation

**Technologies:**
• C Language for high-performance system programming
• POSIX Threads (pthread) for multi-threading
• Mutexes and condition variables for synchronization
• Dynamic memory management
• Graphics library for real-time visualization

**Performance Optimizations:**
• Minimized critical section duration
• Efficient thread scheduling
• Optimized data structures
• Reduced context switching overhead

## 📚 Learning Outcomes

• Mastered concurrent programming and thread management
• Applied synchronization mechanisms in practice
• Gained deep understanding of OS resource management
• Developed performance tuning skills
• Enhanced team collaboration abilities
• Created large-scale system design

## 🌍 Real-world Applications

• Public health planning and epidemic preparedness
• Policy evaluation for disease control measures
• Understanding pandemic dynamics
• Educational demonstrations
• Testing intervention strategies
    `,
    longDescriptionFr: `
Un système complet de simulation d'épidémie développé en C dans le cadre d'un cours de Systèmes d'Exploitation. Le projet simule la propagation des maladies à l'aide du modèle épidémiologique SIR (Susceptibles-Infectés-Rétablis) avec le multi-threading, la synchronisation de processus et la visualisation de données en temps réel.

## 🎯 Présentation du projet

Ce projet démontre des concepts avancés de systèmes d'exploitation incluant la gestion des processus, la communication inter-processus, la synchronisation des threads et la gestion des ressources. La simulation modélise la propagation des maladies avec des paramètres configurables pour les taux de transmission, les temps de guérison et la dynamique de population.

**Équipe :** Développé en collaboration par une équipe de 4 membres
**Réalisation :** Classé parmi les 3 meilleurs projets de toute la promotion

## 👥 Responsabilités de l'équipe

Notre équipe a réparti le travail sur différents composants système :

• **Moteur de simulation** - Logique principale et modèle de propagation épidémique
• **Multi-threading** - Gestion des threads et mécanismes de synchronisation
• **Analyse des données** - Collecte et analyse statistique
• **Visualisation** - Interface graphique et tracé en temps réel

## 🔧 Architecture technique

**Composants principaux :**

• Modèle de propagation épidémique multi-threadé
• Implémentation mathématique du modèle SIR
• Exécution concurrente des agents de population
• Synchronisation par mutex pour les ressources partagées
• Visualisation graphique en temps réel
• Suivi statistique et analyse des données

**Concepts de Systèmes d'Exploitation :**

• **Multi-threading** - Chaque agent de population s'exécute dans un thread séparé
• **Synchronisation de processus** - Sections critiques protégées par des mutexes
• **Mémoire partagée** - Partage efficace des données entre threads
• **Gestion des ressources** - Allocation et désallocation appropriées
• **Prévention des deadlocks** - Conception de synchronisation prudente
• **Gestion des conditions de course** - Opérations thread-safe

## 🦠 Modèle épidémiologique SIR

La simulation implémente le modèle SIR classique :

• **Susceptibles (S)** - Individus pouvant contracter la maladie
• **Infectés (I)** - Individus actuellement infectés et contagieux
• **Rétablis (R)** - Individus immunisés après guérison

## ⚙️ Paramètres configurables

• Taille et densité de la population
• Taux de transmission (beta)
• Taux de guérison (gamma)
• Nombre initial d'individus infectés
• Schémas de mouvement et taux de contact
• Durée de simulation et pas de temps

## 📊 Surveillance en temps réel

• Visualisation en direct de la courbe épidémique
• Suivi des transitions d'état de la population
• Temps et magnitude du pic d'infection
• Calcul du nombre de reproduction (R0)
• Analyse statistique complète

## 💻 Implémentation

**Technologies :**
• Langage C pour la programmation système haute performance
• POSIX Threads (pthread) pour le multi-threading
• Mutexes et variables de condition pour la synchronisation
• Gestion dynamique de la mémoire
• Bibliothèque graphique pour la visualisation en temps réel

**Optimisations de performance :**
• Durée minimisée des sections critiques
• Ordonnancement efficace des threads
• Structures de données optimisées
• Réduction des surcoûts de changement de contexte

## 📚 Résultats d'apprentissage

• Maîtrise de la programmation concurrente et de la gestion des threads
• Application pratique des mécanismes de synchronisation
• Compréhension approfondie de la gestion des ressources OS
• Développement des compétences en optimisation des performances
• Renforcement des capacités de travail en équipe
• Conception de système à grande échelle

## 🌍 Applications réelles

• Planification de la santé publique et préparation aux épidémies
• Évaluation des politiques de contrôle des maladies
• Compréhension des dynamiques pandémiques
• Démonstrations pédagogiques
• Test de stratégies d'intervention
    `,
    category: "System Programming",
    date: "2024/2025",
    technologies: ["C", "POSIX Threads", "Multi-threading", "Synchronization", "SIR Model", "Systems Programming"],
    github: "https://github.com/AyGoub/epidemic_project_os",
    demo: "",
    report: "/reports/epidemic-simulation-report.pdf",
    featured: true,
    images: [
      "/projects/epidemic-simulation-1.png",
      "/projects/epidemic-simulation-2.png",
      "/projects/epidemic-simulation-3.png"
    ],
    challenges: [
      "Managing concurrent access to shared population data structures",
      "Preventing race conditions in multi-threaded environment",
      "Optimizing performance with large population sizes",
      "Coordinating work across 4 team members with different components",
      "Ensuring accurate SIR model implementation with thread synchronization"
    ],
    solutions: [
      "Implemented robust mutex locking strategy for critical sections",
      "Used thread-safe data structures and atomic operations where possible",
      "Profiled and optimized bottlenecks in simulation loop",
      "Established clear module interfaces and regular team integration meetings",
      "Validated simulation results against known epidemic models"
    ],
    outcomes: [
      "Successfully simulated epidemic propagation with up to 10,000+ agents",
      "Achieved accurate SIR model behavior validated against theoretical results",
      "Demonstrated solid understanding of OS concurrency concepts",
      "Completed collaborative project with excellent team coordination",
      "Ranked among the top 3 best projects in the entire promotion",
      "Project defended successfully with high marks",
      "Gained practical experience with system-level C programming"
    ],
    teamSize: 4,
    duration: "4 months"
  },
  {
    slug: "wumpus-world",
    title: "Wumpus World — AI Agents & Reinforcement Learning",
    description: "Classic Wumpus World simulation implementing 4 AI agents: random, human-interactive, rational (logical inference on 10×10 grid), and Q-learning reinforcement learning agent.",
    longDescription: `
Implementation of the classic Wumpus World problem from AI textbooks, featuring four distinct agent types. Built entirely in Python.

## 🤖 Agent Implementations

### 1. Random Agent
- Basic agent selecting actions uniformly at random
- Performance baseline for other agents

### 2. Human Agent
- Interactive mode allowing manual control for debugging

### 3. Rational Agent
- Logical inference-based agent on a 10×10 grid
- Maintains a knowledge base of visited cells and breeze/stench perceptions
- Applies propositional logic to infer safe and unsafe cells
- Avoids pits and the Wumpus through logical deduction

### 4. Learning Agent (Q-Learning)
- Model-free reinforcement learning (Q-learning)
- State space: agent position + perception vector
- Action space: move (4 directions), shoot arrow, grab gold, climb
- Training: 50 episodes with epsilon-greedy exploration
- Policy stored as Q-table for exploitation at inference time

## 🏗️ Architecture

| File | Role |
|------|------|
| \`wumpusworld.py\` | Environment definition: grid, wumpus, pits, gold placement |
| \`wumpus.py\` | Environment rules and perception generation |
| \`agent.py\` | Agent base class and 4 implementations |
| \`utils.py\` | Helper functions: grid display, performance metrics |
    `,
    longDescriptionFr: `
Implémentation du problème classique du Wumpus World des manuels d'IA, avec quatre types d'agents distincts. Développé entièrement en Python.

## 🤖 Implémentations des agents

### 1. Agent Aléatoire
- Agent basique sélectionnant les actions aléatoirement
- Référence de performance pour les autres agents

### 2. Agent Humain
- Mode interactif permettant le contrôle manuel pour le débogage

### 3. Agent Rationnel
- Agent basé sur l'inférence logique sur une grille 10×10
- Maintient une base de connaissances des cellules visitées et des perceptions de brise/odeur
- Applique la logique propositionnelle pour inférer les cellules sûres et dangereuses
- Évite les puits et le Wumpus par déduction logique

### 4. Agent Apprenant (Q-Learning)
- Apprentissage par renforcement sans modèle (Q-learning)
- Espace d'états : position de l'agent + vecteur de perception
- Espace d'actions : déplacement (4 directions), tirer la flèche, ramasser l'or, grimper
- Entraînement : 50 épisodes avec exploration epsilon-greedy
- Politique stockée comme table Q pour l'exploitation en inférence

## 🏗️ Architecture

| Fichier | Rôle |
|---------|------|
| \`wumpusworld.py\` | Définition de l'environnement |
| \`wumpus.py\` | Règles de l'environnement et génération de perceptions |
| \`agent.py\` | Classe de base des agents et 4 implémentations |
| \`utils.py\` | Fonctions utilitaires : affichage de grille, métriques |
    `,
    category: "Artificial Intelligence",
    date: "2024",
    technologies: ["Python", "Q-Learning", "Reinforcement Learning", "Propositional Logic", "AI Agents"],
    github: "https://github.com/AyGoub/Projet-Ia-Wampus",
    demo: "",
    featured: false,
    images: [],
    challenges: [
      "Designing a knowledge base that correctly infers safe cells from limited perceptions",
      "Defining an effective state representation for Q-learning in a partially observable environment",
      "Balancing exploration vs. exploitation during training with only 50 episodes"
    ],
    solutions: [
      "Used propositional logic with frontier-based cell safety inference for the rational agent",
      "Represented state as (position, breeze, stench, glitter) tuple for compact Q-table",
      "Epsilon-greedy strategy with decaying epsilon over training episodes"
    ],
    outcomes: [
      "Four functional agent implementations with measurable performance differences",
      "Q-learning agent outperforming random baseline after 50 training episodes",
      "Complete environment simulation with all Wumpus World rules",
      "Published on GitHub: github.com/AyGoub/Projet-Ia-Wampus"
    ],
    teamSize: 1,
    duration: "Completed (2024)"
  },
  {
    slug: "image-inversion",
    title: "Image Inversion — KDTree Algorithm",
    description: "C implementation comparing two image color inversion methods: naive pixel-by-pixel color table vs. KD-Tree nearest-neighbor search in color space, with benchmarked performance and Gnuplot visualization.",
    longDescription: `
Image inversion tools implemented in C comparing two algorithmic methods with different time complexities. Developed as a first-year algorithms project at ENSICAEN.

## 🔧 Methods Compared

### Method 1 — Naive Color Table
- Builds a lookup table mapping each source color to its inverted value
- O(n) table construction, O(1) per pixel lookup
- Simple but memory-bound for large color spaces

### Method 2 — KD-Tree Nearest Neighbor
- Constructs a K-D Tree over the color space
- For each pixel, finds the nearest neighbor using KD-Tree search
- O(n log n) construction, O(log n) per query
- More complex but generalizable to arbitrary color transformations

## 🏗️ Architecture

- \`test_table\` — Unit tests for color table method
- \`test_kd_tree\` — Unit tests for KD-Tree method
- Makefile — Build automation
- Gnuplot scripts — Performance curve visualization

## 📚 Learning Outcomes

- Implemented KD-Tree data structure from scratch in C
- Compared algorithmic complexity empirically with benchmarked measurements
- Applied Makefile build automation
- Visualized performance results with Gnuplot
    `,
    longDescriptionFr: `
Outils d'inversion d'images implémentés en C comparant deux méthodes algorithmiques de complexités temporelles différentes. Développé comme projet d'algorithmique de première année à l'ENSICAEN.

## 🔧 Méthodes comparées

### Méthode 1 — Table de couleurs naïve
- Construit une table de correspondance mappant chaque couleur source à sa valeur inversée
- O(n) pour la construction de la table, O(1) par lookup de pixel
- Simple mais limité en mémoire pour les grands espaces de couleurs

### Méthode 2 — Plus Proche Voisin KD-Tree
- Construit un K-D Tree sur l'espace des couleurs
- Pour chaque pixel, trouve le plus proche voisin via la recherche KD-Tree
- O(n log n) construction, O(log n) par requête
- Plus complexe mais généralisable à des transformations arbitraires

## 🏗️ Architecture

- \`test_table\` — Tests unitaires pour la méthode de table de couleurs
- \`test_kd_tree\` — Tests unitaires pour la méthode KD-Tree
- Makefile — Automatisation du build
- Scripts Gnuplot — Visualisation des courbes de performance
    `,
    category: "Algorithms",
    date: "2023/2024",
    technologies: ["C", "KD-Tree", "Algorithms", "Makefile", "Gnuplot", "Data Structures"],
    github: "https://github.com/AyGoub/Projet-Algo-1A-ENSICAEN",
    demo: "",
    featured: false,
    images: [],
    challenges: [
      "Implementing KD-Tree from scratch in C with correct nearest-neighbor search",
      "Managing memory correctly for tree construction and traversal"
    ],
    solutions: [
      "Implemented recursive KD-Tree construction with alternating split dimensions",
      "Used careful pointer management and valgrind testing to ensure no memory leaks"
    ],
    outcomes: [
      "Two functional image inversion implementations with comparative benchmarks",
      "KD-Tree implementation validated with unit tests",
      "Performance comparison visualized with Gnuplot"
    ],
    teamSize: 1,
    duration: "Completed (2023/2024)"
  },
  {
    slug: "advanced-algorithms",
    title: "Advanced Algorithms — ENSICAEN Lab Work",
    description: "Advanced algorithm implementations in C (sorting, graph traversal, dynamic programming, optimization) with Gnuplot performance benchmarking and Shell automation scripts.",
    longDescription: `
Advanced algorithms lab work (TP-eleve-2024) from ENSICAEN. A collection of algorithm implementations with empirical performance benchmarking and visualization.

## 🔧 Topics Covered

- **Sorting algorithms** — Comparison and benchmarking of multiple sorting strategies
- **Graph traversal** — BFS, DFS, and shortest path algorithms
- **Dynamic programming** — Optimal substructure problems
- **Optimization** — Greedy and divide-and-conquer approaches

## 🏗️ Build System

- Makefile-based compilation for each lab
- Shell scripts for automated benchmarking and data collection
- Gnuplot integration for performance curve visualization

## 📚 Learning Outcomes

- Practical implementation of foundational algorithms in C
- Performance analysis through empirical benchmarking
- Build automation with Makefile and Shell scripting
- Data visualization with Gnuplot
    `,
    longDescriptionFr: `
Travaux pratiques d'algorithmique avancée (TP-eleve-2024) à l'ENSICAEN. Collection d'implémentations d'algorithmes couvrant des sujets fondamentaux d'informatique avec benchmarking des performances.

## 🔧 Sujets couverts

- **Algorithmes de tri** — Comparaison et benchmarking de multiples stratégies de tri
- **Parcours de graphes** — BFS, DFS et algorithmes de plus court chemin
- **Programmation dynamique** — Problèmes à sous-structure optimale
- **Optimisation** — Approches gloutonnes et diviser-pour-régner

## 🏗️ Système de build

- Compilation basée sur Makefile pour chaque TP
- Scripts Shell pour le benchmarking automatisé et la collecte de données
- Intégration Gnuplot pour la visualisation des courbes de performance
    `,
    category: "Algorithms",
    date: "2024",
    technologies: ["C", "Makefile", "Gnuplot", "Shell", "Algorithms", "Data Structures"],
    github: "https://github.com/AyGoub/Algo_Av",
    demo: "",
    featured: false,
    images: [],
    challenges: [],
    solutions: [],
    outcomes: [
      "Complete set of algorithm implementations with empirical performance benchmarks",
      "Build automation with Makefile and Shell scripts",
      "Published on GitHub: github.com/AyGoub/Algo_Av"
    ],
    teamSize: 1,
    duration: "Completed (2024)"
  },
  {
    slug: "web-conception",
    title: "Web Conception — JavaScript Animations",
    description: "First-year web development project at ENSICAEN: interactive JavaScript animations including animated sheep physics simulation, interactive chat, and multi-animation sequences.",
    longDescription: `
Web conception project from the first year at ENSICAEN, focusing on interactive JavaScript animations and DOM manipulation.

## 🎨 Implementations

- **Multi-animation project** — Multiple animations running concurrently (ProjetMultipleAnimation.html)
- **Interactive chat** — Animated cat responding to user interactions
- **Animated sheep** — Physics-based sheep movement simulation
- **Asset management** — Images and tool organization

## 🛠️ Stack

- **HTML** (62%) — Structure and layout
- **JavaScript** (38%) — Animation logic, event handling, DOM manipulation

## 📚 Learning Outcomes

- JavaScript animation techniques (requestAnimationFrame, setInterval)
- DOM manipulation and event-driven programming
- Interactive web simulation design
    `,
    longDescriptionFr: `
Projet de conception web de première année à l'ENSICAEN, axé sur les animations JavaScript interactives et la manipulation du DOM.

## 🎨 Implémentations

- **Projet multi-animations** — Plusieurs animations s'exécutant simultanément
- **Chat interactif** — Chat animé répondant aux interactions utilisateur
- **Moutons animés** — Simulation de mouvement de moutons basée sur la physique
- **Gestion des assets** — Organisation des images et outils

## 🛠️ Stack

- **HTML** (62%) — Structure et mise en page
- **JavaScript** (38%) — Logique d'animation, gestion des événements, manipulation DOM
    `,
    category: "Web Development",
    date: "2023/2024",
    technologies: ["HTML", "JavaScript", "CSS", "DOM Manipulation", "Animation"],
    github: "https://github.com/AyGoub/Projet-Conception-Web-1A-ENSICAEN",
    demo: "",
    featured: false,
    images: [],
    challenges: [],
    solutions: [],
    outcomes: [
      "Multiple interactive web animations with JavaScript",
      "Published on GitHub: github.com/AyGoub/Projet-Conception-Web-1A-ENSICAEN"
    ],
    teamSize: 1,
    duration: "Completed (2023/2024)"
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug)
}
