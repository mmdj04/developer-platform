"use client";

import { MermaidDiagram } from "@/components/mermaid-diagram";

const productCards = [
  {
    title: "Banco de Dados Postgres",
    href: "/database",
    description:
      'Cada projeto é <strong>um banco de dados Postgres completo</strong>, o banco de dados relacional mais confiável do mundo.',
    cols: "col-span-6 md:col-span-12 xl:col-span-6",
    checks: ["100% portátil", "Auth integrado com RLS", "Fácil de estender"],
    diagram: `erDiagram
    users ||--o{ posts : cria
    users {
        uuid id PK
        text email
        text name
        timestamptz created_at
    }
    posts ||--o{ comments : tem
    posts {
        uuid id PK
        uuid user_id FK
        text title
        text content
        timestamptz created_at
    }
    comments {
        uuid id PK
        uuid post_id FK
        uuid user_id FK
        text content
        timestamptz created_at
    }`,
  },
  {
    title: "Autenticação",
    href: "/auth",
    description:
      '<strong>Adicione cadastros e logins de usuários</strong>,<br class="hidden lg:inline-block"> protegendo seus dados com Row Level Security.',
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    diagram: `sequenceDiagram
    participant U as Usuário
    participant A as Auth
    participant DB as Postgres
    U->>A: Cadastro (email/senha)
    A->>U: Email de confirmação
    U->>A: Confirma email
    A->>U: JWT Token
    U->>A: Requisição com JWT
    A->>DB: Verifica RLS Policy
    DB-->>U: Dados autorizados`,
  },
  {
    title: "Edge Functions",
    href: "/edge-functions",
    description:
      'Escreva código personalizado<br class="hidden sm:inline-block"> <strong>sem implantar ou escalar servidores.</strong>',
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    diagram: `flowchart LR
    C[Cliente] -->|HTTP| EF[Edge Function]
    EF -->|Query| DB[(Postgres)]
    EF -->|Auth| A[Auth]
    EF -->|Storage| S3[Object Store]
    DB -->|Response| EF
    EF -->|HTTP| C`,
  },
  {
    title: "Storage",
    href: "/storage",
    description:
      '<strong>Armazene, organize e sirva</strong><br class="hidden sm:inline-block xl:hidden 2xl:inline-block"> arquivos grandes, de vídeos a imagens.',
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    diagram: `flowchart LR
    C[Cliente] -->|Upload| API[Storage API]
    API -->|Processa| CDN[CDN Global]
    API -->|Salva| S3[Object Store]
    CDN -->|Serve| U[Usuários]
    S3 -->|Backup| R[Replicado 3x]
    subgraph Content Delivery
        CDN
        S3
    end`,
  },
  {
    title: "Realtime",
    href: "/realtime",
    description:
      '<strong>Crie experiências multiplayer</strong><br class="hidden sm:inline-block"> com sincronização de dados em tempo real.',
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    diagram: `sequenceDiagram
    participant C1 as Cliente A
    participant R as Realtime
    participant DB as Postgres
    participant C2 as Cliente B
    C1->>DB: INSERT na tabela
    DB-->>R: Change Data Capture
    R-->>C1: Broadcast change
    R-->>C2: Broadcast change
    C1->>R: Presença online
    R-->>C2: Presença de A`,
  },
  {
    title: "Vector",
    href: "/modules/vector",
    description:
      'Integre seus modelos de ML favoritos para<br class="hidden sm:inline-block md:hidden"><strong>armazenar, indexar e pesquisar embeddings vetoriais</strong>.',
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    diagram: `flowchart LR
    D[Documento] -->|Embedding| M[Modelo ML]
    M -->|Vetor| DB[(pgvector)]
    Q[Query] -->|Embedding| M2[Modelo ML]
    M2 -->|Vetor| DB
    DB -->|Similarity Search| R[Resultados]
    R -->|Rankeado| C[Cliente]`,
  },
  {
    title: "APIs de Dados",
    href: "https://supabase.com/docs/guides/api",
    description: 'APIs RESTful prontas <strong>para uso imediato</strong>.',
    cols: "col-span-6 xl:col-span-3",
    checks: [],
    diagram: `sequenceDiagram
    participant C as Cliente
    participant API as REST API
    participant GQL as GraphQL
    participant DB as Postgres
    C->>API: GET /users
    API->>DB: SELECT * FROM users
    DB-->>API: JSON
    API-->>C: JSON Response
    C->>GQL: query { users }
    GQL->>DB: GraphQL Resolver
    DB-->>GQL: Nested Data
    GQL-->>C: GraphQL Response`,
  },
];

export function ProductCards() {
  return (
    <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-4 xl:gap-3 2xl:gap-6 md:grid-cols-12">
      {productCards.map((card) => (
        <a
          key={card.title}
          href={card.href}
          className={`group relative w-full flex flex-col focus:outline-hidden focus:border-none focus:ring-brand-600 focus:ring-2 focus:rounded-xl ${card.cols}`}
        >
          <div className="group/panel rounded-lg md:rounded-xl p-px bg-scale-3 bg-linear-to-b from-scale-6 to-scale-5 dark:to-scale-4 transition-all hover:shadow-md flex items-center justify-center hover:bg-none hover:bg-scale-7! relative w-full h-full">
            <div className="z-10 rounded-[7px] md:rounded-[11px] relative overflow-hidden flex-1 flex flex-col gap-4 items-center justify-between bg-scale-3 w-full h-full text-scale-11 [&_strong]:font-normal! [&_strong]:text-scale-12! p-4 sm:py-6">
              <div className="relative z-10 w-full gap-2 sm:gap-4 flex flex-col items-center text-center">
                <div className="w-full aspect-[3/2] flex items-center justify-center overflow-hidden rounded-lg bg-scale-2 border border-scale-6">
                  <MermaidDiagram chart={card.diagram} />
                </div>
                <div className="flex items-center gap-2 text-scale-12">
                  <h2 className="text-base">{card.title}</h2>
                </div>
                <p className="text-sm [&_strong]:text-scale-12!" dangerouslySetInnerHTML={{ __html: card.description }} />
                {card.checks.length > 0 && (
                  <span className="hidden lg:block text-scale-12">
                    <ul className="flex flex-col gap-1 text-sm">
                      {card.checks.map((check) => (
                        <li key={check} className="flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline h-4 w-4">
                            <path d="M20 6 9 17l-5-5" />
                          </svg>
                          {check}
                        </li>
                      ))}
                    </ul>
                  </span>
                )}
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
