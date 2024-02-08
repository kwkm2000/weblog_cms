import { renderHook, act } from "@testing-library/react";
import { useTagCreator } from "./hooks";

jest.mock("@/features/tags/api/createTag", () => ({
  useCreateTag: () => ({
    createTag: jest.fn(),
  }),
}));

describe("useTagCreator", () => {
  it("onChangeが呼び出されたときにラベルが変更される", () => {
    const { result } = renderHook(() => useTagCreator());

    act(() => {
      result.current.onChange("新しいラベル");
    });

    expect(result.current.label).toBe("新しいラベル");
  });

  it("createTagが呼び出されたときにcreateTagが呼び出される", async () => {
    const { result } = renderHook(() => useTagCreator());
    const createTag = jest.spyOn(result.current, "createTag");

    await act(async () => {
      await result.current.createTag();
    });

    expect(createTag).toHaveBeenCalled();
  });
});
