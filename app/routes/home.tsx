import type { Route } from "./+types/home";
import HomePage from "~/components/Home";



export function meta({ }: Route.MetaArgs) {
  return [
    { title: "AI Model Hub | Intelligent Predictions with ML & Deep Learning" },
    { name: "description", content: "Experience the power of Machine Learning and Deep Learning through our interactive model app — analyze data, make predictions, and explore AI in action." },
  ];
}

export default function Home() {
  return (
    <HomePage />
  );
}
