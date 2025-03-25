'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: "USDA Food Database",
    description: "Comprehensive database of food composition and nutrient information.",
    url: "https://fdc.nal.usda.gov/",
    category: "Nutrition Data"
  },
  {
    title: "MyPlate",
    description: "USDA's guide to healthy eating and meal planning.",
    url: "https://www.myplate.gov/",
    category: "Meal Planning"
  },
  {
    title: "Academy of Nutrition and Dietetics",
    description: "Professional organization providing evidence-based nutrition information.",
    url: "https://www.eatright.org/",
    category: "Professional Resources"
  },
  {
    title: "World Health Organization Nutrition",
    description: "Global nutrition guidelines and recommendations.",
    url: "https://www.who.int/health-topics/nutrition",
    category: "Global Guidelines"
  },
  {
    title: "Harvard School of Public Health Nutrition Source",
    description: "Evidence-based nutrition information from Harvard University.",
    url: "https://www.hsph.harvard.edu/nutritionsource/",
    category: "Research"
  },
  {
    title: "Nutrition.gov",
    description: "Federal government's nutrition information portal.",
    url: "https://www.nutrition.gov/",
    category: "Government Resources"
  }
];

export default function Resources() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Nutrition Resources</h1>

      <div className="grid gap-6">
        {Object.entries(
          resources.reduce((acc, resource) => {
            if (!acc[resource.category]) {
              acc[resource.category] = [];
            }
            acc[resource.category].push(resource);
            return acc;
          }, {} as Record<string, typeof resources>)
        ).map(([category, categoryResources]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {categoryResources.map((resource) => (
                  <div key={resource.url} className="flex flex-col space-y-2">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <Button asChild variant="outline" className="w-fit">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 