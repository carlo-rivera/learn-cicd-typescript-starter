import { getAPIKey } from "src/api/auth";
import { describe, expect, test } from "vitest";

describe("auth", () => {
  test("returns null for invalid headers", () => {
    const headers1 = { authorization: "aBcDeFgHiJkLmNoPqRsTuVwXyZ" };
    const headers2 = { authorization: "Auth 1234567890" };
    expect(getAPIKey(headers1)).toBeNull();
    expect(getAPIKey(headers2)).toBeNull();
  });

  test("returns the correct value", () => {
    const headers1 = { authorization: "ApiKey aBcDeFgHiJkLmNoPqRsTuVwXyZ" };
    const headers2 = { authorization: "ApiKey 1234567890" };
    const headers3 = { authorization: "ApiKey aBcDeF123456 OtherStuff" };
    expect(getAPIKey(headers1)).toEqual("aBcDeFgHiJkLmNoPqRsTuVwXyZ");
    expect(getAPIKey(headers2)).toEqual("1234567890");
    expect(getAPIKey(headers3)).toEqual("aBcDeF123456");
  });
});
