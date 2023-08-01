import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import TagCreator from "@/features/tags/components/TagCreator/TagCreator";
import { rest } from "msw";
import { setupServer } from "msw/node";

const queryClient = new QueryClient();

describe("TagCreator", () => {
  const handlers = [
    rest.get("http://api.mizuiro-lab.tokyo/tags", (req, res, ctx) => {
      return res(ctx.json([]));
    }),
    rest.post("http://api.mizuiro-lab.tokyo/tags", (req, res, ctx) => {
      return res(ctx.json([]));
    }),
  ];
  const server = setupServer(...handlers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("必要な要素がレンダリングされている", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TagCreator />
      </QueryClientProvider>
    );

    const form = screen.getByTestId("tag-creator-form");
    const input = screen.getByTestId("tag-creator-input");
    const button = screen.getByTestId("tag-creator-button");

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("tagの入力、送信", async () => {
    const { debug } = render(
      <QueryClientProvider client={queryClient}>
        <TagCreator />
      </QueryClientProvider>
    );

    const input = screen.getByTestId("tag-creator-input");
    const button = screen.getByTestId("tag-creator-button");
    // const form = screen.getByTestId("tag-creator-form");
    const newTagName = "new-tag";

    fireEvent.change(input, { target: { value: newTagName } });
    expect(screen.getByDisplayValue(newTagName)).toBeInTheDocument();

    fireEvent.click(button);
    await waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});
