import { EmptyState } from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import { FavoritesClient } from "./FavoritesClient";
export default async function FavoritesPage() {
  const listings = await getFavoritesListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return <FavoritesClient listings={listings} currentUser={currentUser} />;
}
