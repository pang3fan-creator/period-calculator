import { describe, expect, it } from "vitest";
import { getStaticLocaleParams } from "./static-rendering";

describe("getStaticLocaleParams", () => {
  it("returns all supported locales as static params", () => {
    expect(getStaticLocaleParams()).toEqual([
      { locale: "en" },
      { locale: "es" },
      { locale: "fr" },
    ]);
  });
});
