export type CategoryId =
  | "desk"
  | "chair"
  | "monitor"
  | "lamp"
  | "plant"
  | "extra";

export type Option = {
  id: string;
  name: string;
  price: number;
  description: string;
  badge?: string;
};

export type Category = {
  id: CategoryId;
  label: string;
  help: string;
  /** Required categories always keep a selection; optional ones can be skipped. */
  required?: boolean;
  options: Option[];
};

export type Selection = Record<CategoryId, string | null>;

export const CATEGORIES: Category[] = [
  {
    id: "desk",
    label: "Desk",
    help: "The foundation. Choose your altitude.",
    required: true,
    options: [
      {
        id: "bamboo",
        name: "Bamboo Desk",
        price: 75,
        description: "Solid bamboo, hand-finished in Ubud.",
      },
      {
        id: "adjustable",
        name: "Standing Desk",
        price: 109,
        description: "Sit-to-stand at the tap of a button.",
      },
    ],
  },
  {
    id: "chair",
    label: "Chair",
    help: "Your home for the deep-work hours.",
    required: true,
    options: [
      {
        id: "lounge",
        name: "Rattan Lounger",
        price: 49,
        description: "Cloud-soft bouclé on a teak frame.",
      },
      {
        id: "ergonomic",
        name: "Ergo Pro Chair",
        price: 65,
        description: "Mesh back with the lumbar dialled in.",
        badge: "Most rented",
      },
    ],
  },
  {
    id: "monitor",
    label: "Monitors",
    help: "Screen real estate — or stay laptop-pure.",
    options: [
      {
        id: "single",
        name: "Single 27″",
        price: 29,
        description: "One crisp 4K panel.",
      },
      {
        id: "dual",
        name: "Dual 27″",
        price: 49,
        description: "Code left, docs right.",
        badge: "Popular",
      },
      {
        id: "triple",
        name: "Triple Array",
        price: 69,
        description: "Full cockpit immersion.",
      },
    ],
  },
  {
    id: "lamp",
    label: "Lighting",
    help: "Set the light, set the mood.",
    options: [
      {
        id: "desk-lamp",
        name: "Brass Task Lamp",
        price: 18,
        description: "A warm pool of light for late nights.",
      },
      {
        id: "floor-lamp",
        name: "Paper Floor Lamp",
        price: 28,
        description: "Soft dusk glow for the corner.",
      },
    ],
  },
  {
    id: "plant",
    label: "Greenery",
    help: "A little jungle for the room.",
    options: [
      {
        id: "tropical",
        name: "Monstera",
        price: 14,
        description: "Big, dramatic island leaves.",
      },
      {
        id: "succulent",
        name: "Desk Succulent",
        price: 10,
        description: "Thrives on pure neglect.",
      },
    ],
  },
  {
    id: "extra",
    label: "Finishing touch",
    help: "Small comforts, big difference.",
    options: [
      {
        id: "coffee",
        name: "Coffee Station",
        price: 12,
        description: "Espresso kit and local Kintamani beans.",
      },
      {
        id: "beanbag",
        name: "Chill Corner",
        price: 22,
        description: "A beanbag for the 3pm reset.",
      },
    ],
  },
];

export const DEFAULT_SELECTION: Selection = {
  desk: "bamboo",
  chair: "ergonomic",
  monitor: "dual",
  lamp: "desk-lamp",
  plant: "tropical",
  extra: null,
};

export const STAY_LENGTHS = [
  { months: 1, label: "1 month", discount: 0 },
  { months: 3, label: "3 months", discount: 0.1 },
  { months: 6, label: "6 months", discount: 0.15 },
] as const;

export function optionFor(
  categoryId: CategoryId,
  selection: Selection,
): Option | null {
  const category = CATEGORIES.find((c) => c.id === categoryId);
  const selectedId = selection[categoryId];
  if (!category || !selectedId) return null;
  return category.options.find((o) => o.id === selectedId) ?? null;
}

export function pickedItems(selection: Selection) {
  return CATEGORIES.flatMap((category) => {
    const option = optionFor(category.id, selection);
    return option ? [{ category, option }] : [];
  });
}
