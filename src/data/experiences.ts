export type Experience = {
  slug: string;
  title: string;
  location: string;
  destination: string;
  category: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviewCount: number;
  summary: string;
  description: string;
  highlights: string[];
  inclusions: string[];
  meetingPoint: string;
  pickup?: string;
  cancellation: string;
  /** Local artwork keys for the current CSS illustrations; these are not remote image URLs. */
  galleryImageRefs: string[];
};

export const experiences: Experience[] = [
  {
    slug: "lisbon",
    title: "A slower side of Lisbon",
    location: "Lisbon, Portugal",
    destination: "Lisbon",
    category: "City & culture",
    duration: "3 hours",
    groupSize: "Up to 8 guests",
    price: 48,
    rating: 4.9,
    reviewCount: 86,
    summary: "Wander old lanes and neighborhood cafés with a local guide.",
    description:
      "Take the unhurried route through Lisbon, from tiled backstreets to the small cafés and viewpoints locals return to. Along the way, hear how the city's everyday neighborhoods have changed and what keeps them feeling like home.",
    highlights: [
      "Explore quiet lanes in Graça and Alfama",
      "Pause at a neighborhood viewpoint",
      "Get local recommendations for the rest of your stay",
    ],
    inclusions: ["Local host", "Coffee and a traditional pastry"],
    meetingPoint: "Outside the main entrance to Santa Apolónia station",
    cancellation: "Cancel up to 24 hours before the start for a full refund.",
    galleryImageRefs: ["lisbon"],
  },
  {
    slug: "amalfi",
    title: "Coastline by kayak",
    location: "Amalfi Coast, Italy",
    destination: "Amalfi Coast",
    category: "On the water",
    duration: "Half day",
    groupSize: "Up to 6 guests",
    price: 72,
    rating: 4.8,
    reviewCount: 54,
    summary: "Paddle past hidden coves and take in the coast from the water.",
    description:
      "Set out at an easy pace with a local paddler and follow the folds of the Amalfi coastline. There is time to stop for a swim when conditions allow and enjoy the villages from a quieter angle.",
    highlights: [
      "Paddle along a scenic stretch of coastline",
      "Stop at a sheltered cove, weather permitting",
      "Learn a few local stories from your guide",
    ],
    inclusions: ["Kayak and safety equipment", "Local guide", "Drinking water"],
    meetingPoint: "Marina Grande beach, beside the small boat kiosk",
    pickup: "A short walk from central Amalfi; no hotel pickup is included.",
    cancellation: "Cancel up to 48 hours before the start for a full refund.",
    galleryImageRefs: ["amalfi"],
  },
  {
    slug: "cusco",
    title: "Trails above the clouds",
    location: "Cusco Region, Peru",
    destination: "Cusco",
    category: "Outdoors",
    duration: "2 days",
    groupSize: "Up to 8 guests",
    price: 185,
    rating: 5.0,
    reviewCount: 37,
    summary: "Walk highland trails with a guide who knows the mountain paths.",
    description:
      "Spend two days walking through open highland landscapes and small Andean communities. Your local guide sets a steady pace, shares the stories of the region, and helps you make the most of the changing views.",
    highlights: [
      "Follow traditional trails above the valley",
      "Share a locally prepared lunch along the way",
      "Stay overnight in a family-run guesthouse",
    ],
    inclusions: ["Local guide", "One night of lodging", "Meals listed in the trip notes"],
    meetingPoint: "Plaza Regocijo, beside the fountain in central Cusco",
    pickup: "Pickup from central Cusco accommodations can be arranged with the host.",
    cancellation: "Cancel up to 7 days before departure for a full refund.",
    galleryImageRefs: ["cusco"],
  },
];

export const destinations = ["Lisbon", "Amalfi Coast", "Cusco"] as const;

export const categories = ["City & culture", "On the water", "Outdoors"] as const;
