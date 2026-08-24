export const wasteCategories = [
  {
    name: "Plastic",
    accent: "#16c7b7",
    summary: "Bottles, containers, wraps, and packaging that need clean sorting.",
    tips: [
      "Rinse containers and let them dry before placing them in a recycling bin.",
      "Check local symbols because not every plastic type is accepted everywhere.",
      "Flatten bottles to save space, but keep labels on unless your program says otherwise."
    ]
  },
  {
    name: "Organic",
    accent: "#7ddf64",
    summary: "Food scraps and garden waste that can return nutrients to soil.",
    tips: [
      "Separate vegetable scraps, fruit peels, coffee grounds, and leaves for compost.",
      "Avoid mixing oils, meat, or dairy into basic home compost systems.",
      "Use a sealed countertop bin to reduce odor before outdoor transfer."
    ]
  },
  {
    name: "E-waste",
    accent: "#8b7cf6",
    summary: "Electronics, batteries, cables, and small devices needing special handling.",
    tips: [
      "Drop phones, batteries, chargers, and broken gadgets at certified e-waste centers.",
      "Remove personal data from devices before donation or recycling.",
      "Never place lithium batteries in regular trash because they can create fire risk."
    ]
  },
  {
    name: "Paper",
    accent: "#4aa3ff",
    summary: "Office paper, cardboard, magazines, and paper packaging.",
    tips: [
      "Keep paper dry and free from food grease.",
      "Break down cardboard boxes before collection.",
      "Shred sensitive documents only when needed because shredded paper can be harder to process."
    ]
  },
  {
    name: "Glass",
    accent: "#ffb45c",
    summary: "Jars and bottles that can be remelted into new products.",
    tips: [
      "Rinse jars and bottles so residue does not contaminate the bin.",
      "Separate glass by local rules if your city requests color sorting.",
      "Keep ceramics, mirrors, and light bulbs out of standard glass recycling."
    ]
  }
];

export const categoryNames = wasteCategories.map((category) => category.name);
