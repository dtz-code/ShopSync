import { Injectable } from '@angular/core';
import { categoriesAndItems } from 'src/app/models/categories-items';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  getCategoryForItem(itemName: string): string | null {
    const normalizedItemName = this.normalizeString(itemName);

    let bestMatch: string | null = null;
    let bestDistance = Number.MAX_SAFE_INTEGER;

    for (const category in categoriesAndItems) {
      if (categoriesAndItems.hasOwnProperty(category)) {
        const categoryObj = categoriesAndItems[category];
        for (const subCategory in categoryObj) {
          if (categoryObj.hasOwnProperty(subCategory)) {
            const items = categoryObj[subCategory].items;
            const distance = this.calculateLevenshteinDistance(
              normalizedItemName,
              items
            );

            const threshold = 3;

            if (distance < bestDistance && distance <= threshold) {
              bestDistance = distance;
              bestMatch = categoryObj[subCategory].id;
            }
          }
        }
      }
    }
    if (bestMatch != null) {
      return bestMatch;
    } else {
      bestMatch = 'unkategorisiert'
    }
    return bestMatch;
  }

  private normalizeString(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  private calculateLevenshteinDistance(
    itemName: string,
    items: { name: string; id: string }[]
  ): number {
    if (!items) {
      return Number.MAX_SAFE_INTEGER;
    }

    const normalizedItemName = this.normalizeString(itemName);

    let minDist = Number.MAX_SAFE_INTEGER;
    for (const item of items) {
      const distance = this.calculateLevenshteinDistanceBetweenStrings(
        normalizedItemName,
        this.normalizeString(item.name)
      );
      minDist = Math.min(minDist, distance);
    }

    return minDist;
  }

  private calculateLevenshteinDistanceBetweenStrings(
    a: string,
    b: string
  ): number {
    const matrix = Array.from(Array(b.length + 1), () =>
      Array(a.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= b.length; j++) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= b.length; j++) {
      for (let i = 1; i <= a.length; i++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j - 1][i] + 1,
          matrix[j][i - 1] + 1,
          matrix[j - 1][i - 1] + cost
        );
      }
    }

    return matrix[b.length][a.length];
  }

  getCategoryNameById(id: string): string | null {
    for (const mainCategory in categoriesAndItems) {
      if (categoriesAndItems.hasOwnProperty(mainCategory)) {
        const mainCategoryObj = categoriesAndItems[mainCategory];
        for (const subCategory in mainCategoryObj) {
          if (mainCategoryObj.hasOwnProperty(subCategory)) {
            const category = mainCategoryObj[subCategory];
            if (category.id === id) {
              return subCategory;
            }
          }
        }
      }
    }
    return null;
  }
}
