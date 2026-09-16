import type { City, Product } from "../payload-types.ts";
import { groupOf } from "./groups.ts";

/**
 * What a city's real hazards mean for one line of insurance.
 *
 * City pages used to repeat the product hub's copy, which made any two cities
 * for the same product near-identical (verify:uniqueness). They now summarise
 * the product, link to it, and spend their words here: one paragraph per
 * hazard the city actually carries, written for the coverage group. A monsoon
 * city and a wildfire city therefore read differently for the same policy.
 *
 * Every paragraph is general insurance mechanism, never a promise about a
 * specific policy, and carries no figures (content-rules.mts applies).
 */
export type GuidanceGroup = "auto-home" | "life" | "health-medicare" | "commercial";

const words = (parts: string[]) => parts.join(" ").split(/\s+/).filter(Boolean).length;

/** hazard → what it means for each coverage group. A missing entry simply yields no paragraph. */
export const HAZARD_GUIDANCE: Record<string, Partial<Record<GuidanceGroup, string>>> = {
  earthquake: {
    "auto-home":
      "Earth movement is excluded on nearly every homeowners and renters form, so a cracked slab, a toppled chimney or a collapsed block wall falls to you unless you add an earthquake endorsement or buy a standalone policy. Those carry a deductible written as a share of the dwelling limit rather than a flat figure. Fire that follows a quake is usually covered by the base policy; check your declarations page for either.",
    commercial:
      "A quake damages the building, the racking and the stock at once, and the property part of a business owners policy excludes earth movement unless it is endorsed or written separately. Business income coverage generally follows the property form, so an uncovered cause of loss means no lost-income payment either. Ask whether tenant improvements and equipment you own sit inside that endorsement.",
  },
  "extreme-heat": {
    "auto-home":
      "Heat cooks a roof, cracks stucco, kills batteries and pushes an air conditioner past its life, and none of that is a covered peril — policies pay for sudden accidental damage, not wear or mechanical breakdown. Equipment breakdown and service line endorsements close part of the gap. In a car, comprehensive answers for a fire but not for a compressor that simply quit. Check which endorsements your declarations page lists.",
    commercial:
      "Heat illness is a compensable workers' compensation injury when it happens on the job, and roofers, landscapers, drivers and warehouse crews are the exposures underwriters ask about. Cooling failure that spoils stock is property damage only if the equipment breakdown coverage is on the policy; heat itself is not a peril. Confirm your class codes describe the outdoor work actually being done.",
    life: "Outdoor work in prolonged heat is an occupational risk underwriters price, so a roofer, a paver or a lineman may see a different class than an office worker with identical health. It is a reason to buy while you are young and well rather than to put it off. Term is usually the affordable answer, and a level term policy already in force is generally not repriced because your job changed.",
    "health-medicare":
      "Long heat stretches send people to urgent care and the emergency room for dehydration and heat exhaustion, and those visits sit at different cost-sharing tiers than an office visit. Some medications and oxygen equipment are also heat-sensitive. Worth checking on your own plan: the urgent care and emergency cost share, whether out-of-area care is covered when you leave for cooler ground, and durable medical equipment rules.",
  },
  "flash-flood": {
    "auto-home":
      "Water that runs across the ground and into the house is surface water, excluded on homeowners and renters forms no matter how fast it arrived; only a flood policy responds, and those usually carry a waiting period before they take effect. A car is the exception — comprehensive commonly covers flood damage to the vehicle. Contents in a basement or garage may need a separate flood contents limit.",
    commercial:
      "A wash or a street that runs after a hard rain can put water through a loading dock in minutes, and the property section of a business owners policy excludes flood. A flood policy covers the building and the stock, but business income for the closed days usually needs its own flood-specific wording. Check whether leased space makes the landlord's policy, not yours, the one that rebuilds.",
  },
  "flood-plain": {
    "auto-home":
      "Sitting in a mapped flood zone changes two things: a lender will usually require a flood policy, and the homeowners form still excludes the flood itself, so the two policies must be read together. Elevation, the foundation type and whether the finished space is below grade drive both the rate and what the contents coverage pays. Ask which zone your address is rated in.",
    commercial:
      "A building in a mapped zone is rated on its elevation and its lowest floor, and the commercial property form excludes flood regardless of the zone. Stock stored on the floor is the usual loss; racking it above grade changes the outcome more than any endorsement does. Ask whether your flood limit covers contents as well as structure, and how it handles a tenant's improvements.",
  },
  freeze: {
    "auto-home":
      "A hard freeze splits supply lines and outdoor spigots, and the resulting water damage is usually covered while the pipe itself is not. The catch is the vacancy condition: most forms cut off freeze losses if the house was unoccupied and you neither maintained heat nor shut off and drained the water. Snowbirds should read that condition before leaving, and consider a water sensor.",
    commercial:
      "Frozen sprinkler lines and burst risers are a classic winter claim, and the property form commonly excludes the loss when the building was vacant or the heat was not maintained. Spoiled inventory needs the equipment breakdown or spoilage endorsement to be paid. Freeze also creates ice underfoot at entrances, which lands on general liability rather than property; document your ice-melt and inspection routine.",
  },
  hail: {
    "auto-home":
      "Hail is a covered peril, but the roof's settlement basis decides what the claim actually pays: replacement cost puts a new roof on, while actual cash value or an age schedule pays a depreciated amount on an older roof and leaves the rest to you. Many policies also carry a separate wind and hail deductible set as a share of the dwelling limit. Cars are comprehensive, not collision.",
    commercial:
      "Hail takes the roof, the rooftop units and any vehicle parked in the open, and commercial property forms increasingly settle roofs at actual cash value or exclude cosmetic marring of metal panels outright. Fleet damage falls to comprehensive on the commercial auto policy, each unit with its own deductible. Read the roof endorsement and the wind and hail deductible on your declarations page before storm season.",
  },
  "monsoon-dust": {
    "auto-home":
      "Monsoon storms bring three different claims. Wind and hail are covered perils for the roof, windows and a car's glass, and comprehensive handles a limb or a sign that lands on the vehicle. The flash flood that follows is not: surface water is excluded and needs a separate flood policy. Many homeowners forms also carry a separate wind and hail deductible on the roof — check yours.",
    commercial:
      "A haboob sandblasts signage and rooftop equipment and drives rain through doors. Wind is a covered peril on the property form, but the water that comes up off the pavement is flood and is excluded. Business income coverage generally starts only after a covered physical loss and a waiting period, so a closure caused by an off-premises power outage alone is commonly outside it unless the policy is endorsed.",
    "health-medicare":
      "Blowing dust and the mold spores stirred up after a storm push asthma, COPD and valley fever cases into urgent care, and dust-storm crashes fill emergency rooms. What matters on a health or Medicare plan is the everyday plumbing: whether your inhaler or antifungal sits on the formulary, the tier it sits on, and whether the pulmonologist you would be referred to is in network.",
  },
  "mountain-driving": {
    "auto-home":
      "Grades, switchbacks and passes change the shape of an auto claim: longer stopping distances, more rear-end and rollover losses, brake fires, and rock chips that become windshield claims under comprehensive. Towing and roadside matters more when a breakdown is an hour from a shop. Because a serious canyon crash can exhaust liability limits quickly, this is a common reason to add an umbrella policy.",
    commercial:
      "Mountain routes raise both the severity of a commercial auto loss and the chance an employee is hurt on the clock, which is a workers' compensation claim rather than an auto one. Employees running errands in their own cars create hired and non-owned exposure that a business auto policy does not pick up by default. Check that endorsement and your driver qualification file.",
  },
  "snow-load": {
    "auto-home":
      "The weight of ice and snow on a roof is a named peril on most homeowners forms, and collapse is covered, but the ice dam that backs water under the shingles is often treated as the excluded part rather than the covered one. Detached carports and sheds fall under other structures, with their own smaller limit. Ask how your policy words collapse and water backup.",
    commercial:
      "A flat commercial roof holds snow that a pitched one sheds, and collapse from the weight is covered on most property forms while the gradual sagging that preceded it is not — carriers read that as wear. Removal costs are usually yours. The other half is liability: a slip on an unshoveled walk is a general liability claim, so keep a dated log of clearing and inspections.",
  },
  "urban-theft": {
    "auto-home":
      "Theft splits across two policies. Comprehensive pays for the vehicle itself and for damage from a break-in, but the laptop, tools and golf clubs taken out of it belong to the home or renters policy, subject to that deductible and to sub-limits on things like jewelry and firearms. Catalytic converter and wheel losses are comprehensive too. A scheduled endorsement lifts the small sub-limits.",
    commercial:
      "Business property forms usually cover burglary with signs of forced entry, and treat shoplifting, mysterious disappearance and theft by your own staff differently — employee dishonesty is a crime coverage, not a property one. Tools and equipment away from the premises need inland marine. Check whether your limit is written per occurrence or per item, and whether alarm warranties are a condition of coverage.",
  },
  "wildfire-wui": {
    "auto-home":
      "In the wildland interface, defensible space, roof class and access drive whether a carrier will write the house at all, and a non-renewal usually means shopping a surplus lines market. Smoke and ash damage are covered even without flame, and loss of use pays while a civil authority keeps you out. A total loss tests the dwelling limit, so check it against current rebuild cost.",
    commercial:
      "Wildfire scoring decides whether a business owners policy is available for the building at all, and brush clearance and roof construction are what underwriters inspect. Fire and smoke are covered perils, and business income keeps paying payroll and rent while the premises are rebuilt. Civil authority coverage extends that to a forced closure when the fire is nearby, usually for a limited number of days.",
    "health-medicare":
      "Smoke from a fire burning well out of sight still lands people with asthma, COPD and heart conditions in urgent care, and evacuation can put you far from your usual pharmacy and doctors. Check how your plan handles out-of-area and out-of-network care in an emergency, whether early refills are allowed during a disaster, and how telehealth visits are covered.",
  },
  "wildlife-collision": {
    "auto-home":
      "Hitting a deer, an elk or loose livestock is comprehensive on nearly every auto form, not collision, which usually means the lower deductible and no at-fault mark on your record. Swerving and striking a fence or a pole instead is collision. Dawn and dusk are when it happens. If you carry comprehensive but dropped collision on an older vehicle, an animal strike is generally still covered.",
    commercial:
      "An animal strike on a company truck is a comprehensive loss on the commercial auto policy, and each unit carries its own deductible, so a rural route with early starts raises the frequency an underwriter sees. A driver injured in the same event is a workers' compensation claim. Livestock that gets out through your fence is a general liability exposure rather than an auto one.",
  },
  wind: {
    "auto-home":
      "Straight-line wind is a covered peril, so shingles lifted, fascia torn off, a fence flattened or a tree through the roof are claims — but the tree removal itself is usually capped at a small limit unless it damaged a covered structure. Detached fences and walls sit under other structures. Watch for a separate wind and hail deductible and for a roof settled at actual cash value.",
    commercial:
      "Wind peels membrane roofs, takes down pole signs and awnings and turns unsecured yard stock into projectiles that damage someone else's property, which moves the claim from property to liability. Signage is often limited unless it is scheduled. Check whether your property limit covers outdoor property and fencing, and whether business income starts after a waiting period once the roof is opened up.",
  },
};


