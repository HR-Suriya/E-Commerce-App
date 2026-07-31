export function formatCategoryName(category: string): string {
  if (!category) return "";

  const normalized = category.replace(/-/g, " ").trim();
  const words = normalized.split(/\s+/);

  return words
    .map((word) => {
      if (!word) return word;
      const lowerWord = word.toLowerCase();
      if (lowerWord === "and" || lowerWord === "or" || lowerWord === "of") {
        return lowerWord;
      }

      const cleanedWord = lowerWord.replace(/^(['’])/, "");
      return cleanedWord.charAt(0).toUpperCase() + cleanedWord.slice(1);
    })
    .join(" ");
}

export function getStarFillPercentages(rating: number): number[] {
  const clampedRating = Math.max(0, Math.min(5, rating));
  const fullStars = Math.floor(clampedRating);
  const remainder = clampedRating - fullStars;
  const fractionalFill = remainder > 0 ? Math.min(1, remainder) : 0;

  return Array.from({ length: 5 }, (_, index) => {
    if (index < fullStars) return 1;
    if (index === fullStars) return Number(fractionalFill.toFixed(2));
    return 0;
  });
}
