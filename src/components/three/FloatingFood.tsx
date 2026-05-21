import FoodModel from './FoodModel';

interface FloatingFoodProps {
  scrollProgress: React.RefObject<number>;
  isMobile: boolean;
}

const foodItems: { type: 'tomato' | 'avocado' | 'sushi' | 'croissant' | 'lemon' | 'pepper'; position: [number, number, number]; scale: number }[] = [
  { type: 'tomato', position: [-2.8, 1.0, -0.5], scale: 1.1 },
  { type: 'avocado', position: [2.6, 0.8, -0.3], scale: 1.0 },
  { type: 'sushi', position: [-1.2, -1.5, 0.3], scale: 1.0 },
  { type: 'croissant', position: [1.5, -1.0, -1.0], scale: 1.2 },
  { type: 'lemon', position: [3.5, 1.8, -1.5], scale: 0.9 },
  { type: 'pepper', position: [-3.2, -0.3, -1.2], scale: 0.85 },
  { type: 'tomato', position: [0.8, 2.5, -2.0], scale: 0.7 },
  { type: 'lemon', position: [-2.0, -2.2, -0.8], scale: 0.6 },
];

export default function FloatingFood({ scrollProgress, isMobile }: FloatingFoodProps) {
  const items = isMobile ? foodItems.slice(0, 5) : foodItems;

  return (
    <group>
      {items.map((item, i) => (
        <FoodModel
          key={i}
          type={item.type}
          position={item.position}
          scale={item.scale}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
}
