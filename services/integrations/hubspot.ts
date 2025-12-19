/**
 * Servico de integracao com HubSpot
 *
 * NOTA: Este servico deve ser usado principalmente em Cloud Functions
 * para proteger a API Key. As funcoes exportadas aqui sao para uso
 * no backend (Firebase Functions).
 */

import { Order } from '../../types/order';

const HUBSPOT_API_KEY = import.meta.env.VITE_HUBSPOT_API_KEY || '';
const HUBSPOT_BASE_URL = 'https://api.hubapi.com';

// Pipeline e etapas do deal (configurar no HubSpot)
const DEAL_PIPELINE = 'default';
const DEAL_STAGES = {
    pending: 'appointmentscheduled', // Pagamento Pendente
    paid: 'qualifiedtobuy',          // Pago
    processing: 'presentationscheduled', // Processando
    shipped: 'decisionmakerboughtin', // Enviado
    delivered: 'closedwon',          // Entregue
    cancelled: 'closedlost',         // Cancelado
};

interface HubSpotContact {
    id: string;
    properties: {
        email: string;
        firstname?: string;
        lastname?: string;
        phone?: string;
        cpf?: string;
    };
}

interface HubSpotDeal {
    id: string;
    properties: {
        dealname: string;
        amount: string;
        dealstage: string;
        pipeline: string;
    };
}

interface HubSpotError {
    status: string;
    message: string;
    correlationId: string;
}

/**
 * Headers padrao para requisicoes ao HubSpot
 */
function getHeaders(): HeadersInit {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
    };
}

/**
 * Buscar contato por email
 */
export async function findContactByEmail(email: string): Promise<HubSpotContact | null> {
    try {
        const response = await fetch(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/search`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    filterGroups: [
                        {
                            filters: [
                                {
                                    propertyName: 'email',
                                    operator: 'EQ',
                                    value: email,
                                },
                            ],
                        },
                    ],
                    properties: ['email', 'firstname', 'lastname', 'phone', 'cpf'],
                }),
            }
        );

        if (!response.ok) {
            const error: HubSpotError = await response.json();
            console.error('HubSpot search error:', error);
            return null;
        }

        const data = await response.json();
        return data.results?.[0] || null;
    } catch (err) {
        console.error('Erro ao buscar contato no HubSpot:', err);
        return null;
    }
}

/**
 * Criar novo contato
 */
export async function createContact(data: {
    email: string;
    name: string;
    phone?: string;
    cpf?: string;
}): Promise<HubSpotContact | null> {
    const nameParts = data.name.trim().split(' ');
    const firstname = nameParts[0] || '';
    const lastname = nameParts.slice(1).join(' ') || '';

    try {
        const response = await fetch(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    properties: {
                        email: data.email,
                        firstname,
                        lastname,
                        phone: data.phone || '',
                        cpf: data.cpf || '',
                    },
                }),
            }
        );

        if (!response.ok) {
            const error: HubSpotError = await response.json();
            console.error('HubSpot create contact error:', error);
            return null;
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao criar contato no HubSpot:', err);
        return null;
    }
}

/**
 * Atualizar contato existente
 */
export async function updateContact(
    contactId: string,
    data: {
        name?: string;
        phone?: string;
        cpf?: string;
    }
): Promise<boolean> {
    const properties: Record<string, string> = {};

    if (data.name) {
        const nameParts = data.name.trim().split(' ');
        properties.firstname = nameParts[0] || '';
        properties.lastname = nameParts.slice(1).join(' ') || '';
    }

    if (data.phone) {
        properties.phone = data.phone;
    }

    if (data.cpf) {
        properties.cpf = data.cpf;
    }

    try {
        const response = await fetch(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`,
            {
                method: 'PATCH',
                headers: getHeaders(),
                body: JSON.stringify({ properties }),
            }
        );

        return response.ok;
    } catch (err) {
        console.error('Erro ao atualizar contato no HubSpot:', err);
        return false;
    }
}

/**
 * Criar ou atualizar contato
 */
