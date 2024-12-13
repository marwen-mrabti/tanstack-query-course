import { T_Photo } from "@/types/query-types";
import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "./query-fns";

export const usePhotos = ({ page }: { page: number }) => {
  return useQuery({ ...getPhotosQueryOptions({ page }) });
};

export function getPhotosQueryOptions({ page }: { page: number }) {
  return {
    queryKey: ["photos", { page }],
    queryFn: () => getPhotos({ page }),
    placeholderData: (previousData: T_Photo[] | undefined) => {
      return previousData;
    },
  };
}