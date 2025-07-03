import { generateSessionId } from ".";

describe("generateSessionId", () => {
  const orgid = "test-org";
  
  it("should generate a session ID with the correct format", () => {
    const sessionId = generateSessionId(orgid);
    
    // Verify format: orgid-timestamp-random
    expect(sessionId).toMatch(new RegExp(`^${orgid}-\\d{14,17}-\\d{1,7}$`));
  });
  
  it("should include the provided orgid in the session ID", () => {
    const sessionId = generateSessionId(orgid);
    expect(sessionId.startsWith(`${orgid}-`)).toBe(true);
  });
  
  it("should generate unique IDs on multiple calls", () => {
    const sessionId1 = generateSessionId(orgid);
    
    // Small delay to ensure different timestamps
    jest.advanceTimersByTime(10);
    
    const sessionId2 = generateSessionId(orgid);
    expect(sessionId1).not.toBe(sessionId2);
  });
  
  it("should handle different orgid values", () => {
    const orgid1 = "org1";
    const orgid2 = "org2";
    
    const sessionId1 = generateSessionId(orgid1);
    const sessionId2 = generateSessionId(orgid2);
    
    expect(sessionId1.startsWith(`${orgid1}-`)).toBe(true);
    expect(sessionId2.startsWith(`${orgid2}-`)).toBe(true);
  });
});
