import { renderHook, act } from "@testing-library/react";
import { useTagCreator } from "./hooks";
import { useCreateTag } from "@/features/tags/api/createTag";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/features/tags/api/createTag");

describe("useTagCreator", () => {
  let mockMutateAsync: jest.Mock;
  const queryClient = new QueryClient();

  beforeEach(() => {
    mockMutateAsync = jest.fn();
    (useCreateTag as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
  });

  it("onChangeが呼び出されたときにラベルを更新します", () => {
    const { result } = renderHook(() => useTagCreator(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    act(() => {
      result.current.onChange("新しいタグ");
    });

    expect(result.current.label).toEqual("新しいタグ");
  });

  it("createTagが呼び出されたときにラベルを用いてcreateTagMutation.mutateAsyncを呼び出します", async () => {
    const { result } = renderHook(() => useTagCreator(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    act(() => {
      result.current.onChange("新しいタグ");
    });

    await act(async () => {
      await result.current.createTag();
    });

    expect(mockMutateAsync).toHaveBeenCalledWith("新しいタグ");
    expect(result.current.label).toEqual("");
  });
});
