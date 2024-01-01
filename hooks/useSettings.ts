import useSwr from "swr"

export function useSettings() {
  return useSwr("/api/singletons/get/_Einstellungen", {
    fallbackData: {
      newsletter: "#",
      facebook: "#",
      instagram: "#",
    },
  }).data!
}
