"use client";
import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingCard } from "../components/listings/ListingCard";

interface PropertiesClient {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<PropertiesClient> = ({
  listings,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
          router.refresh();
          setDeletingId("");
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
          router.refresh();
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid gap-8 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionId={listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
