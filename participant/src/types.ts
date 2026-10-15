export type EquipmentRecommendation = {
  productId: string;
  reason: string;
};

export type Technique = {
  id: string;
  name: string;
  summary: string;
  minutes: number;
  level: 'Beginner' | 'Intermediate';
  steps: string[];
  equipment: EquipmentRecommendation[];
  videoId: string;
};

export type Cuisine = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  intro: string;
  color: string;
  techniques: Technique[];
};

export type Product = {
  id: string;
  name: string;
  emoji: string;
  price: string;
  description: string;
  features: string[];
};

export type Video = {
  id: string;
  title: string;
  duration: string;
  teaser: string;
  keyFrames: string[];
  gradient: string;
};