/**
 * A second, smaller source of local substance: traits the city's own
 * researched facts state in prose — HOA-governed housing, an older housing
 * stock, boats and trailers, heavy visitor traffic. Each match adds one
 * paragraph of ordinary policy mechanism, and a paragraph is only added when
 * the hazard guidance alone leaves the page thin, so cities with plenty to say
 * locally are not given text they share with everywhere else.
 */
type Trait = { test: RegExp; text: Partial<Record<GuidanceGroup, string>> };

const TRAITS: Trait[] = [
  {
    test: /\bHOA\b|homeowners association|gated|master[- ]plan/i,
    text: {
      "auto-home":
        "Where an association governs the property, two policies meet. The association's master policy covers the shared structure to whatever point the CC&Rs name, and your own form picks up from there — which is why a townhome or condo owner should know whether the master policy is written walls-in or bare-walls. Loss assessment coverage is the piece people miss: when the association bills every owner for a shared loss or a deductible it cannot absorb, that endorsement is what responds.",
      commercial:
        "A suite in a master-planned centre usually leaves the shell with the landlord and the interior with you, so the lease, not the policy, decides who insures the improvements you paid for. Read the insurance article before renewal: it normally sets a liability limit, requires the landlord as an additional insured, and may make you responsible for glass, signage and the HVAC unit serving your space.",
    },
  },
  {
    test: /historic district|dam-era|older than|mid-century|1940s|1950s|1960s/i,
    text: {
      "auto-home":
        "An older house is rebuilt to today's code, not the code it was built under, and a standard form pays only for what was there. Ordinance or law coverage is the endorsement that pays the difference when an inspector requires new wiring, a different roof deck or an upgraded panel during the repair. Older systems also drive the settlement question: ask whether your roof and plumbing are covered at replacement cost or on a depreciated basis.",
      commercial:
        "Rebuilding an older commercial building means meeting current code for egress, fire separation and accessibility, and the property form pays to replace what was lost rather than to upgrade it. Ordinance or law coverage answers for the demolition and the code-required work, and in a historic or design-reviewed district the approval time itself extends the closure your business income limit has to cover.",
    },
  },
  {
    test: /\bboats?\b|watercraft|\bRV\b|trailers?\b/i,
    text: {
      "auto-home":
        "Boats, trailers and motorhomes sit awkwardly between policies. A homeowners form covers watercraft only up to a small stated limit and usually only below a certain size or horsepower, and it does not follow the boat once it is under way. A trailer's liability generally travels with the vehicle towing it, but damage to the trailer itself has to be listed on a policy to be paid, and stored units still need somewhere for theft and wind damage to land.",
      commercial:
        "A trailer is not automatically insured because the truck pulling it is. Liability normally extends to it while it is attached, but physical damage has to be scheduled unit by unit, and tools or equipment riding in it belong on an inland marine form rather than the auto policy. Check that the trailers on your schedule match the ones actually in the yard before renewal.",
    },
  },
  {
    test: /visitors?|tourists?|tour buses|resort corridor|out-of-state traffic/i,
    text: {
      "auto-home":
        "Roads carrying a lot of visiting and rental traffic change who you are likely to be hit by rather than how often you drive. Unfamiliar drivers, rentals and out-of-state cars make uninsured and underinsured motorist coverage the part of the policy worth reading, because it is the part that pays your own injuries when the other driver cannot. Medical payments coverage sits alongside it and applies regardless of fault.",
      commercial:
        "A business the public walks into carries premises liability in a plainer way than one that ships product: slip-and-fall, parking lot and restroom claims are the ordinary file. Seasonal staff belong on the workers' compensation payroll estimate the same as year-round employees, and an audit after a busy season is where an understated estimate surfaces as a premium bill.",
    },
  },
];

