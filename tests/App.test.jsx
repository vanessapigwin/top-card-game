/*global global*/
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

const newfakePromise = (filename) => {
  return new Promise((resolve) =>
    resolve({
      ok: true,
      json: () => Promise.resolve(Array(8).fill({ url: `${filename}.jpg` })),
    }),
  );
};

describe("App component initial page load", () => {
  beforeEach(() => {
    // render the page
    render(<App />);
    // spying on fetch sample
    vi.spyOn(global, "fetch").mockImplementation(() =>
      newfakePromise("kitty1"),
    );
  });

  afterEach(() => vi.clearAllMocks());

  it("Render correct title", () => {
    expect(screen.getByRole("heading").textContent).toMatch(/Plz Kitty/i);
  });

  it("Default render", () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });

  it("Let there be 8 img elements", async () => {
    await waitFor(() => {
      const imagesElement = screen.getAllByRole("img");
      expect(imagesElement.length).toBe(8);
    });
  });

  it("let there be actual images for each image element", async () => {
    await waitFor(() => {
      const imagesElement = screen.getAllByRole("img");
      const imgLinks = imagesElement.map((element) =>
        element.getAttribute("src"),
      );
      expect(imgLinks.length).toBe(8);
      expect(imgLinks).toStrictEqual(Array(8).fill("kitty1.jpg"));
    });
  });
});

describe("Click kitties behavior", () => {
  afterEach(() => vi.clearAllMocks());

  it("Click on image will load new images", async () => {
    const mockFetch = vi
      .spyOn(global, "fetch")
      .mockImplementation(() => newfakePromise("kitty2"));

    const user = userEvent.setup();
    let selected;
    render(<App />);

    expect(mockFetch).toHaveBeenCalledOnce();
    waitFor(() => {
      selected = screen.getByRole("img");
      expect(selected.getAttribute("src")).toBe("kitty2.jpg");

      user.click(selected);
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });
  });
});
