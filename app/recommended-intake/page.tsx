'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecommendedIntake() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Recommended Intake</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dietary Reference Intakes (DRI)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Dietary Reference Intakes (DRIs) are a set of reference values used to plan and assess nutrient intakes of healthy people. They include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Recommended Dietary Allowance (RDA):</strong> The average daily level of intake sufficient to meet the nutrient requirements of nearly all (97-98%) healthy people.</li>
              <li><strong>Adequate Intake (AI):</strong> Established when evidence is insufficient to develop an RDA and is set at a level assumed to ensure nutritional adequacy.</li>
              <li><strong>Tolerable Upper Intake Level (UL):</strong> The maximum daily intake unlikely to cause adverse health effects.</li>
              <li><strong>Estimated Average Requirement (EAR):</strong> The average daily nutrient intake level estimated to meet the requirements of half of the healthy individuals in a particular life stage and gender group.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calculate Your DRI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Use the USDA&apos;s DRI Calculator to determine your specific nutrient needs based on your age, gender, and activity level.
            </p>
            <Button asChild>
              <a
                href="https://www.nal.usda.gov/human-nutrition-and-food-safety/dri-calculator/results"
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to DRI Calculator
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>General Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While individual needs vary, here are some general guidelines for macronutrient distribution:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Protein:</strong> 10-35% of total daily calories</li>
              <li><strong>Carbohydrates:</strong> 45-65% of total daily calories</li>
              <li><strong>Fats:</strong> 20-35% of total daily calories</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              Note: These are general guidelines. Your specific needs may vary based on your health goals, activity level, and medical conditions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 