/** Enough local guidance that the page stands on its own; below this, traits top it up. */
const GUIDANCE_WORD_FLOOR = 260;

/**
 * Enough hazard guidance for the page to earn a place in the index. A single
 * stray paragraph is not a local page: life insurance, for instance, only
 * meets one hazard at all (outdoor work in heat), which is a sentence of local
 * substance rather than a reason to submit thirty-eight near-identical URLs.
 * Pages below the floor still render and still serve visitors; they are simply
 * noindex and out of the sitemap.
 */
export const GUIDANCE_INDEX_FLOOR = 150;

export function hasLocalGuidance(product: Pick<Product, "slug" | "category">, hazards: string[]): boolean {
  const group = groupOf(product as never);
  return words(hazards.map((h) => HAZARD_GUIDANCE[h]?.[group]).filter((t): t is string => Boolean(t))) >= GUIDANCE_INDEX_FLOOR;
}

export function localGuidance(product: Pick<Product, "slug" | "category" | "name">, city: Pick<City, "cityFacts" | "name">): string[] {
  const group = groupOf(product as never);
  const facts = city.cityFacts;
  const hazards = (facts?.localHazards ?? []) as string[];
  const out = hazards.map((h) => HAZARD_GUIDANCE[h]?.[group]).filter((t): t is string => Boolean(t));
  if (words(out) >= GUIDANCE_WORD_FLOOR) return out;
  const prose = [facts?.housingStock, facts?.drivingContext, facts?.notableRegulatory].filter(Boolean).join(" ");
  for (const trait of TRAITS) {
    const text = trait.text[group];
    if (!text || !trait.test.test(prose)) continue;
    out.push(text);
    if (words(out) >= GUIDANCE_WORD_FLOOR) break;
  }
  return out;
}
