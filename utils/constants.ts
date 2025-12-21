// Configurações de contato
export const CONTACT = {
    WHATSAPP_NUMBER: '5548991766066',
    EMAIL: 'contato@aurorealeditora.com.br',
    INSTAGRAM: '@aurorealeditora',
} as const;

// Configurações de produtos
export const PRODUCTS = {
    digital: {
        id: 'digital',
        name: 'Caminhos para a educação de superdotados - Digital',
        price: 69.90,
        priceFormatted: 'R$ 69,90',
        type: 'digital' as const,
        features: [
            'E-book completo (PDF + EPUB)',
            'Acesso a partir de 31/01/2026',
            'Leitura em qualquer dispositivo',
        ],
        delivery: 'Disponível em 31/01/2026',
        checkoutUrl: 'https://www.aurorealeditora.com.br/caminhos-para-a-educacao-de-superdotados-digital/p',
    },
    fisico: {
        id: 'fisico',
        name: 'Caminhos para a educação de superdotados - Físico + E-book',
        price: 99.90,
        priceFormatted: 'R$ 99,90',
        type: 'fisico' as const,
        features: [
            'Livro impresso premium',
            'E-book incluso (PDF + EPUB)',
            'Envio para todo Brasil',
            'Frete grátis',
        ],
        delivery: '~27 dias após 31/01/2026',
        badge: 'E-book grátis',
        checkoutUrl: 'https://www.aurorealeditora.com.br/caminhos-para-a-educacao-de-superdotados-fisico-e-book/p',
    },
    colecionador: {
        id: 'colecionador',
        name: 'Caminhos para a educação de superdotados - Colecionador',
        price: 149.90,
        priceFormatted: 'R$ 149,90',
        originalPrice: 249.90,
        originalPriceFormatted: 'R$ 249,90',
        discount: 40,
        type: 'colecionador' as const,
        features: [
            'Livro impresso premium',
            'E-book incluso (PDF + EPUB)',
            'Webinar exclusivo com Dra. Deborah Ruf',
            'Acesso por 1 ano ao conteúdo extra',
            'Frete grátis',
        ],
        delivery: '~27 dias após 31/01/2026',
        badges: ['Mais Vendido', 'Melhor Valor'],
        highlighted: true,
        checkoutUrl: 'https://www.aurorealeditora.com.br/caminhos-para-a-educacao-de-superdotados-colecionador/p',
    },
} as const;

// Configurações de pré-venda
export const PRESALE = {
    // Data de lançamento (31/01/2026)
    END_DATE: new Date('2026-01-31T00:00:00'),
    // Estoque inicial para contador de escassez
    INITIAL_STOCK: 500,
    // Estoque atual (pode ser dinâmico via API futuramente)
    CURRENT_STOCK: 127,
    // Número de vendas realizadas
    SALES_COUNT: 373,
} as const;

// Informações do autor
export const AUTHOR = {
    name: 'Deborah L. Ruf, Ph.D.',
    title: 'Especialista em Superdotação',
    credentials: [
        'Ph.D. em Psicologia Educacional',
        '30+ anos de experiência',
        'Autora de 5 livros sobre superdotação',
        'Consultora internacional',
    ],
    bio: `A Dra. Deborah Ruf é uma das maiores autoridades mundiais em superdotação infantil.
Com mais de três décadas de experiência clínica e acadêmica, seu trabalho pioneiro ajudou
milhares de famílias a compreenderem e apoiarem suas crianças superdotadas. Seus livros são
referência internacional para pais, educadores e profissionais da área.`,
    quote: '"Cada criança superdotada é única, e merece uma educação que respeite e desenvolva seu potencial extraordinário."',
} as const;

// Perguntas frequentes
export const FAQ_ITEMS = [
    {
        question: 'Por que esta é uma edição única?',
        answer: 'Este livro terá apenas uma tiragem limitada, disponível exclusivamente até 31 de janeiro de 2026. Após essa data, o livro não estará mais à venda. Esta é sua única oportunidade de adquirir esta obra exclusiva.',
    },
    {
        question: 'Quando receberei meu livro físico?',
        answer: 'O envio do livro físico será realizado até 27 de fevereiro de 2026 OU até 15 dias úteis após o encerramento das vendas. Você receberá o código de rastreamento por e-mail assim que o livro for despachado.',
    },
    {
        question: 'O e-book é enviado imediatamente?',
        answer: 'O e-book estará disponível a partir de 31 de janeiro de 2026. Nessa data, você receberá automaticamente um e-mail com o link para download em formato PDF e EPUB.',
    },
    {
        question: 'Posso parcelar o pagamento?',
        answer: 'Sim! Aceitamos pagamento via PIX (à vista com 5% de desconto) ou cartão de crédito em até 12x. Entre em contato pelo WhatsApp para mais opções.',
    },
    {
        question: 'E se eu não gostar do livro?',
        answer: 'Oferecemos garantia incondicional de 7 dias. Se você não ficar satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.',
    },
    {
        question: 'O que é o webinar exclusivo da versão Colecionador?',
        answer: 'É uma aula gravada exclusivamente para a Auroreal pela Dra. Deborah Ruf, onde ela aprofunda os conceitos do livro e responde às dúvidas mais comuns sobre superdotação no contexto brasileiro. O webinar estará disponível a partir de 31 de janeiro de 2026.',
    },
    {
        question: 'Vocês enviam para fora do Brasil?',
        answer: 'No momento, enviamos apenas para endereços no Brasil. Para pedidos internacionais, entre em contato pelo WhatsApp para verificarmos a possibilidade.',
    },
] as const;

// Textos de urgência/escassez
export const URGENCY_TEXTS = {
    lowStock: (count: number) => `Restam apenas ${count} unidades!`,
    salesCount: (count: number) => `${count} pessoas já garantiram`,
    endingSoon: 'Oferta por tempo limitado',
    presaleOnly: 'Preço exclusivo de pré-venda',
} as const;

// Configurações de animação
export const ANIMATION = {
    SCROLL_DURATION: 2000,
    TOAST_DURATION: 6000,
    ACTIVITY_FEED_MIN_INTERVAL: 8000,
    ACTIVITY_FEED_MAX_INTERVAL: 15000,
} as const;

export type ProductType = keyof typeof PRODUCTS;
export type Product = typeof PRODUCTS[ProductType];
