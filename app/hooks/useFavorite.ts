import axios from "axios";

import useLoginModal from "./useLoginModal";
import { SafeUser } from "../types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UseFavoriteProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export const useFavorite = ({ listingId, currentUser }: UseFavoriteProps) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const hasFavorited = currentUser?.favoriteIds?.includes(listingId);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favourites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favourites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [loginModal, currentUser, hasFavorited, listingId, router]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};
