import type { CollectionConfig, Config, Field, Plugin } from "payload";
import { MessageTemplates } from "./collections/MessageTemplates.ts";
import { ReferralEvents } from "./collections/ReferralEvents.ts";
import { ReferralPrograms } from "./collections/ReferralPrograms.ts";
import { ReferralRewardRules } from "./collections/ReferralRewardRules.ts";
import { Referrals } from "./collections/Referrals.ts";
import { Referrers } from "./collections/Referrers.ts";
import { RewardLedger } from "./collections/RewardLedger.ts";
import { Tenants } from "./collections/Tenants.ts";
import type { ReferralsPluginOptions } from "./types.ts";

export * from "./types.ts";
export { ReferralEngine } from "./engine/service.ts";

let options: ReferralsPluginOptions | undefined;
/** Options as given to the plugin, for the engine service. */
export const referralsOptions = (): ReferralsPluginOptions => {
  if (!options) throw new Error("referralsPlugin() has not been registered");
  return options;
};

/**
 * Internal Payload plugin. Adds the tenant-scoped referral collections and a
 * `tenant` relationship on the host's users collection. Nothing in here names
 * a brand; the first tenant is configuration.
 */
export const referralsPlugin =
  (opts: ReferralsPluginOptions): Plugin =>
  (config: Config): Config => {
    options = opts;
    const tenantField: Field = { name: "tenant", type: "relationship", relationTo: "tenants", index: true, admin: { position: "sidebar", description: "Empty = platform operator (every tenant)." } };
    const collections = (config.collections ?? []).map((c): CollectionConfig => (c.slug === "users" ? { ...c, fields: [...c.fields, tenantField] } : c));
    return {
      ...config,
      collections: [...collections, Tenants, ReferralPrograms, ReferralRewardRules, Referrers, Referrals, RewardLedger, ReferralEvents, MessageTemplates],
    };
  };
