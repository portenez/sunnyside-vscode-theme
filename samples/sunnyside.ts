// A small neighborhood guide for a sunny afternoon.
interface Place {
  name: string;
  category: 'park' | 'cafe';
  walkMinutes: number;
}

const places: Place[] = [
  { name: 'Sunnyside Gardens', category: 'park', walkMinutes: 8 },
  { name: 'Corner Coffee', category: 'cafe', walkMinutes: 3 },
];

export function planAfternoon(maxWalk = 10): string[] {
  return places
    .filter(({ walkMinutes }) => walkMinutes <= maxWalk)
    .map(({ name, category }) => `${name} · ${category}`);
}

const afternoon = planAfternoon();
console.log('See you outside!', afternoon);
