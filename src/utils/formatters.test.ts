import { describe, expect, it } from "vitest";
import { formatCategoryName, getStarFillPercentages } from "./formatters";

describe("formatters", () => {
  it("formats categories in title case", () => {
    expect(formatCategoryName("men's clothing")).toBe("Men's Clothing");
    expect(formatCategoryName("women's clothing")).toBe("Women's Clothing");
    expect(formatCategoryName("electronics")).toBe("Electronics");
  });

  it("builds fractional star fills for partial ratings", () => {
    expect(getStarFillPercentages(4.1)).toEqual([1, 1, 1, 1, 0.1]);
    expect(getStarFillPercentages(2.5)).toEqual([1, 1, 0.5, 0, 0]);
  });
});