export async function upsertContact(data: {
    email: string;
    name: string;
    phone?: string;
    cpf?: string;
}): Promise<HubSpotContact | null> {
    // Tentar encontrar contato existente
    const existingContact = await findContactByEmail(data.email);

    if (existingContact) {
        // Atualizar contato existente
        await updateContact(existingContact.id, {
            name: data.name,
            phone: data.phone,
            cpf: data.cpf,
        });
        return existingContact;
    }

    // Criar novo contato
    return await createContact(data);
}

/**
 * Criar deal (negocio)
 */
export async function createDeal(data: {
    name: string;
    amount: number;
    stage: string;
    orderId: string;
    productType: string;
}): Promise<HubSpotDeal | null> {
    try {
        const response = await fetch(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/deals`,
            {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    properties: {
                        dealname: data.name,
                        amount: data.amount.toString(),
                        dealstage: data.stage,
                        pipeline: DEAL_PIPELINE,
                        order_id: data.orderId,
                        product_type: data.productType,
                    },
                }),
            }
        );

        if (!response.ok) {
            const error: HubSpotError = await response.json();
            console.error('HubSpot create deal error:', error);
            return null;
        }

        return await response.json();
    } catch (err) {
        console.error('Erro ao criar deal no HubSpot:', err);
        return null;
    }
}

/**
 * Associar deal a contato
 */
export async function associateDealToContact(
    dealId: string,
    contactId: string
): Promise<boolean> {
    try {
        const response = await fetch(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`,
            {
                method: 'PUT',
                headers: getHeaders(),
            }
        );

        return response.ok;
    } catch (err) {
        console.error('Erro ao associar deal ao contato:', err);
        return false;
    }
}

/**
 * Atualizar etapa do deal
 */
export async function updateDealStage(
    dealId: string,
    stage: string
): Promise<boolean> {
    try {
        const response = await fetch(
            `${HUBSPOT_BASE_URL}/crm/v3/objects/deals/${dealId}`,
            {
                method: 'PATCH',
                headers: getHeaders(),
                body: JSON.stringify({
                    properties: {
                        dealstage: stage,
                    },
                }),
            }
        );

        return response.ok;
    } catch (err) {
        console.error('Erro ao atualizar deal no HubSpot:', err);
        return false;
    }
}

/**
 * Sincronizar pedido com HubSpot
 * Cria/atualiza contato e deal
 */
export async function syncOrderToHubSpot(order: Order): Promise<{
    contactId: string | null;
    dealId: string | null;
}> {
    // 1. Criar/atualizar contato
    const contact = await upsertContact({
        email: order.customer.email,
        name: order.customer.name,
        phone: order.customer.phone,
        cpf: order.customer.cpf,
    });

    if (!contact) {
        console.error('Falha ao sincronizar contato com HubSpot');
        return { contactId: null, dealId: null };
    }

    // 2. Criar deal
    const productNames = order.items.map((item) => item.name).join(', ');
    const productType = order.items[0]?.productType || 'digital';

    const deal = await createDeal({
        name: `Pedido ${order.orderNumber} - ${productNames}`,
        amount: order.totals.total,
        stage: DEAL_STAGES[order.status] || DEAL_STAGES.pending,
        orderId: order.id,
        productType,
    });

    if (!deal) {
        console.error('Falha ao criar deal no HubSpot');
        return { contactId: contact.id, dealId: null };
    }

    // 3. Associar deal ao contato
    await associateDealToContact(deal.id, contact.id);

    return {
        contactId: contact.id,
        dealId: deal.id,
    };
}

/**
 * Atualizar status do pedido no HubSpot
 */
export async function updateOrderStatusInHubSpot(
    dealId: string,
    status: Order['status']
): Promise<boolean> {
    const stage = DEAL_STAGES[status];
    if (!stage) {
        console.error('Status invalido para HubSpot:', status);
        return false;
    }

    return await updateDealStage(dealId, stage);
}

/**
 * Mapear status do pedido para etapa do deal
 */
export function getHubSpotStageForStatus(status: Order['status']): string {
    return DEAL_STAGES[status] || DEAL_STAGES.pending;
}
