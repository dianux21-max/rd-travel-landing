/**
 * Results reported by Meta Ads Manager that our own site can't see on its
 * own (ad spend, cost per result, and off-site contacts via Facebook
 * comments/WhatsApp that never touched the lead form). Updated by hand
 * after a campaign ends — ask the user for the numbers from Ads Manager.
 */
export type CampaignManualData = {
  adSpendMxn: number;
  metaReportedLeads: number;
  costPerMetaLead: number;
  /** Total real contacts including ones that skipped the site entirely. */
  totalContactsManual?: number;
  notes?: string;
};

export const CAMPAIGN_MANUAL_DATA: Record<string, CampaignManualData> = {
  europa2027: {
    adSpendMxn: 996.59,
    metaReportedLeads: 6,
    costPerMetaLead: 166.1,
    totalContactsManual: 20,
    notes:
      "Incluye contactos directos por comentarios de Facebook y WhatsApp que no pasaron por el formulario del sitio. Costo real aprox. por contacto: $49.83 MXN.",
  },
};
