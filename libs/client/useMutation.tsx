import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data: undefined | any;
  error: undefined | any;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setSate] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  // const [data, setData] = useState<undefined | any>(undefined);
  // const [error, setError] = useState<undefined | any>(undefined);
  const toggle = (item: "loading" | "data" | "error", state: boolean | any) => {
    setSate((prev) => {
      return { ...prev, [item]: state };
    });
  };
  function mutation(data: any) {
    toggle("loading", true);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response
          .json()
          .catch(() => {})
          .then((data) => toggle("data", data))
      )
      .catch((error) => toggle("error", error))
      .finally(() => toggle("loading", false));
  }
  return [mutation, { state.loading, state.data, state.error }];
}
