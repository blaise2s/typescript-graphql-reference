import Messanger from "./messanger";

describe("Messanger", () => {
  const message = "Hello, Jest!";
  const messanger = new Messanger(message);

  describe("getMessage", () => {
    it("gets the correct message", async () => {
      expect(messanger.getMessage()).toBe(message);
    });
  });
});
