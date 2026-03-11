import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"

export const useUpdateProfile = () => {

  const queryClient = useQueryClient()

  return useMutation({

    mutationFn: async (data: FormData) => {
      const res = await api.patch("/api/me", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      return res.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-profile"]
      })
    }

  })

}